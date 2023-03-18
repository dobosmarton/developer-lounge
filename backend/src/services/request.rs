pub mod request {

    use reqwest::header::{HeaderMap, ACCEPT, USER_AGENT};
    use serde::{Deserialize, Serialize};

    use crate::config::Config;

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
    }
}
