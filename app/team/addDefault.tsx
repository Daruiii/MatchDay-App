import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import SelectDropdown from 'react-native-select-dropdown';

import { COLORS, SIZES } from '../../constants';
import { Navbar, DefaultTeams, GradientBackground, PageHeader } from '../../components';
import { defaultTeams } from '../../storage/teamsData';
import flagsData from '../../storage/flagsData.json';
import { StoredTeam } from '../../types/api';

import { getObjectData } from '../../storage/data';
import { addTeam } from '../../storage/teamsData';

interface CountryOption {
  value: string;
  label: string;
}

const AddDefault: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<StoredTeam[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<CountryOption>({ value: 'ALL', label: 'All' });
  
  const countryOptions: CountryOption[] = [
    { value: 'ALL', label: 'All' },
    { value: 'FR', label: (flagsData as any)['FR'].emoji },
    { value: 'US', label: (flagsData as any)['US'].emoji },
    { value: 'CN', label: (flagsData as any)['CN'].emoji },
    { value: 'KR', label: (flagsData as any)['KR'].emoji },
    { value: 'BR', label: (flagsData as any)['BR'].emoji },
    { value: 'DE', label: (flagsData as any)['DE'].emoji },
    { value: 'GB', label: (flagsData as any)['GB'].emoji },
    { value: 'NL', label: (flagsData as any)['NL'].emoji },
    { value: 'ES', label: (flagsData as any)['ES'].emoji },
    { value: 'DK', label: (flagsData as any)['DK'].emoji },
    { value: 'UA', label: (flagsData as any)['UA'].emoji },
    { value: 'SA', label: (flagsData as any)['SA'].emoji },
  ];

  const addToMyTeam = async (team: StoredTeam) => {
    await addTeam(
      team.teamName, 
      team.backgroundColor, 
      team.secondColor, 
      team.eventColor, 
      team.eventTextColor, 
      team.slugs, 
      team.image_url
    );
    setTeams([...teams, team]);
    router.replace('/');
  };

  const handlePressAdd = () => {
    router.replace('/team/add');
  };

  const filteredTeams = defaultTeams.filter((team) => {
    const isAlreadyInMyTeams = teams.find((t) => t.teamName === team.teamName);
    const isCountrySelected = selectedCountries.value === team.country;
    
    if (selectedCountries.value === 'ALL') {
      return !isAlreadyInMyTeams;
    }
    return !isAlreadyInMyTeams && isCountrySelected;
  });

  useEffect(() => {
    const fetchTeams = async () => {
      setIsLoading(true);
      try {
        const data = await getObjectData<StoredTeam[]>('teams');
        if (data) {
          setTeams(data);
        }
      } catch (err) {
        setError((err as Error).message);
      }
      setIsLoading(false);
    };
    fetchTeams();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <PageHeader title="Add Team" />
        <View style={{ flex: 1 }}>
          <Pressable 
            onPress={handlePressAdd} 
            style={{ 
              backgroundColor: COLORS.info, 
              padding: 10, 
              borderRadius: 10, 
              marginHorizontal: 60, 
              marginTop: 20 
            }}
          >
            <Text style={{ 
              color: COLORS.white, 
              fontSize: SIZES.medium, 
              fontFamily: 'RogueHero2', 
              textAlign: 'center' 
            }}>
              Add a personnalised team !
            </Text>
          </Pressable>
          <View style={{ 
            flexDirection: 'row', 
            justifyContent: 'center', 
            alignItems: 'center', 
            marginTop: 20 
          }}>
            <Text style={{ 
              color: COLORS.white, 
              fontSize: SIZES.medium, 
              fontFamily: 'RogueHero2', 
              textAlign: 'center' 
            }}>
              DEFAULT TEAMS
            </Text>
            <SelectDropdown
              data={countryOptions}
              onSelect={(selectedItems: CountryOption) => setSelectedCountries(selectedItems)}
              defaultButtonText="All"
              defaultValue={selectedCountries.label}
              buttonTextAfterSelection={() => {
                return `${selectedCountries.label}`;
              }}
              rowTextForSelection={(item: CountryOption) => item.label}
              buttonStyle={{ 
                backgroundColor: COLORS.info, 
                marginHorizontal: 10, 
                width: 75, 
                height: 30, 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderRadius: 10 
              }} 
              buttonTextStyle={{ 
                color: COLORS.white, 
                fontSize: SIZES.small, 
                fontFamily: 'RogueHero2', 
                textAlign: 'center' 
              }}
              dropdownStyle={{ 
                backgroundColor: COLORS.info, 
                borderRadius: 10 
              }}
              rowStyle={{ 
                borderBottomColor: COLORS.white, 
                borderBottomWidth: 1, 
                padding: 10 
              }}
              rowTextStyle={{ 
                color: COLORS.white, 
                fontSize: SIZES.medium, 
                fontFamily: 'RogueHero2', 
                textAlign: 'center' 
              }}
            />
          </View>
          <ScrollView style={{ flex: 1, marginTop: 20 }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'center', 
              alignItems: 'center', 
              flexWrap: 'wrap', 
              marginBottom: 95 
            }}>
              {defaultTeams.filter((team) => !teams.find((t) => t.teamName === team.teamName)).length > 0 ? (
                filteredTeams.map((team, index) => (
                  <DefaultTeams key={index} index={index} team={team} addTeam={addToMyTeam} />
                ))
              ) : (
                <Text style={{ 
                  color: COLORS.gray, 
                  fontSize: SIZES.medium, 
                  fontFamily: 'RogueHero2', 
                  marginTop: 20, 
                  textAlign: 'center' 
                }}>
                  No more teams to add
                </Text>
              )}
            </View>
          </ScrollView>
        </View>

        <Navbar />
      </GradientBackground>
    </View>
  );
};

export default AddDefault;
