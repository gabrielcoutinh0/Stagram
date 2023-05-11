import { api, requestConfig } from "../utils/config";

const getAllUsers = async () => {
  const config = requestConfig("GET");

  try {
    const res = await fetch(api + "/users/", config)
      .then((res) => res.json())
      .catch((err) => err);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const usersService = {
  getAllUsers,
};

export default usersService;
