use actix_web::{dev::{ServiceRequest, ServiceResponse, Transform, forward_ready}, Error};
use futures_util::future::{ok, Ready, LocalBoxFuture};
use std::rc::Rc;
use crate::utils::jwt::verify_jwt;

pub struct AuthMiddleware; // Auth struct 

impl<S, B> Transform<S, ServiceRequest> for AuthMiddleware // implementing Transform trait for AuthMiddleware with generics S and B
where // S is a service that processes ServiceRequest and returns ServiceResponse with type B or Error
    S: actix_service::Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    S::Future: 'static, // Future type of the service must be 'static
    B: 'static, // Response body type must also be 'static
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Transform = AuthMiddlewareService<S>;
    type InitError = ();
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ok(AuthMiddlewareService { service: Rc::new(service) })
    }
}


pub struct AuthMiddlewareService<S> {
    service: Rc<S>,
}

impl<S, B> actix_service::Service<ServiceRequest> for AuthMiddlewareService<S>
where
    S: actix_service::Service<ServiceRequest, Response = ServiceResponse<B>, Error = Error> + 'static,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<B>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let auth_header = req.headers().get("Authorization").cloned();
        let srv = Rc::clone(&self.service);

        Box::pin(async move {
            if let Some(header) = auth_header {
                if let Ok(auth_str) = header.to_str() {
                    if auth_str.starts_with("Bearer ") {
                        let token = auth_str.trim_start_matches("Bearer ");
                        if verify_jwt(token).is_ok() {
                            return srv.call(req).await;
                        }
                    }
                }
            }
            Err(actix_web::error::ErrorUnauthorized("Unauthorized"))
        })
    }
}
