import axios from "axios";
import { getObjectData } from "../storage/data";
import refresh from "./autoReloadToken";

const getNameAndVideoGame = async (slug, router = null) => {
  try {
    const token = await getObjectData("token");

    const options = {
        method: "GET",
        url: `https://api.pandascore.co/teams/${slug}`,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      const teamNameAndVideoGame = await axios.request(options).then(function (response) {
        const teamName = response.data?.name
        const videoGame = response.data?.current_videogame?.name ?? "Unknown";
        const videoGameSlug = response.data?.current_videogame?.slug ?? "Unknown";
        return {teamName, videoGame, videoGameSlug};
      });
        return teamNameAndVideoGame;

    } catch (error) {
        if (error.response && error.response.status === 429) {
          const token = await getObjectData("token");
          refresh(token);
        }
        if (error.response && error.response.status === 401 && router) {
          router.replace("/token/initToken");
        }
      }
}

export default getNameAndVideoGame;