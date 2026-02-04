import { View, Text, Image } from 'react-native';
import { Stack } from 'expo-router';

import { COLORS, SIZES, images } from '../../constants';
import HeaderBtn from '../header/button/HeaderBtn';

const PageHeader = ({ title, rightIcon, onRightPress }) => {
    return (
        <Stack.Screen
            options={{
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
