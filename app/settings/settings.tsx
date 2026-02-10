import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';

import { COLORS, icons, SIZES } from '../../constants';
import { Navbar, NotifSwitch, GradientBackground, PageHeader } from '../../components';

const Settings: React.FC = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Settings initialization
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <GradientBackground>
        <PageHeader title="Settings" />

        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.primary} />
          ) : (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                margin: 20,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Pressable
                style={{
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.gray2,
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 10,
                  width: '100%',
                }}
                onPress={() => {
                  router.push('/menu/menu');
                }}
              >
                <Text
                  style={{
                    color: COLORS.gray,
                    fontSize: SIZES.medium,
                    fontFamily: 'RogueHero2',
                  }}
                >
                  My Teams
                </Text>
                <Image
                  source={icons.chevronRight}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, tintColor: COLORS.gray }}
                />
              </Pressable>
              <Pressable
                style={{
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.gray2,
                  padding: 10,
                  borderRadius: 10,
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 15,
                  width: '100%',
                }}
                onPress={() => {
                  router.replace('/token/initToken');
                }}
              >
                <Text
                  style={{
                    color: COLORS.gray,
                    fontSize: SIZES.medium,
                    fontFamily: 'RogueHero2',
                  }}
                >
                  PandaScore Token
                </Text>
                <Image
                  source={icons.chevronRight}
                  resizeMode="contain"
                  style={{ width: 20, height: 20, tintColor: COLORS.gray }}
                />
              </Pressable>

              <Text
                style={{
                  color: COLORS.lightWhite,
                  fontSize: SIZES.medium,
                  fontFamily: 'RogueHero2',
                }}
              >
                Notifications 🔔
              </Text>

              <View
                style={{
                  flexDirection: 'column',
                  padding: 10,
                  borderRadius: 10,
                  justifyContent: 'space-between',
                  backgroundColor: COLORS.gray2,
                  alignItems: 'center',
                  width: '100%',
                  marginVertical: 5,
                  gap: 15,
                }}
              >
                <NotifSwitch time={0} />
                <NotifSwitch time={5} />
                <NotifSwitch time={10} />
                <NotifSwitch time={30} />
              </View>
            </View>
          )}
        </ScrollView>
        <Navbar />
      </GradientBackground>
    </View>
  );
};

export default Settings;
