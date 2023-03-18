use actix_web::web::{self, ServiceConfig};

use self::handler::{graphql, graphql_playground};

mod handler;
pub mod mutation;
pub mod query;
pub mod schema;

pub fn graphql_route_init(config: &mut web::ServiceConfig) -> &mut ServiceConfig {
    config.service(web::scope("").service(graphql_playground).service(graphql))
}
