import { api, requestConfig } from "../utils/config";
import { IData } from "../utils/type";

async function register(data: IData) {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/register`, config)
      .then((res) => res.json())
      .catch((err) => err);

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
}

function logout() {
  localStorage.removeItem("user");
}

async function login(data: IData) {
  const config = requestConfig("POST", data);

  try {
    const res = await fetch(`${api}/users/login`, config).then((res) =>
      res.json().catch((err) => err)
    );

    if (res._id) {
      localStorage.setItem("user", JSON.stringify(res));
    }

    return res;
  } catch (error) {
    console.log(error);
  }
}

export const authService = {
  register,
  logout,
  login,
};
