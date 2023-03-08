use std::fmt;

use juniper::{
    EmptySubscription, FieldResult, GraphQLEnum, GraphQLInputObject, GraphQLObject, RootNode,
};
use serde::{Deserialize, Serialize};

use crate::service::github_service::{
    create_repository, get_access_token, get_login_url, get_user_by_id, repositories,
};

pub struct Context {
    pub token: String,
}

impl juniper::Context for Context {}

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

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "User entity")]
pub struct User {
    pub id: i32,
    pub avatar_url: String,
    pub url: String,
    pub name: Option<String>,
    pub email: Option<String>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RepositoryOwner {
    pub id: i32,
}

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Repository entity")]
pub struct Repository {
    pub id: i32,
    pub name: Option<String>,
    pub full_name: String,
    pub private: bool,
    pub description: Option<String>,
    pub url: String,
    pub html_url: String,

    #[graphql(skip)]
    owner: RepositoryOwner,
}

impl Repository {
    pub async fn user(&self, context: &Context) -> FieldResult<User> {
        Ok(get_user_by_id(&context.token, &self.owner.id.to_string()).await?)
    }
}

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Token result")]
pub struct TokenResult {
    token: String,
}

#[derive(GraphQLInputObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Token input")]
pub struct TokenInput {
    code: String,
}

#[derive(GraphQLInputObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Repository list input")]
pub struct ListRepositoryInput {
    pub page: Option<i32>,
    pub sort: Option<RepositorySort>,
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

#[derive(GraphQLObject, Debug, Serialize, Deserialize)]
#[graphql(description = "Login URL result")]
pub struct LoginUrlResult {
    url: String,
}

pub struct QueryRoot;

#[juniper::graphql_object(Context = Context)]
impl QueryRoot {
    async fn get_login_url() -> FieldResult<LoginUrlResult> {
        Ok(LoginUrlResult {
            url: get_login_url(),
        })
    }

    async fn get_token(input: TokenInput) -> FieldResult<TokenResult> {
        let token = get_access_token(input.code).await?;
        Ok(TokenResult { token })
    }

    async fn repositories(
        context: &Context,
        input: ListRepositoryInput,
    ) -> FieldResult<Vec<Repository>> {
        let repository_list = repositories(&context.token, input).await?;
        Ok(repository_list)
    }
}

pub struct MutationRoot;

#[juniper::graphql_object(Context = Context)]
impl MutationRoot {
    async fn create_repository(
        context: &Context,
        input: RepositoryInput,
    ) -> FieldResult<Repository> {
        let repository = create_repository(&context.token, input)
            .await
            .expect("Could not add the repository!");

        Ok(repository)
    }
}

pub type Schema = RootNode<'static, QueryRoot, MutationRoot, EmptySubscription<Context>>;

pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, MutationRoot {}, EmptySubscription::new())
}
