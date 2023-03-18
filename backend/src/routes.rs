use actix_web::{get, web, HttpResponse, Responder};

use crate::graphql::graphql_route_init;

#[get("/")]
async fn healthcheck() -> impl Responder {
    HttpResponse::Ok().body("I'm alive!")
}

/// Init of the service and routes
pub fn init(config: &mut web::ServiceConfig) {
    config.service(web::scope("health").service(healthcheck));
    graphql_route_init(config);
}
