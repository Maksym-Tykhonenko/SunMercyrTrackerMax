import React, { useRef, useState } from 'react';
import {
    View,
    TouchableOpacity,
    Image,
    Dimensions,
    SafeAreaView,
    Text,
    StyleSheet,
    Animated,
    Platform,
} from 'react-native';
import { fonts } from '../assets/fonts';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import LinearGradient from 'react-native-linear-gradient';

const SunSystemComponent = ({ setSunSystemDetailsVisible }) => {
    const dimensions = Dimensions.get('window');
    const styles = SunMercyrTrackerStyles(dimensions);
    // Animated value для анімації висоти/радіусу
    const animation = useRef(new Animated.Value(0)).current;
    // Animated value для opacity режиму full screen при закритті
    const fullScreenOpacity = useRef(new Animated.Value(1)).current;
    // Стейт режиму full screen
    const [isFullScreen, setIsFullScreen] = useState(false);

    const openFullScreen = () => {
        // Анімуємо з 0 до 1 для відкриття full screen
        Animated.timing(animation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false, // оскільки анімуємо властивості layout
        }).start(() => {
            setIsFullScreen(true);
        });
    };

    const closeFullScreen = () => {
        // Спочатку анімація затемнення full screen view
        Animated.timing(fullScreenOpacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // Потім анімуємо повернення до normal режиму
            Animated.timing(animation, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false,
            }).start(() => {
                setIsFullScreen(false);
                // Скидаємо opacity для наступного відкриття
                fullScreenOpacity.setValue(1);
            });
        });
    };

    const toggleFullScreen = () => {
        if (!isFullScreen) {
            openFullScreen();
        } else {
            closeFullScreen();
        }
    };

    // Анімовані стилі для зображення
    const animatedImageHeight = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [dimensions.height * 0.7, dimensions.height],
    });
    const animatedBorderRadius = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [dimensions.width * 0.05, 0],
    });

    return (
        <View style={{ flex: 1, backgroundColor: '#032950' }}>
            {!isFullScreen ? (
                <SafeAreaView style={{
                    height: dimensions.height,
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
                        setSunSystemDetailsVisible(false);
                    }}>
                        <ChevronLeftIcon size={dimensions.height * 0.034} color='#F5CB1C' />
                        <Text style={{
                            color: '#F5CB1C',
                            fontSize: dimensions.height * 0.023,
                            fontWeight: '500'
                        }}>Back</Text>
                    </TouchableOpacity>

                    <Text style={[styles.interStyles, {
                        fontSize: dimensions.width * 0.07,
                        textAlign: 'left',
                        alignSelf: 'flex-start',
                        color: 'white',
                        fontFamily: fonts.sfProTextHeavy,
                        paddingHorizontal: dimensions.width * 0.05,
                        marginTop: dimensions.height * 0.02,
                    }]}>
                        Sun’s system
                    </Text>

                    <Animated.Image
                        source={require('../assets/images/sunSystemImage.png')}
                        style={{
                            width: dimensions.width * 0.941,
                            height: animatedImageHeight,
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.02,
                            borderRadius: animatedBorderRadius,
                        }}
                        resizeMode='stretch'
                    />

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
                            position: 'absolute',
                            bottom: Platform.OS === 'ios'
                                ? dimensions.height * 0.03
                                : dimensions.height * 0.08,
                            zIndex: 50,
                        }}
                        onPress={toggleFullScreen}
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
                        <Text style={[styles.interStyles, {
                            fontWeight: '700',
                            fontSize: dimensions.width * 0.05,
                            color: 'white',
                        }]}>
                            Full screen
                        </Text>
                    </TouchableOpacity>
                </SafeAreaView>
            ) : (
                <Animated.View style={{ flex: 1, opacity: fullScreenOpacity }}>
                    <TouchableOpacity onPress={toggleFullScreen} style={{
                        position: 'absolute',
                        top: dimensions.height * 0.091,
                        right: dimensions.width * 0.05,
                        zIndex: 50,
                    }}>
                        <Image
                            source={require('../assets/icons/closeSunSystemIcon.png')}
                            style={{
                                width: dimensions.width * 0.091,
                                height: dimensions.width * 0.091,
                            }}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <Animated.Image
                        source={require('../assets/images/sunSystemImage.png')}
                        style={{
                            width: dimensions.width,
                            height: dimensions.height,
                            alignSelf: 'center',
                            borderRadius: animatedBorderRadius,
                        }}
                        resizeMode='stretch'
                    />
                </Animated.View>
            )}
        </View>
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

export default SunSystemComponent;