import { View, Text, ScrollView, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useState, useEffect } from 'react';

import { COLORS, SIZES } from '../../../constants';
import { Navbar, TeamForm, GradientBackground, PageHeader } from '../../../components';

import { getObjectData } from '../../../storage/data';

const Update = () => {
    const params = useLocalSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);
    const [team, setTeam] = useState([]);

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }
    useEffect(() => {
        const fetchTeam = async () => {
            setIsLoading(true);
            try {
                const data = await getObjectData("teams");
                if (data) {
                    const team = data.filter(team => team.teamName === params.teamToUpdate);
                    setTeam(team)
                }
            } catch (err) {
                setError(err.message);
            }
            setIsLoading(false);
        };
        fetchTeam();
    }, []);

    if (team.length === 0) {
        return (
            <View style={{ flex: 1, backgroundColor: COLORS.headerBg }}>
                <GradientBackground>
                </GradientBackground>
            </View>
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <GradientBackground>
                <PageHeader title="Edit" />
                <ScrollView>
                    <View style={{ flex: 1, marginBottom: 90 }}>
                        <Image source={{ uri: team[0].image_url }} style={{ width: 40, height: 40, alignSelf: 'center', marginTop: 20 }} resizeMode='contain' />
                        <Text style={{ color: COLORS.lightWhite, fontSize: SIZES.medium, fontFamily: "RogueHero2", marginTop: 20, textAlign: 'center' }}>
                            UPDATE TEAM
                        </Text>
                        <TeamForm updateTeams={updateTeams} teams={teams} team={team} />
                    </View>
                </ScrollView>

                <Navbar />
            </GradientBackground>
        </View>
    )
}

export default Update;