// import axios from "axios";
import axios from "./setupAxios";

export const Metrics_Dashboard_Url = `${process.env.REACT_APP_API_URL}/metrics/dashboard/`;
export const Metrics_Visualization_Url = `${process.env.REACT_APP_API_URL}/metrics/visualization/`;
export const Salesforce_OAuth_Login_Url = `${process.env.REACT_APP_API_URL}/dashboard/salesfoce-oauth/login/`;
export const Get_Salesforce_Models_Url = `${process.env.REACT_APP_API_URL}/metrics/salesforce-models/`;
export const Get_Filter_Fields_Url = `${process.env.REACT_APP_API_URL}/metrics/get_fields/`;
export const Get_Query_Result_Url = `${process.env.REACT_APP_API_URL}/metrics/query_result/`;
export const Metrics_Url = `${process.env.REACT_APP_API_URL}/metrics/metric/`;
export const Dashboard_Metrics_Url = `${process.env.REACT_APP_API_URL}/metrics/dashboard-metric/`;
export const Metrics_Details_Url = `${process.env.REACT_APP_API_URL}/metrics/metric-detail/`;
export const Get_Data_Source_Url = `${process.env.REACT_APP_API_URL}/metrics/data-source/`;
export const Change_Password_Url = `${process.env.REACT_APP_API_URL}/customer/user/password-change/`;
export const Token_Update_Url = `${process.env.REACT_APP_API_URL}/customer/user/token/refresh/`;
export const CustUser_Profile_Url = `${process.env.REACT_APP_API_URL}/customer/user/users/`;

// --------------------- Metrics Dashboard Collection ----------------------------

export function allMatricsDashboard(req) {
  return axios.get(Metrics_Dashboard_Url, req);
}

export function specificMatricsDashboard(id, req) {
  return axios.get(Metrics_Dashboard_Url + `${id}/`, req);
}

export function addMatricsDashboard(req) {
  return axios.post(Metrics_Dashboard_Url, req);
}

export function editMatricsDashboard(id, req) {
  return axios.put(Metrics_Dashboard_Url + `${id}/`, req);
}

export function deleteMatricsDashboard(id, req) {
  return axios.delete(Metrics_Dashboard_Url + `${id}/`, req);
}

// ---------------- Metrics Collection -------------------

export function getVisualizationList(req) {
  return axios.get(Metrics_Visualization_Url, req);
}

export function salesforceLogin(req) {
  return axios.get(Salesforce_OAuth_Login_Url, req);
}

export function GetSalesforceModels(req) {
  return axios.get(Get_Salesforce_Models_Url, req);
}

export function GetFilterFields(req) {
  const url = `${Get_Filter_Fields_Url}?model=${encodeURIComponent(req.model)}&field=${encodeURIComponent(req.field)}`;
  return axios.get(url, req);
}

export function GetQueryResult(req) {
  // console.log("req data", req)
  const url = `${Get_Query_Result_Url}?filter=${encodeURIComponent(req.filter)}=${encodeURIComponent(req.selectedFilter)}&data_source=${encodeURIComponent(req.data_source)}&dimension=${encodeURIComponent(req.dimension.join(","))}&measure=${encodeURIComponent(req.measure.map(field => `${req.selectedMeasureFilter}(${field})`).join(','))}&sort=${encodeURIComponent(req.sort)}`;
  return axios.get(url, req);
}

export function SaveVisualizationMetrics(req) {
  return axios.post(Metrics_Url, req);
}
export function UpdateMetrics(id,req) {
  return axios.put(Metrics_Url + `${id}/`, req);
}

export function CreateDashboardMetrics(req) {
  return axios.post(Dashboard_Metrics_Url, req);
}
export function GetDashboardMetrics(req) {
  return axios.get(Dashboard_Metrics_Url, req);
}

export function SaveMetricsDetails(req) {
  return axios.post(Metrics_Details_Url, req);
}

export function GetMetricDetails(req) {
  return axios.get(Metrics_Details_Url, req);
}

export function GetDataSource(req) {
  return axios.get(Get_Data_Source_Url, req);
}

export function GetMetricsList(req) {
  return axios.get(Metrics_Url, req);
}

//----------------- Password Change ----------------------------

export function passwordChange(req) {
  return axios.post(Change_Password_Url, req);
}

//------------------ Token Updation ---------------------------

export function tokenUpdate(req) {
  return axios.post(Token_Update_Url, req);
}

//----------------- Customer Profile ---------------------------

export function custProfileDetails(id, req){
  return axios.get(CustUser_Profile_Url + `${id}/`, req);
}

export function custProfileUpdate(req, id){
  return axios.put(CustUser_Profile_Url + `${id}/`, req);
}