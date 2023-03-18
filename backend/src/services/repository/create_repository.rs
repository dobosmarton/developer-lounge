use crate::{
    services::request::request,
    type_defs::{Repository, RepositoryInput},
};

pub async fn create_repository(
    token: &str,
    repository_input: RepositoryInput,
) -> Result<Repository, Box<dyn std::error::Error>> {
    if token.is_empty() {
        return Err("Authentication is required!".into());
    }
    let response = request::post("/user/repos", token, &repository_input).await;

    Ok(response.unwrap())
}
