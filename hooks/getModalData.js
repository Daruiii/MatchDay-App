import axios from "axios";
import { useRouter } from "expo-router";
import { getObjectData } from "../storage/data";
import refresh from "./autoReloadToken";

const getModalData = async (teamId) => {
    const router = useRouter();
  try {
    const token = await getObjectData("token");

    const options = {
        method: "GET",
        url: `https://api.pandascore.co/teams/${teamId}`,
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
        },
      };
        const team = await axios.request(options).then(function (response) {
            return response.data;
        });
        // console.log(team);
        return team;

    } catch (error) {
        const token = await getObjectData("token");
        if (error.response && error.response.status === 429) {
          // alert("Refreshing token... ");
          console.log("Refreshing token... by getModalData");
          refresh(token);
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
const getModalTournamentRankingData = async (tournamentId) => {
  try {
    const token = await getObjectData("token");

    const options = {
      method: "GET",
      url: `https://api.pandascore.co/tournaments/${tournamentId}/standings`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
      const tournament = await axios.request(options).then(function (response) {
          return response.data;
      });
      // console.log(team);
      return tournament;

  } catch (error) {
      const token = await getObjectData("token");
      if (error.response && error.response.status === 429) {
        // alert("Refreshing token... ");
        console.log("Refreshing token... by getModalData");
        refresh(token);
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
}

const getModalTournamentData = async (tournamentId) => {
  const router = useRouter();
try {
  const token = await getObjectData("token");

  const options = {
      method: "GET",
      url: `https://api.pandascore.co/tournaments/${tournamentId}/matches`,
      headers: {
        accept: "application/json",
        authorization: `Bearer ${token}`,
      },
    };
      const tournament = await axios.request(options).then(function (response) {
          return response.data;
      });
      // console.log(team);
      return tournament;

  } catch (error) {
      const token = await getObjectData("token");
      if (error.response && error.response.status === 429) {
        // alert("Refreshing token... ");
        console.log("Refreshing token... by getModalData");
        refresh(token);
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
}

export { getModalData,getModalTournamentRankingData, getModalTournamentData }