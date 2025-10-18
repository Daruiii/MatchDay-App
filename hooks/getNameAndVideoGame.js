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
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
        // alert("Refreshing token... ");
        console.log("Refreshing token... by getNameAndVideoGame");
        // refresh(token);
        }
        if (error.response && error.response.status === 401) {
        console.log("Token expired. Please check your token.");
        if (router) {
            router.replace("/token/initToken");
        }
        }
        else {
        console.log(error);
        // router.replace("/token/initToken");
        }
      }
}

export default getNameAndVideoGame;