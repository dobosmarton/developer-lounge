use juniper::FieldResult;

use crate::type_defs::{Repository, RepositoryInput};

use super::schema::Context;
pub struct MutationRoot;

#[juniper::graphql_object(Context = Context)]
impl MutationRoot {
    async fn create_repository(
        context: &Context,
        input: RepositoryInput,
    ) -> FieldResult<Repository> {
        let repository = context
            .repository_service
            .create_repository(&context.token, input)
            .await
            .expect("Could not add the repository!");

        Ok(repository)
    }
}
