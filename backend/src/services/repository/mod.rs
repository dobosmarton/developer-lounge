use crate::type_defs::{
    ListRepositoryInput, Repository, RepositoryInput, RepositorySearchResult, SearchRepositoryInput,
};

use super::UserService;

pub mod create_repository;
pub mod get_repositories;
pub mod search_repository;

#[derive(Clone)]
pub struct RepositoryService {}

impl RepositoryService {
    pub fn new() -> RepositoryService {
        RepositoryService {}
    }

    pub async fn get_repositories(
        &self,
        token: &str,
        input: ListRepositoryInput,
    ) -> Result<Vec<Repository>, Box<dyn std::error::Error>> {
        get_repositories::get_repositories(token, input).await
    }

    pub async fn create_repository(
        &self,
        token: &str,
        repository_input: RepositoryInput,
    ) -> Result<Repository, Box<dyn std::error::Error>> {
        create_repository::create_repository(token, repository_input).await
    }

    pub async fn search_repositories(
        &self,
        user_service: &UserService,
        token: &str,
        input: SearchRepositoryInput,
    ) -> Result<RepositorySearchResult, Box<dyn std::error::Error>> {
        search_repository::search_repositories(user_service, token, input).await
    }
}
