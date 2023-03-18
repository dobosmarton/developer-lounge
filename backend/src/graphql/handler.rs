use actix_web::{get, route, web, HttpRequest, HttpResponse, Responder};
use actix_web_lab::respond::Html;
use juniper::http::{playground::playground_source, GraphQLRequest};

use crate::graphql::schema::{Context, Schema};
use crate::services::{AuthService, RepositoryService, UserService};

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
    let auth_service = AuthService::new();
    let user_service = UserService::new();
    let repository_service = RepositoryService::new();

    let ctx = Context::new(
        auth_service.unwrap_token(req),
        auth_service,
        user_service,
        repository_service,
    );

    let response = data.execute(&schema, &ctx).await;
    HttpResponse::Ok().json(response)
}
