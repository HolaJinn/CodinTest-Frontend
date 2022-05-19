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

export const RECRUITER_ENDPOINT = BASE_URL_ENDPOINT + "/company/recruiters"
export const ADD_RECRUITER_ENDPOINT = BASE_URL_ENDPOINT + "/company/add-recruiter"

export const INVITATION_ENDPOINT = BASE_URL_ENDPOINT + "/invitations"
export const RELATED_CANDIDATES_ENDPOINT = INVITATION_ENDPOINT + "/related-candidates"
export const CURRENT_USER_INVITATIONS_ENDPOINT = INVITATION_ENDPOINT + "/my-invitations"
export const ACCEPT_INVITATION_ENDPOINT = INVITATION_ENDPOINT + "/accept-invitation"
export const REJECT_INVITATION_ENDPOINT = INVITATION_ENDPOINT + "/reject-invitation"

export const SUBMIT_CODE_ENDPOINT = BASE_URL_ENDPOINT + "/judge/submit-code"
export const TEST_CODE_ENDPOINT = BASE_URL_ENDPOINT + "/judge/test-code"
