# Steps to run this service 

### Build
docker build -t latex-service:slim .

### Run
docker run --rm -p 8080:8080 latex-service:slim