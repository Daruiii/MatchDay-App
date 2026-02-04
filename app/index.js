import {
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Pressable,
  RefreshControl,
} from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";

import { COLORS, icons, SIZES } from "../constants";
import {
  Navbar,
  FixedBtn,
  UpcomingRow,
  GradientBackground,
  PageHeader,
} from "../components";
import { getNextMatch } from "../hooks/setNotifications";

import {
  getObjectData,
  storeObjectData,
  removeObjectData,
} from "../storage/data";
import { hasValidToken, storeSecureToken } from "../storage/secureStorage";

const Home = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);
  const [teams, setTeams] = useState([]);
  const [token, setToken] = useState("");

  useEffect(() => {
    // check if token is set
    hasValidToken().then((isValid) => {
      if (!isValid) {
        router.replace("/token/initToken");
      }
    });
    const fetchNotifSettings = async () => {
      try {
        const data = await getObjectData("notifSwitch");
        if (data) {
          // console.log(data);
        }
        if (!data) {
          storeObjectData("notifSwitch", {
            0: true,
          });
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchNotifSettings();
    const fetchTeams = async () => {
      // fetch teams from storage
      setIsLoading(true);
      try {
        const data = await getObjectData("teams");
        if (data) {
          setTeams(data);
        }
        if (!data) {
          storeObjectData("teams", data);
        }
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    fetchTeams();
  }, [refreshing]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const teamsToNotify = teams.filter((team) => team.notificate === true);
      const slugs = teamsToNotify?.map((team) => team.slugs);
      // console.log(slugs.flat());
      teamsToNotify?.map(async (team) => {
        // console.log(team.slugs);
        getNextMatch(team.slugs);
      });
    };
    fetchNotifications();
  }, [teams]);

  const handlePressAdd = () => {
    router.replace("/team/addDefault");
  };
  const handlePressAddDefault = () => {
    router.replace("/team/addDefault");
  };

  const handlePressMenu = () => {
    router.replace("/menu/menu");
  };

  const handlePressSettings = () => {
    router.replace("/settings/settings");
  };
  const handlePressGo = (teamName) => {
    router.replace(`/team/${teamName}`);
    console.log(teamName);
  };

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <PageHeader
          title="Home"
          rightIcon={icons.settings}
          onRightPress={handlePressSettings}
        />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                setTimeout(() => setRefreshing(false), 1000);
              }}
            />
          }
        >
          <View
            style={{
              flex: 1,
              padding: SIZES.medium,
              marginBottom: 95,
            }}
          >
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : teams?.length > 0 ? (
              teams.map((team, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          color: team.secondColor,
                          fontSize: SIZES.large,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        -
                      </Text>
                      <Pressable onPress={() => handlePressGo(team.teamName)}>
                        <View
                          style={{
                            borderRadius: 50,
                            backgroundColor: team?.eventColor,
                            shadowColor: team?.secondColor,
                            shadowOffset: {
                              width: 0,
                              height: 5,
                            },
                            shadowOpacity: 0.5,
                            shadowRadius: 3.84,
                            borderColor: team?.secondColor,
                            borderWidth: 1 / 4,
                            width: 40,
                            height: 40,
                            justifyContent: "center",
                            alignItems: "center",
                            marginHorizontal: 20,
                          }}
                        >
                          <Image
                            source={{ uri: team.image_url }}
                            style={{
                              width: 25,
                              height: 25,
                            }}
                            resizeMode="contain"
                          />
                        </View>
                      </Pressable>
                      <Text
                        style={{
                          color: team.secondColor,
                          fontSize: SIZES.large,
                          fontWeight: "bold",
                          textAlign: "center",
                        }}
                      >
                        -
                      </Text>
                    </View>
                    <UpcomingRow teamData={team} />
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 600,
                }}
              >
                <Pressable
                  onPress={handlePressAddDefault}
                  style={{
                    backgroundColor: COLORS.secondary,
                    padding: 10,
                    borderRadius: 10,
                    shadowColor: COLORS.white,
                    shadowOffset: {
                      width: 0,
                      height: 5,
                    },
                    shadowOpacity: 0.34,
                    shadowRadius: 6.27,
                    elevation: 10,
                    marginHorizontal: 60,
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.gray,
                      fontSize: SIZES.medium,
                      fontFamily: "RogueHero2",
                      textAlign: "center",
                    }}
                  >
                    See the default teams
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        </ScrollView>
        <FixedBtn
          iconUrl={icons.plus}
          dimension="60%"
          handlePress={handlePressAdd}
          bgColor={COLORS.addBtnBg}
        />
        <Navbar />
      </GradientBackground>
    </View>
  );
};

export default Home;
