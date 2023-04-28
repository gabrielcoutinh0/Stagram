import { api, requestConfig } from "../utils/config";
import { IData } from "../utils/type";

async function profile(data: IData, token: string) {
  const config = requestConfig("GET", data, token);

  try {
    const res = await fetch(api + "/users/profile", config)
      .then((res) => res.json())
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
}

const updateProfile = async (data: IData, token: string) => {
  const config = requestConfig("PUT", data, token);

  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => console.log("PROMISE --> ", res.json()))
      .catch((err) => err);

    return res;
  } catch (error) {
    console.log(error);
  }
};

const userService = {
  profile,
  updateProfile,
};

export default userService;
