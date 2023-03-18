use crate::{
    services::request::request,
    type_defs::{ListRepositoryInput, Repository, RepositorySort},
};

pub async fn get_repositories(
    token: &str,
    input: ListRepositoryInput,
) -> Result<Vec<Repository>, Box<dyn std::error::Error>> {
    if token.is_empty() {
        return Err("Authentication is required!".into());
    }

    request::get(
        &"/user/repos",
        token,
        &[
            ("page", input.page.unwrap_or(1).to_string()),
            ("per_page", input.per_page.unwrap_or(12).to_string()),
            (
                "sort",
                input.sort.unwrap_or(RepositorySort::FullName).to_string(),
            ),
        ],
    )
    .await
}
