import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { addTeam, updateTeam } from '../../../storage/teamsData';
import { useRouter } from 'expo-router';
import { COLORS, SIZES } from '../../../constants';
import styles from './teamForm.style';
import ColorPickerForm from './ColorPickerForm';
import GamesBtn from '../button/GamesBtn';


const TeamForm = ({ updateTeams, teams, team }) => {
  const router = useRouter();

  const [teamData, setTeamData] = useState({
    teamName: team[0]?.teamName || '',
    backgroundColor: team[0]?.backgroundColor || '',
    secondColor: team[0]?.secondColor || '',
    eventColor: team[0]?.eventColor || '',
    eventTextColor: team[0]?.eventTextColor || '',
    slugs : team[0]?.slugs || [],
    disabledSlugs : team[0]?.disableSlugs || [],
    image_url: team[0]?.image_url || '',
  });

  const handleAddGame = (slug) => {
    if (teamData.disabledSlugs.includes(slug)) {
      const updatedDisabledSlugs = teamData.disabledSlugs.filter((item) => item !== slug);
      (teamData.disabledSlugs = updatedDisabledSlugs);
      setTeamData({ ...teamData, slugs: [...teamData.slugs, slug] });
    }
  };

  const handleDisableGame = (slug) => {
    if (teamData.slugs.includes(slug)) {
      const updatedSlugs = teamData.slugs.filter((item) => item !== slug);
      (teamData.slugs = updatedSlugs);
      setTeamData({ ...teamData, disabledSlugs: [...teamData.disabledSlugs, slug] });
    }
  };


  const handleSubmit = async () => {
    const { teamName, backgroundColor, secondColor, eventColor, eventTextColor, slugs, disabledSlugs, image_url
     } = teamData;

    if (!teamName) {
      alert('Please enter a team name');
      return;
    }

    if (team[0]?.teamName) {
      await updateTeam(
        teamName.toLowerCase().replace(/\s+/g, '-'),
        backgroundColor || COLORS.white,
        secondColor || COLORS.gray,
        eventColor || COLORS.black,
        eventTextColor || COLORS.white,
        slugs || [],
        disabledSlugs || [],
        image_url || ''
      );

      await updateTeams((prevTeams) =>
        prevTeams.map((t) => (t.teamName === team.teamName ? teamData : t))
      );

      router.replace('/');
    } else {
      await addTeam(
        teamName.toLowerCase().replace(/\s+/g, '-'),
        backgroundColor || COLORS.white,
        secondColor || COLORS.gray,
        eventColor || COLORS.black,
        eventTextColor || COLORS.white
      );
      await updateTeams([...teams, teamData])
      router.replace('/');
    }
  };

  return (
    <View style={styles.container}>
      {!team[0]?.teamName && (
        <>
          <Text style={styles.headText}>Team Name</Text>
          <TextInput style={styles.input}
            placeholder={team[0]?.teamName ? team.teamName : "Team Name"}
            onChangeText={(text) => setTeamData({ ...teamData, teamName: text })}
          />
        </>
      )}

      {team[0]?.teamName && teamData.slugs.length > 0 && (
        <View>
          <Text style={styles.headText}>Selected games</Text>
          {teamData.slugs.map((slug, index) => (
            <View key={index}>
            <GamesBtn slug={slug} handlePress={handleDisableGame} activated={true} />
            </View>
          ))}
        </View>
      ) || team[0]?.teamName && (
          <>
            <Text style={styles.headText}>Selected games</Text>
            <View>
              <Text style={styles.headText}>0 games selected</Text>
            </View>
          </>
        )}

      {team[0]?.teamName && teamData.disabledSlugs.length > 0 && (
        <View>
          {teamData.disabledSlugs.map((slug, index) => (
             <View key={index}>
            <GamesBtn slug={slug} handlePress={handleAddGame} activated={false} />
            </View>
          ))}
          </View>
      ) || team[0]?.teamName && (
        <>
          <View style={styles.headText}>
            <Text style={styles.headText}>No Disabled Games</Text>
          </View>
        </>
      )}
      <ColorPickerForm team={team} teamData={teamData} setTeamData={setTeamData}
        onChangeText={(text) => setTeamData({ ...teamData, backgroundColor: text })}
        onColorChange={color => setTeamData({ ...teamData, backgroundColor: color })}
        color={team[0]?.backgroundColor} dataToChange={teamData.backgroundColor} text={"Background Color"}
      />

      <ColorPickerForm team={team} teamData={teamData} setTeamData={setTeamData}
        onChangeText={(text) => setTeamData({ ...teamData, secondColor: text })}
        onColorChange={color => setTeamData({ ...teamData, secondColor: color })}
        text={"Second Color"} color={team[0]?.secondColor} dataToChange={teamData.secondColor}
      />

      <ColorPickerForm team={team} teamData={teamData} setTeamData={setTeamData}
        onChangeText={(text) => setTeamData({ ...teamData, eventColor: text })}
        onColorChange={color => setTeamData({ ...teamData, eventColor: color })}
        text={"Event Color"} color={team[0]?.eventColor} dataToChange={teamData.eventColor}
      />

      <ColorPickerForm team={team} teamData={teamData} setTeamData={setTeamData}
        onChangeText={(text) => setTeamData({ ...teamData, eventTextColor: text })}
        onColorChange={color => setTeamData({ ...teamData, eventTextColor: color })}
        text={"Event Text Color"} color={team[0]?.eventTextColor} dataToChange={teamData.eventTextColor}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          {team[0]?.teamName ? (
            <Text style={styles.submitText}>Update</Text>
          ) : (
            <Text style={styles.submitText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TeamForm;