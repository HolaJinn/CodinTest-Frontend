export const BASE_URL_ENDPOINT = "http://localhost:8080/api/v1";
export const LOGIN_USER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/login"
export const REGISTER_USER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/register"
export const REGISTER_OWNER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/owner/register"
export const VERIFY_EMAIL_ENDPOINT = BASE_URL_ENDPOINT + "/auth/verify"
export const SEND_RESET_PASSWORD_TOKEN_ENDPOINT = BASE_URL_ENDPOINT + "/auth/forgot-password"
export const RESET_PASSWORD_ENDPOINT = BASE_URL_ENDPOINT + "/auth/reset-password"
export const GET_AUTHENTICATED_USER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/current"

export const CREATE_EXERCISE_ENDPOINT = BASE_URL_ENDPOINT + "/exercises"