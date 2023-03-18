use juniper::{GraphQLInputObject, GraphQLObject};
use serde::{Deserialize, Serialize};

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Token result")]
pub struct TokenResult {
    pub token: String,
}

#[derive(GraphQLInputObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Token input")]
pub struct TokenInput {
    pub code: String,
}

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Login URL result")]
pub struct LoginUrlResult {
    pub url: String,
}

#[derive(Serialize)]
pub struct AccessTokenBody {
    pub client_id: String,
    pub client_secret: String,
    pub code: String,
    pub redirect_uri: String,
}

#[derive(Deserialize)]
pub struct TokenData {
    pub access_token: String,
}
