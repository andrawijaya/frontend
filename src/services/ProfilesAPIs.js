import instance from "./AxiosGlobal";
import Header from "./Headers";

const getProfiles = () => {
  return instance.get(`/employee/profile`, Header);
};

const updateProfiles = (data) => {
  return instance.put(`/access/myself/profile`, data, Header);
};

const uploadProfilePhoto = (data) => {
  return instance.put(`/access/myself/profile/photo`, data, Header);
};

const ChangePassword = (data) => {
  return instance.post(`/access/myself/reset_password`, data, Header);
};

const ProfilesAPIs = {
  getProfiles,
  updateProfiles,
  uploadProfilePhoto,
  ChangePassword,
};

export default ProfilesAPIs;
