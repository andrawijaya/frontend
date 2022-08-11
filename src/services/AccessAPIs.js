import instance from "./AxiosGlobal";
import Header from "./Headers";

const listPermissions = () => {
  return instance.get(`access/permission`, Header);
};

const AccessAPIs = {
  listPermissions,
};

export default AccessAPIs;
