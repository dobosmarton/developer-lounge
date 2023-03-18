use serde_querystring::{from_str, ParseMode};

use crate::config::Config;

use crate::type_defs::{AccessTokenBody, TokenData};

pub async fn get_access_token(code: String) -> Result<String, Box<dyn std::error::Error>> {
    let config = Config::get_config();

    let client = reqwest::Client::new();
    let res = client
        .post("https://github.com/login/oauth/access_token")
        .json(&AccessTokenBody {
            client_id: config.github_client_id,
            client_secret: config.github_secret,
            redirect_uri: config.github_redirect_url,
            code,
        })
        .send()
        .await?
        .text()
        .await?;

    match res.contains("error") {
        false => Ok(from_str::<TokenData>(&res, ParseMode::UrlEncoded)?.access_token),
        true => Err("Access token error!".into()),
    }
}
