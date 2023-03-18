use core::fmt;

use juniper::{FieldResult, GraphQLEnum, GraphQLInputObject, GraphQLObject};
use serde::{Deserialize, Serialize};

use super::User;
use crate::graphql::schema::Context;

#[derive(Debug, Serialize, Deserialize)]
pub struct RepositoryOwner {
    pub id: i32,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Repository {
    id: i32,
    name: Option<String>,
    full_name: String,
    private: bool,
    description: Option<String>,
    html_url: String,

    owner: RepositoryOwner,
    url: String,
}

#[juniper::graphql_object(context = Context)]
impl Repository {
    async fn user(&self, context: &Context) -> FieldResult<User> {
        Ok(context
            .user_service
            .get_user_by_id(&context.token, &self.owner.id.to_string())
            .await?)
    }

    fn id(&self) -> i32 {
        self.id
    }

    fn name(&self) -> &Option<String> {
        &self.name
    }

    fn full_name(&self) -> &str {
        &self.full_name
    }

    fn private(&self) -> &bool {
        &self.private
    }

    fn description(&self) -> &Option<String> {
        &self.description
    }

    fn html_url(&self) -> &str {
        &self.html_url
    }
}

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Repository search result", context = Context)]
pub struct RepositorySearchResult {
    pub total_count: i32,
    pub items: Vec<Repository>,
}

#[derive(GraphQLInputObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Repository list input")]
pub struct ListRepositoryInput {
    pub page: Option<i32>,
    pub per_page: Option<i32>,
    pub sort: Option<RepositorySort>,
}

#[derive(GraphQLInputObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Search Repository input")]
pub struct SearchRepositoryInput {
    pub page: Option<i32>,
    pub per_page: Option<i32>,
    pub search_term: String,
}

#[derive(GraphQLInputObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Repository Input")]
pub struct RepositoryInput {
    pub name: String,
    pub description: Option<String>,
    pub homepage: Option<String>,
    pub is_template: bool,
    pub private: bool,
}

#[derive(GraphQLEnum, Debug, Serialize, Deserialize)]
pub enum RepositorySort {
    Created,
    Updated,
    Pushed,
    FullName,
}

impl fmt::Display for RepositorySort {
    fn fmt(&self, f: &mut fmt::Formatter) -> fmt::Result {
        write!(f, "{:?}", self)
    }
}
