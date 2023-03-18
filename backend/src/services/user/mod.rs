use crate::type_defs::{User, UserLoaderData};

pub mod get_current_user;
pub mod get_user_by_id;

#[derive(Clone)]
pub struct UserService {
    get_user_by_id: get_user_by_id::UserLoader,
}

impl UserService {
    pub fn new() -> UserService {
        UserService {
            get_user_by_id: get_user_by_id::get_loader(),
        }
    }

    pub async fn get_user(&self, token: &str) -> Result<User, Box<dyn std::error::Error>> {
        get_current_user::get_user(token).await
    }

    pub async fn get_user_by_id(
        &self,
        token: &str,
        user_id: &str,
    ) -> Result<User, Box<dyn std::error::Error>> {
        if token.is_empty() {
            return Err("Authentication is required!".into());
        }

        println!("get_user {}", user_id);

        Ok(self
            .get_user_by_id
            .load(UserLoaderData {
                id: user_id.to_string(),
                token: token.to_string(),
            })
            .await)
    }
}
