pub mod github_service {

    use actix_web::HttpRequest;
    use reqwest::Url;
    use serde::{Deserialize, Serialize};
    use serde_querystring::{from_str, ParseMode};

    use crate::{config::Config, schema};

    #[derive(Deserialize)]
    struct TokenData {
        access_token: String,
    }

    #[derive(Serialize)]
    struct AccessTokenBody {
        client_id: String,
        client_secret: String,
        code: String,
        redirect_uri: String,
    }

    mod request {
        use super::*;
        use reqwest::header::{HeaderMap, ACCEPT, USER_AGENT};

        fn get_headers() -> HeaderMap {
            let mut headers = HeaderMap::new();
            headers.insert(
                USER_AGENT,
                Config::get_config().github_user_agent.parse().unwrap(),
            );
            headers.insert(ACCEPT, "application/vnd.github.v3+json".parse().unwrap());
            headers.insert("x-gitHub-api-version", "2022-11-28".parse().unwrap());
            return headers;
        }

        pub async fn post<T: Serialize, R>(
            url: &str,
            token: &str,
            data: &T,
        ) -> Result<R, reqwest::Error>
        where
            for<'a> R: Deserialize<'a>,
        {
            let github_api_url = Config::get_config().github_api_url;

            reqwest::Client::new()
                .post(github_api_url + url)
                .bearer_auth(token)
                .headers(get_headers())
                .json(data)
                .send()
                .await?
                .json::<R>()
                .await
        }

        pub async fn get<T, Q>(
            url: &str,
            token: &str,
            query: &Q,
        ) -> Result<T, Box<dyn std::error::Error>>
        where
            for<'a> T: Deserialize<'a>,
            Q: Serialize,
        {
            let github_api_url = Config::get_config().github_api_url;

            let response_text = reqwest::Client::new()
                .get(github_api_url + url)
                .bearer_auth(token)
                .headers(get_headers())
                .query(query)
                .send()
                .await
                .unwrap()
                .text()
                .await
                .unwrap();

            Ok(serde_json::from_str::<T>(&response_text)?)

            // match response {
            //     Ok(json_response) => Ok(json_response),
            //     Err(err) => Err(Box::new(err)),
            // }
        }
    }

    pub fn unwrap_token(req: HttpRequest) -> String {
        let auth_header = req.headers().get("Authorization");
        match auth_header {
            Some(req_header) => req_header
                .to_str()
                .unwrap()
                .split("Bearer ")
                .last()
                .unwrap()
                .to_string(),
            None => "".to_string(),
        }
    }

    pub fn get_login_url() -> String {
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

    pub async fn repositories(
        token: &str,
        input: schema::ListRepositoryInput,
    ) -> Result<Vec<schema::Repository>, Box<dyn std::error::Error>> {
        if token.is_empty() {
            return Err("Authentication is required!".into());
        }

        request::get(
            &"/user/repos",
            token,
            &[
                ("page", input.page.unwrap_or(1).to_string()),
                (
                    "sort",
                    input
                        .sort
                        .unwrap_or(schema::RepositorySort::FullName)
                        .to_string(),
                ),
                // ("affiliation", "owner".to_string()),
            ],
        )
        .await
    }

    pub async fn create_repository(
        token: &str,
        repository_input: schema::RepositoryInput,
    ) -> Result<schema::Repository, Box<dyn std::error::Error>> {
        if token.is_empty() {
            return Err("Authentication is required!".into());
        }

        let response = request::post("/user/repos", token, &repository_input).await;

        Ok(response.unwrap())
    }

    pub async fn get_user_by_id(
        token: &str,
        user_id: &str,
    ) -> Result<schema::User, Box<dyn std::error::Error>> {
        if token.is_empty() {
            return Err("Authentication is required!".into());
        }

        request::get::<schema::User, Vec<()>>(&format!("/user/{}", user_id), token, &Vec::new())
            .await
    }
}
