export interface ExtraQueryParams {
  authuser: string;
}

export interface SessionState {
  extraQueryParams: ExtraQueryParams;
}

export interface Response {
  token_type: string;
  access_token: string;
  scope: string;
  login_hint: string;
  expires_in: number;
  id_token: string;
  session_state: SessionState;
  first_issued_at: number;
  expires_at: number;
  idpId: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  photoUrl: string;
  firstName: string;
  lastName: string;
  authToken: string;
  idToken: string;
  response: Response;
  provider: string;
}

export default AuthUser;