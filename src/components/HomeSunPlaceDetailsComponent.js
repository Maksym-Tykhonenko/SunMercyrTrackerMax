import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';

const HomeSunPlaceDetailsComponent = ({
    setSunPlaceDetailsVisible,
    selectedSunMercPlace,
    setSelectedSunMercPlace
}) => {
    const dimensions = Dimensions.get('window');
    const styles = SunMercyrTrackerStyles(dimensions);

    return (
        <SafeAreaView style={{
            height: dimensions.height,
            backgroundColor: '#032950',
            alignSelf: 'center',
            width: dimensions.width,
            flex: 1,
        }}>
            <TouchableOpacity style={{
                alignSelf: 'flex-start',
                marginLeft: dimensions.width * 0.035,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: dimensions.height * 0.007,
            }} onPress={() => {
                setSunPlaceDetailsVisible(false);
                setSelectedSunMercPlace(null);
            }}>
                <ChevronLeftIcon size={dimensions.height * 0.034} color='#F5CB1C' />
                <Text style={{
                    color: '#F5CB1C',
                    fontSize: dimensions.height * 0.023,
                    fontWeight: '500'

                }}>Back</Text>
            </TouchableOpacity>

            <ScrollView style={{
            }} showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: dimensions.height * 0.14,
                    alignItems: 'center',
                    width: dimensions.width,
                }}>
                <Image
                    source={selectedSunMercPlace?.image}
                    style={{
                        width: dimensions.width * 0.941,
                        height: dimensions.height * 0.25,
                        marginTop: dimensions.height * 0.02,
                        alignSelf: 'center',
                        borderRadius: dimensions.width * 0.05,
                    }}
                />

                <View style={{
                    width: dimensions.width * 0.941,
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.02,
                }}>
                    <Text
                        style={[styles.interStyles, {
                            fontSize: dimensions.width * 0.068,
                            fontWeight: '800',
                            textAlign: 'left',
                            color: 'white',
                            alignSelf: 'flex-start',
                        }]}
                    >
                        {selectedSunMercPlace?.title}
                    </Text>

                    <Text
                        style={[styles.interStyles, {
                            fontSize: dimensions.width * 0.045,
                            fontWeight: '400',
                            textAlign: 'left',
                            color: 'white',
                            marginTop: dimensions.height * 0.025,
                            maxWidth: dimensions.width * 0.941,
                        }]}
                    >
                        {selectedSunMercPlace?.sunText}
                    </Text>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const SunMercyrTrackerStyles = (dimensions) => StyleSheet.create({
    interStyles: {
        color: 'white',
        fontFamily: fonts.interRegular,
        textAlign: 'left',
        flexShrink: 1,
    },
});

export default HomeSunPlaceDetailsComponent;