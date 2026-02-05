import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES, images } from '../../constants';
import HeaderBtn from '../header/button/HeaderBtn';

interface PageHeaderProps {
  title: string;
  rightIcon?: ImageSourcePropType;
  onRightPress?: () => void;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, rightIcon, onRightPress }) => {
    return (
        <Stack.Screen
            options={{
                title: "",
                headerStyle: {
                    backgroundColor: COLORS.headerBg,
                },
                headerShadowVisible: false,
                headerBackVisible: false,
                headerLeft: () => (
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Image
                            source={images.icon}
                            resizeMode="contain"
                            style={{
                                width: 40,
                                height: 30,
                                tintColor: COLORS.lightWhite,
                            }}
                        />
                        <Text
                            style={{
                                color: COLORS.lightWhite,
                                fontSize: SIZES.xLarge,
                                fontFamily: "RogueHero2",
                            }}
                        >
                            {title}
                        </Text>
                    </View>
                ),
                headerRight: () => (
                    rightIcon && onRightPress ? (
                        <HeaderBtn
                            iconUrl={rightIcon}
                            dimension="50%"
                            handlePress={onRightPress}
                        />
                    ) : null
                ),
                headerTitle: () => null,
            }}
        />
    );
};

export default PageHeader;
