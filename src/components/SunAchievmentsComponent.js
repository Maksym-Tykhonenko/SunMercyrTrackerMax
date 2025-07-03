import React, { useEffect, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    Text,
    StyleSheet,
    ActivityIndicator,
    Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { fonts } from '../assets/fonts';

const SunAchievmentsComponent = ({ setSunAchievmentsVisible, setChoosedSunMercyrScrPage }) => {
    const dimensions = Dimensions.get('window');
    const styles = SunMercyrTrackerStyles(dimensions);

    const [ownedSunWalks, setOwnedSunWalks] = useState([]);
    const [ownedArticles, setOwnedArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const storedWalks = await AsyncStorage.getItem('ownedSunWalks');
                if (storedWalks !== null) {
                    setOwnedSunWalks(JSON.parse(storedWalks));
                }
                const storedArticles = await AsyncStorage.getItem('ownedArticles');
                if (storedArticles !== null) {
                    setOwnedArticles(JSON.parse(storedArticles));
                }
            } catch (error) {
                console.error('Error loading data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const targetFuture = 5;
    const targetSunrise = 10;
    const targetArticles = 3;

    const countFuture = ownedSunWalks.filter(walk => walk.walkTime === 'Future').length;
    const countSunrise = ownedSunWalks.filter(walk => walk.sunWalkPeriod === 'Sunrise').length;
    const countArticles = ownedArticles.length;

    const progressWidth = (count, target) => `${Math.min(count / target, 1) * 100}%`;
    const cardOpacity = (count, target) => (count >= target ? 0.5 : 1);

    if (loading) {
        return (
            <SafeAreaView style={{
                flex: 1,
                backgroundColor: '#032950',
                alignItems: 'center',
                justifyContent: 'center',
                width: dimensions.width,
            }}>
                <ActivityIndicator size="large" color="#FACB07" />
                <Text style={{ color: 'white', marginTop: 10 }}>Loading achievements...</Text>
            </SafeAreaView>
        );
    }

    return (
        <View style={{
            flex: 1,
        }}>
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
                    setSunAchievmentsVisible(false);
                }}>
                    <ChevronLeftIcon size={dimensions.height * 0.034} color='#F5CB1C' />
                    <Text style={{
                        color: '#F5CB1C',
                        fontSize: dimensions.height * 0.023,
                        fontWeight: '500'
                    }}>
                        Back
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.interStyles, {
                    fontSize: dimensions.width * 0.07,
                    alignSelf: 'flex-start',
                    color: 'white',
                    fontFamily: fonts.sfProTextHeavy,
                    paddingHorizontal: dimensions.width * 0.05,
                    marginTop: dimensions.height * 0.02,
                    fontWeight: '700',
                }]}>
                    Achivements
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingBottom: dimensions.height * 0.14,
                    }}>
                    <View style={[styles.generalViewCardStyles, { opacity: cardOpacity(countFuture, targetFuture) }]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}>
                            <Image
                                source={require('../assets/icons/calendarIcon.png')}
                                style={styles.cardIconStyles}
                                resizeMode='contain'
                            />

                            <Text style={styles.ubuntuStyles}>
                                Plan 5 walks in future
                            </Text>
                        </View>

                        <View style={styles.progressViewStyles}>
                            <Text style={styles.interStyles}>
                                <Text style={styles.interStyles}>
                                    {Math.min(countFuture, targetFuture)}/{targetFuture}
                                </Text>
                            </Text>

                            <View style={[styles.gradientViewStyles, {
                                width: progressWidth(countFuture, targetFuture),
                            }]}>
                                <LinearGradient
                                    colors={['#FACB07', '#EC1313']}
                                    style={styles.gradientStyles}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.generalViewCardStyles, {
                        opacity: cardOpacity(countSunrise, targetSunrise)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}>
                            <Image
                                source={require('../assets/icons/walkIcon.png')}
                                style={styles.cardIconStyles}
                                resizeMode='contain'
                            />

                            <Text style={styles.ubuntuStyles}>
                                Add 10 walks that took place during the sunrise
                            </Text>
                        </View>

                        <View style={styles.progressViewStyles}>
                            <Text style={styles.interStyles}>
                                {Math.min(countSunrise, targetSunrise)}/{targetSunrise}
                            </Text>

                            <View style={[styles.gradientViewStyles, {
                                width: progressWidth(countSunrise, targetSunrise),
                            }]}>
                                <LinearGradient
                                    colors={['#FACB07', '#EC1313']}
                                    style={styles.gradientStyles}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.generalViewCardStyles, {
                        opacity: cardOpacity(countArticles, targetArticles)
                    }]}>
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                        }}>
                            <Image
                                source={require('../assets/icons/sunBookIcon.png')}
                                style={styles.cardIconStyles}
                                resizeMode='contain'
                            />

                            <Text style={styles.ubuntuStyles}>
                                Read and add 3 articles to favourites
                            </Text>
                        </View>

                        <View style={styles.progressViewStyles}>
                            <Text style={styles.interStyles}>
                                {Math.min(countArticles, targetArticles)}/{targetArticles}
                            </Text>

                            <View style={[styles.gradientViewStyles, {
                                width: progressWidth(countArticles, targetArticles),
                            }]}>
                                <LinearGradient
                                    colors={['#FACB07', '#EC1313']}
                                    style={styles.gradientStyles}
                                    start={{ x: 0.5, y: 0 }}
                                    end={{ x: 0.5, y: 1 }}
                                />
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
            <View style={{
                position: 'absolute',
                bottom: 0,
                width: dimensions.width,
                alignSelf: 'center',
                height: Platform.OS === 'ios' 
                ? dimensions.height * 0.12
                : dimensions.height * 0.16,
                backgroundColor: '#063667',
                shadowColor: '#000',
                shadowOffset: { width: 0, height: -2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
            }}>
                <TouchableOpacity
                    style={{
                        width: dimensions.width * 0.941,
                        alignSelf: 'center',
                        height: dimensions.height * 0.061,
                        borderRadius: dimensions.width * 0.1,
                        overflow: 'hidden',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: dimensions.height * 0.02,
                    }}
                    onPress={() => {
                        setSunAchievmentsVisible(false);
                        setChoosedSunMercyrScrPage('Sun Mercyr Walks Planner')
                    }}
                >
                    <LinearGradient
                        colors={['#FACB07', '#EC1313']}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            borderRadius: dimensions.width * 0.04,
                        }}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                    />
                    <Text
                        style={[styles.interStyles, {
                            fontWeight: '700',
                            fontSize: dimensions.width * 0.05,
                        }]}
                    >
                        Go and do
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const SunMercyrTrackerStyles = (dimensions) => StyleSheet.create({
    interStyles: {
        color: 'white',
        textAlign: 'left',
        flexShrink: 1,
        fontSize: dimensions.width * 0.04,
        fontFamily: fonts.interMedium,
        fontWeight: '600',
        zIndex: 2,
    },
    gradientViewStyles: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        borderRadius: dimensions.width * 0.1,
        width: '0%',
        height: '100%',
    },
    ubuntuStyles: {
        fontFamily: fonts.ubuntuRegular,
        color: 'white',
        textAlign: 'left',
        flexShrink: 1,
        fontSize: dimensions.width * 0.04,
        fontWeight: '600',
        zIndex: 2,
    },
    cardIconStyles: {
        width: dimensions.width * 0.07,
        height: dimensions.width * 0.07,
        marginRight: dimensions.width * 0.03,
    },
    gradientStyles: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        borderRadius: dimensions.width * 0.04,
        zIndex: 1,
    },
    progressViewStyles: {
        width: '100%',
        height: dimensions.height * 0.032,
        backgroundColor: '#063666',
        borderRadius: dimensions.width * 0.1,
        marginTop: dimensions.height * 0.019,
        alignItems: 'center',
        justifyContent: 'center',
    },
    generalViewCardStyles: {
        width: dimensions.width * 0.941,
        alignSelf: 'center',
        backgroundColor: '#07427E',
        borderRadius: dimensions.width * 0.05,
        paddingHorizontal: dimensions.width * 0.048,
        paddingVertical: dimensions.height * 0.019,
        marginTop: dimensions.height * 0.019,
    }
});

export default SunAchievmentsComponent;