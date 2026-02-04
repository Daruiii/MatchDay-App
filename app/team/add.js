import { View, Text, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';

import { COLORS, SIZES } from '../../constants';
import { Navbar, TeamForm, GradientBackground, PageHeader } from '../../components';

import { getObjectData } from '../../storage/data';

const Add = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [teams, setTeams] = useState([]);

    const updateTeams = (newTeams) => {
        setTeams(newTeams);
    }

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
            <GradientBackground>
                <PageHeader title="New Team" />
                <Text style={{ color: COLORS.white, fontSize: SIZES.medium, fontFamily:"RogueHero2", marginTop: 20, textAlign: 'center' }}>
                    ADD A TEAM
                </Text>
                <ScrollView>
                    <View style={{ flex: 1,marginBottom:95 }}>
                        {/* <Text style={{ color: COLORS.white, fontSize: SIZES.medium, fontWeight: "bold", marginTop: 20, textAlign: 'center' }}>
                            TEAM INFORMATIONS
                        </Text> */}
                        <TeamForm updateTeams={updateTeams} teams={teams} team={[]} />
                    </View>
                </ScrollView>

                <Navbar />
            </GradientBackground>
        </View>
    )
}

export default Add;