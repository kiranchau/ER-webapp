import axios from "./setupAxios.js";

export const Send_Otp_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/send-otp/`;
export const Verify_Otp_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/verify-otp-register/`;
export const Register_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/register/`;
export const Login_Send_Otp_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/login/`;
export const Login_Verify_Otp_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/verify-otp/`;
export const Account_Creation_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/account-creation/`;
export const Get_User_Details = `${process.env.REACT_APP_APP_API_URL}/customer/user/users/`;
export const Csrf_Token_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/get-csrf/`;
export const Forgot_Pass_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/password-reset/`;
export const Reset_Pass_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/password-reset-confirm/`;
export const Token_Update_Url = `${process.env.REACT_APP_APP_API_URL}/customer/user/token/refresh/`;

//-------------Registration Apis------------------------

export function sendOtp(req) {
  return axios.post(Send_Otp_Url, req);
}

export function verifyOtp(req) {
  return axios.post(Verify_Otp_Url, req);
}

export function registerUser(req) {
  return axios.post(Register_Url, req);
}

//------------- Login Apis ------------------------------

export function loginSendOtp(req) {
  return axios.post(Login_Send_Otp_Url, req);
}

export function loginVerifyOtp(req) {
  return axios.post(Login_Verify_Otp_Url, req);
}

//------------- Account creation Apis ------------------------------

export function createAccount(req) {
  return axios.post(Account_Creation_Url, req);
}

export function getUserDetails(id) {
  return axios.get(Get_User_Details + `${id}/`);
}

// ----------------CSRF Token ------------------------

export function csrfTokenGenerate() {
  return axios.get(Csrf_Token_Url);
}

//------------------ Forgot Password --------------------------

export function forgotPass(req) {
  return axios.post(Forgot_Pass_Url, req);
}

//----------------- Reset Password -----------------------------

export function resetPass(req, liveUrlPath1, liveUrlPath2) {
  return axios.post(Reset_Pass_Url + liveUrlPath1 + "/" + liveUrlPath2 + "/", req);
}

//------------------ Token Updation ---------------------------

export function tokenUpdate(req) {
  return axios.post(Token_Update_Url, req);
}