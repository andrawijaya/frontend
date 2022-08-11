import instance from "./AxiosGlobal";
import Header from "./Headers";

const getListUser = (params) => {
  const paramsHeader = { ...params, ...Header };
  return instance.get(`access/user`, paramsHeader);
};

const addNewUser = (data) => {
  return instance.post(`access/user`, data, Header);
};

const getUserById = (id) => {
  return instance.get(`access/user/${id}`, Header);
};

const activateUsers = (data) => {
  return instance.post(`access/activate`, data, Header);
};

const getListRole = (params) => {
  const paramsHeader = { ...params, ...Header };
  return instance.get(`access/role`, paramsHeader);
};

const getDetailsProfile = () => {
  return instance.get(`employee/profile`, Header);
};

/* internal APIs */
const getListEmailNotif = (params) => {
  const paramsHeader = { ...params, ...Header };
  return instance.get(`internal/notification`, paramsHeader);
};

const addNewEmailNotif = (data) => {
  return instance.post(`internal/notification`, data, Header);
};

const getEmailNotifById = (id) => {
  return instance.get(`internal/notification/${id}`, Header);
};

const UpdateEmailNotifById = (id, data) => {
  return instance.put(`internal/notification/${id}`, data, Header);
};

const deleteEmailNotifById = (id) => {
  return instance.delete(`internal/notification/${id}`, Header);
};

const editRoles = (email, data) => {
  return instance.put(`access/user/${email}/edit`, data, Header);
};

const UserManagementAPIs = {
  addNewUser,
  getListUser,
  activateUsers,
  getListRole,
  getUserById,
  getDetailsProfile,
  getListEmailNotif,
  addNewEmailNotif,
  getEmailNotifById,
  UpdateEmailNotifById,
  deleteEmailNotifById,
  editRoles,
};

export default UserManagementAPIs;
