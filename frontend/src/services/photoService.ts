import { api, requestConfig } from "../utils/config";
import { IPhoto } from "../utils/type";

const publishPhoto = async (data: IPhoto, token: string) => {
  const config = requestConfig("POST", data, token, true);
  console.log(data);

  try {
    const res = await fetch(api + "/photos", config)
      .then((res) => res.json())
      .catch((err) => err);

    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const photoService = { publishPhoto };
