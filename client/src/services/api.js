import axios from "axios";
import { constant } from "constant";

// Add this function for versioned login API
export const versionedLoginApi = async (data) => {
  const API_VERSION = process.env.REACT_APP_API_VERSION;
  console.log("API_VERSION VALUE:", API_VERSION);
  try {
    let result = await axios.post(
      `http://localhost:3000/auth/${API_VERSION}/user/login`,
      data
    );
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const postApi = async (path, data, login) => {
  try {
    let result = await axios?.post(constant?.baseUrl + path, data, {
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    });
    if (result?.data?.token && result?.data?.token !== null) {
      if (login) {
        localStorage.setItem("token", result?.data?.token);
      } else {
        sessionStorage.setItem("token", result?.data?.token);
      }
      localStorage.setItem("user", JSON.stringify(result?.data?.user));
    }
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const postApiBlob = async (path, data = {}) => {
  try {
    let result = await axios?.post(constant?.baseUrl + path, data, {
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
      responseType: "blob",
    });

    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const putApi = async (path, data, id) => {
  try {
    let result = await axios?.put(constant?.baseUrl + path, data, {
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    });
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const deleteApi = async (path, param) => {
  try {
    let result = await axios?.delete(constant?.baseUrl + path + param, {
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    });
    if (result?.data?.token && result?.data?.token !== null) {
      localStorage.setItem("token", result?.data?.token);
    }
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const deleteManyApi = async (path, data) => {
  try {
    let result = await axios?.post(constant?.baseUrl + path, data, {
      headers: {
        Authorization:
          localStorage.getItem("token") || sessionStorage.getItem("token"),
      },
    });
    if (result?.data?.token && result?.data?.token !== null) {
      localStorage.setItem("token", result?.data?.token);
    }
    return result;
  } catch (e) {
    console.error(e);
    return e;
  }
};

export const getApi = async (path, id) => {
  try {
    if (id) {
      let result = await axios?.get(constant?.baseUrl + path + id, {
        headers: {
          Authorization:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      });
      return result;
    } else {
      let result = await axios?.get(constant?.baseUrl + path, {
        headers: {
          Authorization:
            localStorage.getItem("token") || sessionStorage.getItem("token"),
        },
      });
      return result;
    }
  } catch (e) {
    console.error(e);
    return e;
  }
};
