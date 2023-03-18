use actix_web::HttpRequest;

pub fn unwrap_request_token(req: HttpRequest) -> String {
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
