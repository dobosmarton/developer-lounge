use juniper::FieldResult;

use crate::type_defs::{
    ListRepositoryInput, LoginUrlResult, Repository, RepositorySearchResult, SearchRepositoryInput,
    TokenInput, TokenResult,
};

use super::schema::Context;

pub struct QueryRoot;

#[juniper::graphql_object(Context = Context)]
impl QueryRoot {
    async fn get_login_url(context: &Context) -> FieldResult<LoginUrlResult> {
        Ok(LoginUrlResult {
            url: context.auth_service.get_login_url(), // get_login_url(),
        })
    }

    async fn get_token(context: &Context, input: TokenInput) -> FieldResult<TokenResult> {
        let token = context.auth_service.get_access_token(input.code).await?;
        Ok(TokenResult { token })
    }

    async fn repositories(
        context: &Context,
        input: ListRepositoryInput,
    ) -> FieldResult<Vec<Repository>> {
        let repository_list = context
            .repository_service
            .get_repositories(&context.token, input)
            .await?;

        Ok(repository_list)
    }

    async fn search_repositories(
        context: &Context,
        input: SearchRepositoryInput,
    ) -> FieldResult<RepositorySearchResult> {
        let repository_list = context
            .repository_service
            .search_repositories(&context.user_service, &context.token, input)
            .await?;
        Ok(repository_list)
    }
}
