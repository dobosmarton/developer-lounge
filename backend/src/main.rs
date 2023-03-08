use std::sync::Arc;

use actix_cors::Cors;
use actix_web::{web::Data, App, HttpServer};
use config::Config;
use schema::create_schema;

mod config;
mod routes;
mod schema;
mod service;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv::dotenv().ok();

    let conf = Config::get_config();

    // Create Juniper schema
    let schema = Arc::new(create_schema());

    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            .app_data(Data::from(schema.clone()))
            .configure(routes::init)
            // the graphiql UI requires CORS to be enabled
            .wrap(Cors::permissive())
    })
    .bind((conf.host, conf.port))?
    .run()
    .await
}
