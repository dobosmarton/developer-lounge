use reqwest::Url;

use crate::config::Config;

pub fn get_github_login_url() -> String {
    let config = Config::get_config();

    Url::parse_with_params(
        "https://github.com/login/oauth/authorize?",
        &[
            ("client_id", config.github_client_id),
            ("redirect_uri", config.github_redirect_url),
            ("allow_signup", "true".to_string()),
            ("scope", vec!["read:user", "user:email", "repo"].join(" ")),
        ],
    )
    .unwrap()
    .to_string()
}
