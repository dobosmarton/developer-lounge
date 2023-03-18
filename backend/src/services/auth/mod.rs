use actix_web::HttpRequest;

pub mod get_access_token;
pub mod get_github_login_url;
pub mod unwrap_token;

#[derive(Clone)]
pub struct AuthService {}

impl AuthService {
    pub fn new() -> AuthService {
        AuthService {}
    }

    pub fn unwrap_token(&self, req: HttpRequest) -> String {
        unwrap_token::unwrap_request_token(req)
    }

    pub fn get_login_url(&self) -> String {
        get_github_login_url::get_github_login_url()
    }

    pub async fn get_access_token(
        &self,
        code: String,
    ) -> Result<String, Box<dyn std::error::Error>> {
        get_access_token::get_access_token(code).await
    }
}
