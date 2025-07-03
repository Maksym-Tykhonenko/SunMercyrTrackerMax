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

const SunWalkDetailsComponent = ({
    setSunWalkDetailsVisible,
    selectedSunWalk,
    setSelectedSunWalk
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
                marginLeft: dimensions.width * 0.01,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingBottom: dimensions.height * 0.007,
            }} onPress={() => {
                setSunWalkDetailsVisible(false);
                setSelectedSunWalk(null);
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
                <Text
                    style={[styles.interStyles, {
                        fontSize: dimensions.width * 0.068,
                        fontWeight: '800',
                        textAlign: 'left',
                        color: 'white',
                        alignSelf: 'flex-start',
                        paddingHorizontal: dimensions.width * 0.03,
                    }]}
                >
                    {selectedSunWalk?.sunWalkTitle}
                </Text>

                {selectedSunWalk?.walkImage && (
                    <Image
                        source={{uri: selectedSunWalk?.walkImage}}
                        style={{
                            width: dimensions.width * 0.941,
                            height: dimensions.height * 0.23,
                            marginTop: dimensions.height * 0.02,
                            alignSelf: 'center',
                            borderRadius: dimensions.width * 0.05,
                        }}
                    />
                )}

                <View style={{
                    width: dimensions.width * 0.941,
                    alignSelf: 'center',
                    marginTop: dimensions.height * 0.02,
                }}>
                    <Text
                        style={[styles.interStyles, {
                            fontSize: dimensions.width * 0.055,
                            fontWeight: '700',
                            textAlign: 'left',
                            color: 'white',
                            alignSelf: 'flex-start',
                        }]}
                    >
                        Description
                    </Text>

                    <Text
                        style={[styles.interStyles, {
                            fontSize: dimensions.width * 0.045,
                            fontWeight: '400',
                            textAlign: 'left',
                            color: 'white',
                            marginTop: dimensions.height * 0.014,
                            maxWidth: dimensions.width * 0.941,
                        }]}
                    >
                        {selectedSunWalk?.sunWalkDescription}
                    </Text>

                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: dimensions.height * 0.02,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={[styles.interStyles, {
                                fontSize: dimensions.width * 0.045,
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                                alignSelf: 'flex-start',
                            }]}
                        >
                            Date
                        </Text>

                        <Text
                            style={[styles.interStyles, {
                                fontSize: dimensions.width * 0.043,
                                fontWeight: '400',
                                textAlign: 'right',
                                color: 'white',
                                maxWidth: dimensions.width * 0.941,
                            }]}
                        >
                            {selectedSunWalk?.sunWalkDate}
                        </Text>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: dimensions.height * 0.02,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={[styles.interStyles, {
                                fontSize: dimensions.width * 0.045,
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                                alignSelf: 'flex-start',
                            }]}
                        >
                            Duration
                        </Text>

                        <Text
                            style={[styles.interStyles, {
                                fontSize: dimensions.width * 0.043,
                                fontWeight: '400',
                                textAlign: 'right',
                                color: 'white',
                                maxWidth: dimensions.width * 0.941,
                            }]}
                        >
                            {selectedSunWalk?.sunWalkDuration}
                        </Text>
                    </View>

                    <View style={{
                        alignSelf: 'center',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: dimensions.height * 0.02,
                        alignItems: 'center',
                    }}>
                        <Text
                            style={[styles.interStyles, {
                                fontSize: dimensions.width * 0.045,
                                fontWeight: '700',
                                textAlign: 'left',
                                color: 'white',
                                alignSelf: 'flex-start',
                            }]}
                        >
                            Period
                        </Text>

                        <Text
                            style={[styles.interStyles, {
                                fontSize: dimensions.width * 0.043,
                                fontWeight: '400',
                                textAlign: 'right',
                                color: 'white',
                                maxWidth: dimensions.width * 0.941,
                            }]}
                        >
                            {selectedSunWalk?.sunWalkPeriod}
                        </Text>
                    </View>
                </View>
            </ScrollView>

        </SafeAreaView>
    );
};

const SunMercyrTrackerStyles = (dimensions) => StyleSheet.create({
});

export default SunWalkDetailsComponent;