use actix_web::{get, route, web, HttpRequest, HttpResponse, Responder};
use actix_web_lab::respond::Html;
use juniper::http::{playground::playground_source, GraphQLRequest};

use crate::{
    schema::{Context, Schema},
    service::github_service::unwrap_token,
};

#[get("/")]
async fn healthcheck() -> impl Responder {
    HttpResponse::Ok().body("I'm alive!")
}

/// GraphiQL playground UI
#[get("/playground")]
async fn graphql_playground() -> impl Responder {
    Html(playground_source("/graphql", None))
}

/// GraphQL endpoint
#[route("/graphql", method = "GET", method = "POST")]
async fn graphql(
    schema: web::Data<Schema>,
    data: web::Json<GraphQLRequest>,
    req: HttpRequest,
) -> impl Responder {
    let ctx = Context {
        token: unwrap_token(req),
    };

    let response = data.execute(&schema, &ctx).await;
    HttpResponse::Ok().json(response)
}

/// Init of the service and routes
pub fn init(config: &mut web::ServiceConfig) {
    config
        .service(web::scope("health").service(healthcheck))
        .service(web::scope("").service(graphql_playground).service(graphql));
}
