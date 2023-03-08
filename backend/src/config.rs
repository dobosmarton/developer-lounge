use envconfig::Envconfig;

#[derive(Envconfig)]
pub struct Config {
    #[envconfig(from = "HOST")]
    pub host: String,

    #[envconfig(from = "PORT")]
    pub port: u16,

    #[envconfig(from = "GITHUB_API_URL")]
    pub github_api_url: String,

    #[envconfig(from = "GITHUB_CLIENT_ID")]
    pub github_client_id: String,

    #[envconfig(from = "GITHUB_SECRET")]
    pub github_secret: String,

    #[envconfig(from = "GITHUB_REDIRECT_URL")]
    pub github_redirect_url: String,

    #[envconfig(from = "GITHUB_USER_AGENT")]
    pub github_user_agent: String,
}

impl Config {
    pub fn get_config() -> Config {
        Config::init_from_env().unwrap()
    }
}
