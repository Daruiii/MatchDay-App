import React, { useEffect, useState } from "react";
import { View, Text, FlatList } from "react-native";
import { useRouter } from "expo-router";
import styles from "./navbar.style";
import NavbarBtn from "../navbar/button/NavbarBtn";
import { COLORS, icons, SIZES, images } from "../../constants";
import { getObjectData } from '../../storage/data';
import type { StoredTeam } from '../../types';

interface NavbarProps {
  teams?: StoredTeam[];
}

const Navbar: React.FC<NavbarProps> = (teams) => {
  const router = useRouter();
  const [teamsData, setTeamsData] = useState<StoredTeam[]>([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const data = await getObjectData<StoredTeam[]>("teams");
        setTeamsData(data || []);
      } catch (error) {
        // Error fetching teams
      }
    };
    fetchTeams();
  }, [teams]);

  const handlePressLeftButton = () => {
    router.push("/");
  };

  const handlePressNavbarBtn = (teamName: string) => {
    router.replace(`/team/${teamName}`);
  };

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
                ? (icons as any)[item.teamName] || { uri: item.image_url }
                : (icons as any)[item.teamName] || images.unknownTeam
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
