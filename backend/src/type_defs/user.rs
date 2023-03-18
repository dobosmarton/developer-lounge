use std::hash::{Hash, Hasher};

use juniper::GraphQLObject;
use serde::{Deserialize, Serialize};

#[derive(GraphQLObject, Debug, Serialize, Deserialize, Clone)]
#[graphql(description = "User entity")]
pub struct User {
    pub id: i32,
    pub avatar_url: String,

    #[graphql(skip)]
    pub url: String,

    pub name: Option<String>,
    pub email: Option<String>,
    pub login: String,
}

#[derive(Debug, Clone)]
pub struct UserLoaderData {
    pub id: String,
    pub token: String,
}

impl PartialEq for UserLoaderData {
    fn eq(&self, other: &Self) -> bool {
        self.id == other.id
    }
}

impl Eq for UserLoaderData {}

impl Hash for UserLoaderData {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.id.hash(state);
    }
}
