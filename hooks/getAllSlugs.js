import axios from "axios";
import { useRouter } from "expo-router";
import { getObjectData } from "../storage/data";
import refresh from "./autoReloadToken";

const getAllSlugs = async (teamName) => {
    const router = useRouter();
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
        const allSlugs = response.data.map((team) => {
          console.log(team.slug);
            return team.slug;
        }
        );
        return allSlugs;
      });
      return slugs;

    } catch (error) {
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
        alert("Refreshing token... ");
        () => refresh(token);
        }
        if (error.response && error.response.status === 401) {
        alert("Token expired. Please check your token.");
        router.replace("/token/initToken");
        }
        else {
        // alert("Error fetching logos. Please check your token.");
        router.replace("/token/initToken");
        }
      }
};

const getTeamLogo = async (teamName) => {
    const router = useRouter();
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
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
          // alert("Refreshing token... ");
          console.log("Refreshing token... by getAllSlugs");
          // refresh(token);
      }
      if (error.response && error.response.status === 401) {
          console.log("Token expired. Please check your token.");
          // router.replace("/token/initToken");
          }
          else {
          console.log(error);
          // router.replace("/token/initToken");
          }
      }
};

export { getAllSlugs, getTeamLogo };
