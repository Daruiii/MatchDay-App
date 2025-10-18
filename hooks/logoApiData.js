import { useEffect, useState } from "react";
import axios from "axios";
import { getObjectData, storeObjectData } from "../storage/data";
import refresh from "./autoReloadToken";
import images from "../constants/images";

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
    const token = await getObjectData("token");
    if (error.response && error.response.status === 429) {
    alert("Refreshing token... ");
    refresh(token);
    return;
    }
    if (error.response && error.response.status === 401) {
    alert("Token expired. Please check your token.");
    }
    else {
    // alert("Error fetching logos. Please check your token.");
    console.log('Error fetching logos. Please check your token.');
    // router.replace("/");
    }
  }
};

export default LogoApiData;