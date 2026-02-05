import axios from "axios";
import { getObjectData } from "../storage/data";
import refresh from "./autoReloadToken";

const getAllSlugs = async (teamName, router = null) => {
  try {
    const token = await getObjectData("token");

    const options = {
        method: "GET",
        url: `https://api.pandascore.co/teams?search[slug]=${teamName}`,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const slugs = await axios.request(options).then(function (response) {
        const allSlugs = response.data.map((team) => team.slug);
        return allSlugs;
      });
      return slugs;

    } catch (error) {
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
          refresh(token);
        }
        if (error.response && error.response.status === 401 && router) {
          router.replace("/token/initToken");
        }
      }
};

const getTeamLogo = async (teamName, router = null) => {
  try {
    const token = await getObjectData("token");

    const options = {
        method: "GET",
        url: `https://api.pandascore.co/teams?search[slug]=${teamName}`,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const logo = await axios.request(options).then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]?.image_url !== null) {
            return response.data[i]?.image_url;
          }
        }
        return null;
      });
      return logo;

    } catch (error) {
        if (error.response && error.response.status === 429) {
          const token = await getObjectData("token");
          refresh(token);
        }
        if (error.response && error.response.status === 401 && router) {
          router.replace("/token/initToken");
        }
      }
};

export { getAllSlugs, getTeamLogo };
