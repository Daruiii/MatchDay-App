import React, { useEffect, useState } from "react";
import { ScrollView, View, ActivityIndicator, Text, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import styles from "./navbar.style";
import NavbarBtn from "../navbar/button/NavbarBtn";
import { COLORS, icons, SIZES, images } from "../../constants";
import LogoApiData from "../../hooks/logoApiData";
import { getObjectData, storeObjectData } from '../../storage/data';


const Navbar = (teams) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [logos, setLogos] = useState([]);
  const [teamsData, setTeamsData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    // LogoApiData()
    //   .then((retrievedLogos) => {
    //     setLogos(retrievedLogos);
    //     setIsLoading(false);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setError(error);
    //     setIsLoading(false);
    //   });
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const data = await getObjectData("teams");
        setTeamsData(data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setIsLoading(false);
      }
    }
    fetchTeams();
  }, [teams]);

  const handlePressLeftButton = () => {
    router.push("/");
  };

  const handlePressAddDefault = () => {
    router.replace('/team/addDefault');
  }

  const handlePressNavbarBtn = (teamName) => {
    router.replace(`/team/${teamName}`)
    console.log(teamName);
  }

  return (
    <View style={styles.container}>
      <View style={styles.leftButton}>
        <NavbarBtn iconUrl={icons.home} dimension="50%" handlePress={handlePressLeftButton} />
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={teamsData}
        keyExtractor={(item, index) => index.toString()}
        style={styles.scrollContainer}
        ListEmptyComponent={() => (
          <Text style={{ color: COLORS.gray, fontSize: SIZES.large, fontFamily: "RogueHero2", textAlign: 'center', marginTop: 10, marginLeft: 10 }}>
            0 TEAM ADDED
          </Text>
        )}
        renderItem={({ item }) => (
          <NavbarBtn
            iconUrl={
              item.image_url
                ? icons[item.teamName] || { uri: item.image_url }
                : icons[item.teamName] || images.unknownTeam
            }
            dimension="55%"
            handlePress={() => handlePressNavbarBtn(item.teamName)}
          />
        )}
      />
    </View>
  );
};

export default Navbar;