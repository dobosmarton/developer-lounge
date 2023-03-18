use crate::{services::request::request, type_defs::User};

pub async fn get_user(token: &str) -> Result<User, Box<dyn std::error::Error>> {
    if token.is_empty() {
        return Err("Authentication is required!".into());
    }

    request::get::<User, Vec<()>>(&"/user", token, &Vec::new()).await
}
