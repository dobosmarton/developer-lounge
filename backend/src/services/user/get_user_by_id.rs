use dataloader::{non_cached::Loader, BatchFn};
use juniper::async_trait;
use std::collections::HashMap;

use crate::{
    services::request::request,
    type_defs::{User, UserLoaderData},
};

pub struct UserBatcher;

#[async_trait]
impl BatchFn<UserLoaderData, User> for UserBatcher {
    // A hashmap is used, as we need to return an array which maps each original key to a Cult.
    async fn load(&mut self, keys: &[UserLoaderData]) -> HashMap<UserLoaderData, User> {
        let mut user_hashmap = HashMap::new();
        get_user_by_ids(&mut user_hashmap, keys.to_vec())
            .await
            .clone()
    }
}

pub type UserLoader = Loader<UserLoaderData, User, UserBatcher>;

pub fn get_loader() -> UserLoader {
    Loader::new(UserBatcher).with_yield_count(100)
}

pub async fn get_user_by_ids(
    hashmap: &mut HashMap<UserLoaderData, User>,
    user_loader_data: Vec<UserLoaderData>,
) -> &mut HashMap<UserLoaderData, User> {
    for loader_data in user_loader_data {
        let user = request::get::<User, Vec<()>>(
            &format!("/user/{}", loader_data.id),
            &loader_data.token,
            &Vec::new(),
        )
        .await;

        hashmap.insert(loader_data, user.unwrap());
    }
    hashmap
}
