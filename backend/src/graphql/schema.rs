use juniper::{EmptySubscription, RootNode};

use crate::services::{AuthService, RepositoryService, UserService};

use super::{mutation::MutationRoot, query::QueryRoot};

#[derive(Clone)]
pub struct Context {
    pub token: String,
    pub auth_service: AuthService,
    pub user_service: UserService,
    pub repository_service: RepositoryService,
}

impl juniper::Context for Context {}

impl Context {
    pub fn new(
        token: String,
        auth_service: AuthService,
        user_service: UserService,
        repository_service: RepositoryService,
    ) -> Self {
        Self {
            token,
            auth_service,
            user_service,
            repository_service,
        }
    }
}

pub type Schema = RootNode<'static, QueryRoot, MutationRoot, EmptySubscription<Context>>;

pub fn create_schema() -> Schema {
    Schema::new(QueryRoot {}, MutationRoot {}, EmptySubscription::new())
}
