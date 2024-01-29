import { View, Text, ScrollView, Image, Pressable, ImageBackground } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';
import { useState, useEffect } from 'react';

import { COLORS, icons, SIZES, images } from '../../constants';
import { HeaderBtn, Navbar, DefaultTeams } from '../../components';
import { defaultTeams } from '../../storage/teamsData';
import flagsData from '../../storage/flagsData.json';

import { getObjectData } from '../../storage/data';
import { addTeam } from '../../storage/teamsData';

const AddDefault = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState({ value: 'ALL', label: 'All' });
    const countryOptions = [
        { value: 'ALL', label: 'All' },
        { value: 'FR', label: flagsData['FR'].emoji},
        { value: 'US', label: flagsData['US'].emoji},
        { value: 'CN', label: flagsData['CN'].emoji},
        { value: 'KR', label: flagsData['KR'].emoji},
        { value: 'BR', label: flagsData['BR'].emoji},
        { value: 'DE', label: flagsData['DE'].emoji},
        { value: 'GB', label: flagsData['GB'].emoji},
        { value: 'NL', label: flagsData['NL'].emoji},
        { value: 'ES', label: flagsData['ES'].emoji},
        { value: 'DK', label: flagsData['DK'].emoji},
        { value: 'UA', label: flagsData['UA'].emoji},
        { value: 'SA', label: flagsData['SA'].emoji},
    ];

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }

    const addToMyTeam = async (team) => {
        await addTeam(team.teamName, team.backgroundColor, team.secondColor, team.eventColor, team.eventTextColor, team.slugs, team.image_url);
        setTeams([...teams, team]);
        router.replace('/');
    }

    const handlePressAdd = () => {
        router.replace('/team/add');
    }
    const filteredTeams = defaultTeams.filter((team) => {
        const isAlreadyInMyTeams = teams.find((t) => t.teamName === team.teamName);
        // check if team.country === selectedCountries.value
        const isCountrySelected = selectedCountries.value === team.country;
        // return les teams qui ne sont pas dans myTeams et qui sont du pays sélectionné
        if (selectedCountries.value === 'ALL') {
            return !isAlreadyInMyTeams;
        }
        return !isAlreadyInMyTeams && isCountrySelected;

    });
    useEffect(() => {
        const fetchTeams = async () => {
            setIsLoading(true);
            try {
                const data = await getObjectData("teams");
                if (data) {
                    setTeams(data);
                }
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchTeams();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={images.background} style={{ flex: 1, resizeMode: "cover", justifyContent: "center" }} blurRadius={1}>
                <Stack.Screen
                    options={{
                        headerStyle: {
                            backgroundColor: COLORS.headerBg,
                        },
                        headerTitleStyle: {
                            color: COLORS.lightWhite,
                            fontSize: SIZES.xLarge,
                            fontFamily: 'RogueHero',
                        },
                        headerShadowVisible: true,
                        headerBackVisible: false,
                        headerLeft: () => (
                            ""
                        ),
                        headerTitle:() => (
                            <Pressable onPress={() => { router.replace('/') }}>
                            <Image source={images.icon} resizeMode="contain" style={{
                                width: 50, height: 40, tintColor: COLORS.lightWhite,
                            }} />
                            </Pressable>
                        ),
                        headerTitleAlign: 'center',
                    }}
                />
                <View style={{ flex: 1 }}>
                    <Pressable onPress={handlePressAdd} style={{ backgroundColor: COLORS.info, padding: 10, borderRadius: 10, marginHorizontal: 60, marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: SIZES.medium, fontFamily: "RogueHero2", textAlign: 'center' }}>
                            Add a personnalised team !
                        </Text>
                    </Pressable>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ color: COLORS.white, fontSize: SIZES.medium, fontFamily: "RogueHero2", textAlign: 'center' }}>
                            DEFAULT TEAMS
                        </Text>
                        <SelectDropdown
                            data={countryOptions}
                            onSelect={(selectedItems) => setSelectedCountries(selectedItems)}
                            defaultButtonText="All"
                            defaultValue={selectedCountries.label}
                            buttonTextAfterSelection={(selectedItems, totalSelected) => {
                                return `${selectedCountries.label}`;
                            }}
                            rowTextForSelection={(item) => item.label}
                            buttonStyle={{ backgroundColor: COLORS.info, marginHorizontal: 10, width: 75, height: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} 
                            buttonTextStyle={{ color: COLORS.white, fontSize: SIZES.small, fontFamily: "RogueHero2", textAlign: 'center' }}
                            dropdownStyle={{ backgroundColor: COLORS.info, borderRadius: 10 }}
                            rowStyle={{ borderBottomColor: COLORS.white, borderBottomWidth: 1, padding: 10 }}
                            rowTextStyle={{ color: COLORS.white, fontSize: SIZES.medium, fontFamily: "RogueHero2", textAlign: 'center' }}

                        />
                    </View>
                    <ScrollView style={{ flex: 1, marginTop: 20 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom:95 }}>
                            {defaultTeams.filter((team) => !teams.find((t) => t.teamName === team.teamName)).length > 0 ? (
                                filteredTeams.map((team, index) => (
                                    <DefaultTeams key={index} team={team} addTeam={addToMyTeam} />
                                ))
                            ) : (
                                <Text style={{ color: COLORS.gray, fontSize: SIZES.medium, fontFamily: "RogueHero2", marginTop: 20, textAlign: 'center' }}>
                                    No more teams to add
                                </Text>
                            )}
                        </View>
                    </ScrollView>
                </View>

                <Navbar />
            </ImageBackground>
        </View>
    )
}

export default AddDefault;