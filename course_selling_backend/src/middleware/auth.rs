use actix_web::{dev::{ServiceRequest,Service, ServiceResponse, Transform, forward_ready}, Error, HttpMessage};
use actix_web::body::EitherBody;
use futures::future::{ready, LocalBoxFuture, Ready};
use std::rc::Rc;
use crate::jwt::verify_jwt;

pub struct AuthMiddleware {
    pub secret: String,
}

impl<S, B> Transform<S, ServiceRequest> for AuthMiddleware
where
    S: Service<
        ServiceRequest,
        Response = ServiceResponse<B>,
        Error = Error,
    >,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = Error;
    type Transform = AuthMiddlewareMiddleware<S>;
    type InitError = ();
    type Future = Ready<Result<Self::Transform, Self::InitError>>;

    fn new_transform(&self, service: S) -> Self::Future {
        ready(Ok(AuthMiddlewareMiddleware {
            service: Rc::new(service),
            secret: self.secret.clone(),
        }))
    }
}

pub struct AuthMiddlewareMiddleware<S> {
    service: Rc<S>,
    secret: String,
}

impl<S, B> Service<ServiceRequest> for AuthMiddlewareMiddleware<S>
where
    S: Service<
        ServiceRequest,
        Response = ServiceResponse<B>,
        Error = Error,
    >,
    S::Future: 'static,
    B: 'static,
{
    type Response = ServiceResponse<EitherBody<B>>;
    type Error = Error;
    type Future = LocalBoxFuture<'static, Result<Self::Response, Self::Error>>;

    forward_ready!(service);

    fn call(&self, req: ServiceRequest) -> Self::Future {
        let secret = self.secret.clone();

        let auth_header = req.headers().get("Authorization").and_then(|h| h.to_str().ok()).map(|h| h.trim_start_matches("Bearer ").to_string());

        if let Some(token) = auth_header {
            match verify_jwt(&token, &secret) {
                Ok(claims) => {
                    req.extensions_mut().insert(claims);
                }
                Err(_) => {
                    let res = actix_web::HttpResponse::Unauthorized()
                        .body("Invalid or expired token")
                        .map_into_right_body();
                    return Box::pin(async { Ok(req.into_response(res)) });
                }
            }
        } else {
            let res = actix_web::HttpResponse::Unauthorized()
                .body("Missing Authorization header")
                .map_into_right_body();
            return Box::pin(async { Ok(req.into_response(res)) });
        }

        let fut = self.service.call(req);
        Box::pin(async move {
            let res = fut.await?.map_into_left_body();
            Ok(res)
        })
    }
}
