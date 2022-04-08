export const BASE_URL_ENDPOINT = "http://localhost:8080/api/v1";
export const LOGIN_USER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/login"
export const REGISTER_USER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/register"
export const REGISTER_OWNER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/owner/register"
export const VERIFY_EMAIL_ENDPOINT = BASE_URL_ENDPOINT + "/auth/verify"
export const SEND_RESET_PASSWORD_TOKEN_ENDPOINT = BASE_URL_ENDPOINT + "/auth/forgot-password"
export const RESET_PASSWORD_ENDPOINT = BASE_URL_ENDPOINT + "/auth/reset-password"
export const GET_AUTHENTICATED_USER_ENDPOINT = BASE_URL_ENDPOINT + "/auth/current"

export const EXERCISE_ENDPOINT = BASE_URL_ENDPOINT + "/exercises"
export const TEST_CASE_ENDPOINT = EXERCISE_ENDPOINT + "/test-cases"
export const INITIAL_CODE_ENDPOINT = EXERCISE_ENDPOINT + "/initial-code"
export const PROGRAMMING_LANGUAGES_ENDPOINT = BASE_URL_ENDPOINT + "/programming-languages"
export const TAGS_ENDPOINT = BASE_URL_ENDPOINT + "/tags"

export const TECHNICAL_TEST_ENDPOINT = BASE_URL_ENDPOINT + "/technical-tests"