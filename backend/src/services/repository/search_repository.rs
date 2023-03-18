use crate::{
    services::{request::request, UserService},
    type_defs::{RepositorySearchResult, SearchRepositoryInput},
};

pub async fn search_repositories(
    user_service: &UserService,
    token: &str,
    input: SearchRepositoryInput,
) -> Result<RepositorySearchResult, Box<dyn std::error::Error>> {
    if token.is_empty() {
        return Err("Authentication is required!".into());
    }

    let user = user_service.get_user(token).await.unwrap();

    request::get(
        &"/search/repositories",
        token,
        &[
            ("page", input.page.unwrap_or(1).to_string()),
            ("per_page", input.per_page.unwrap_or(12).to_string()),
            (
                "q",
                format!("{} in:name user:{}", input.search_term, user.login),
            ),
        ],
    )
    .await
}
