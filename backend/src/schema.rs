use std::fmt;

use juniper::{
    EmptySubscription, FieldResult, GraphQLEnum, GraphQLInputObject, GraphQLObject, RootNode,
};
use serde::{Deserialize, Serialize};

use crate::service::github_service::{
    create_repository, get_access_token, get_login_url, get_user_by_id, repositories,
    search_repositories,
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

    #[graphql(skip)]
    pub url: String,

    pub name: Option<String>,
    pub email: Option<String>,
    pub login: String,
}

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
        Ok(get_user_by_id(&context.token, &self.owner.id.to_string()).await?)
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
#[graphql(description = "Search Repository input")]
pub struct SearchRepositoryInput {
    pub page: Option<i32>,
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

    async fn search_repositories(
        context: &Context,
        input: SearchRepositoryInput,
    ) -> FieldResult<RepositorySearchResult> {
        let repository_list = search_repositories(&context.token, input).await?;
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
