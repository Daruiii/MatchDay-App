import axios from "axios";
import { getObjectData } from "../storage/data";
import refresh from "./autoReloadToken";

const LogoApiData = async (router = null) => {
  try {
    const teamData = await getObjectData("teams");
    const token = await getObjectData("token");

    // 2. Fetch logos for each team
    const logoPromises = teamData.map(async (team) => {
      const options = {
        method: "GET",
        url: `https://api.pandascore.co/teams?search[slug]=${team.teamName}`,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const logoUrl = await axios.request(options).then(function (response) {
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i]?.image_url !== null) {
            return response.data[i]?.image_url;
          }
        }
        return null;
      });

      return {
        teamName: team.teamName,
        logo: logoUrl,
      };
    });

    const logos = await Promise.all(logoPromises);
    return logos;
  } catch (error) {
    if (error.response && error.response.status === 429) {
      const token = await getObjectData("token");
      refresh(token);
      return;
    }
    if (error.response && error.response.status === 401 && router) {
      router.replace("/token/initToken");
    }
  }
};

export default LogoApiData;