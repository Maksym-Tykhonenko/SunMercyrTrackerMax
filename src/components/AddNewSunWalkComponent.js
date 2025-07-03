import React, { useEffect, useRef, useState } from 'react';
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
    Platform,
} from 'react-native';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';
import { ChevronLeftIcon } from 'react-native-heroicons/solid';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';

const AddNewSunWalkComponent = ({
    selectedSunWalk,
    setSelectedSunWalk,
    setAddNewSunWalkVisible,
    ownedSunWalks,
    setOwnedSunWalks
}) => {
    const dimensions = Dimensions.get('window');
    const styles = SunMercyrTrackerStyles(dimensions);

    const [selectedSunWalkPeriod, setSelectedSunWalkPeriod] = useState('Sunrise');
    const [selectedTimeOfTheWalking, setSelectedTimeOfTheWalking] = useState('Future');

    const [walkNameInput, setWalkNameInput] = useState('');
    const [walkDescriptionInput, setWalkDescriptionInput] = useState('');
    const [walkImage, setWalkImage] = useState(null);
    const [walkDateInput, setWalkDateInput] = useState('');
    const [walkDurationInput, setWalkDurationInput] = useState('');
    const prevDuration = useRef('');

    const validateSaveWalk = walkNameInput.replace(/\s/g, '').length > 0 &&
        walkDescriptionInput.replace(/\s/g, '').length > 0 &&
        walkDateInput.replace(/\s/g, '').length > 0 &&
        /^\d{1,2}h( \d{1,2}m)?$/.test(walkDurationInput) &&
        selectedSunWalkPeriod !== '' &&
        selectedTimeOfTheWalking !== '';

    const selectImage = () => {
        const options = {
            mediaType: 'photo',
            quality: 0.8,
        };
        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorMessage) {
                console.log('ImagePicker Error: ', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setWalkImage(response.assets[0].uri);
            }
        });
    };

    const handleDateInputChange = (text) => {
        const digits = text.replace(/\D/g, '');

        let day = digits.slice(0, 2);
        let month = digits.slice(2, 4);
        let year = digits.slice(4, 8);

        if (day.length === 2) {
            const numMonth = month.length === 2 ? parseInt(month, 10) : 0;
            let maxDay = 31;
            if (numMonth === 2) {
                maxDay = 29;
            } else if ([4, 6, 9, 11].includes(numMonth)) {
                maxDay = 30;
            }
            let numDay = parseInt(day, 10);
            if (numDay > maxDay) {
                numDay = maxDay;
            }
            day = numDay.toString().padStart(2, '0');
        }

        if (month.length === 2) {
            let numMonth = parseInt(month, 10);
            if (numMonth > 12) {
                numMonth = 12;
            }
            month = numMonth.toString().padStart(2, '0');
        }

        let formatted = day;
        if (month.length > 0) {
            formatted += (day.length === 2 ? '.' : '') + month;
        }
        if (year.length > 0) {
            formatted += (month.length === 2 ? '.' : '') + year;
        }

        setWalkDateInput(formatted);
    };

    const handleDurationInputChange = (text) => {
        if (text.length < prevDuration.current.length) {
            setWalkDurationInput(text);
            prevDuration.current = text;
            return;
        }
        const digits = text.replace(/\D/g, '');
        let formatted = '';
        if (digits.length === 0) {
            formatted = '';
        } else if (digits.length <= 2) {
            formatted = `${digits}h`;
        } else {
            const hours = digits.slice(0, digits.length - 2);
            const minutes = digits.slice(-2);
            formatted = `${parseInt(hours, 10)}h ${parseInt(minutes, 10)}m`;
        }
        setWalkDurationInput(formatted);
        prevDuration.current = formatted;
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
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
                        setAddNewSunWalkVisible(false);
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
                        <Text style={[styles.interStyles, {
                            fontSize: dimensions.width * 0.07,
                            textAlign: 'left',
                            alignSelf: 'flex-start',
                            marginLeft: dimensions.width * 0.05,
                        }]}>
                            Add New Walk
                        </Text>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: dimensions.width * 0.025,
                            marginVertical: dimensions.height * 0.01,
                            left: -dimensions.width * 0.014,
                        }}>
                            {['Sunrise', 'Sunset', 'Other'].map((walkTitle, index) => (
                                <TouchableOpacity
                                    key={walkTitle}
                                    style={{
                                        height: dimensions.height * 0.064,
                                        marginHorizontal: index === 1 ? dimensions.width * 0.013 : 0,
                                        borderRadius: dimensions.width * 0.04,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                    onPress={() => {
                                        if (selectedSunWalkPeriod === walkTitle) {
                                            setSelectedSunWalkPeriod('');
                                            return;
                                        }
                                        setSelectedSunWalkPeriod(walkTitle);
                                    }}
                                >
                                    <Text
                                        style={[styles.interStyles, {
                                            fontSize: dimensions.width * 0.048,
                                            paddingHorizontal: dimensions.width * 0.05,
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: selectedSunWalkPeriod === walkTitle ? '800' : '500',
                                            textDecorationLine: selectedSunWalkPeriod === walkTitle ? 'underline' : 'none',
                                            opacity: selectedSunWalkPeriod === walkTitle ? 1 : 0.5,
                                            marginTop: 0
                                        }]}
                                    >
                                        {walkTitle}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: dimensions.width * 0.025,
                        }}>
                            {['Past', 'Future', 'Archived'].map((walkTime) => (
                                <TouchableOpacity
                                    key={walkTime}
                                    style={{
                                        height: dimensions.height * 0.055,
                                        marginHorizontal: dimensions.width * 0.013,
                                        borderRadius: dimensions.width * 0.04,
                                        backgroundColor: '#063667',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: dimensions.width * 0.28,
                                    }}
                                    onPress={() => {
                                        setSelectedTimeOfTheWalking(walkTime);
                                    }}
                                >
                                    {selectedTimeOfTheWalking === walkTime && (
                                        <LinearGradient
                                            colors={['#FACB07', '#EC1313']}
                                            style={{
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: dimensions.width * 0.04,
                                            }}
                                            start={{ x: 0.46, y: 0 }}
                                            end={{ x: 0.5, y: 1 }}
                                        />
                                    )}
                                    <Text
                                        style={[styles.interStyles, {
                                            fontSize: dimensions.width * 0.044,
                                            textAlign: 'center',
                                            color: 'white',
                                            fontWeight: selectedTimeOfTheWalking === walkTime ? '700' : '400',
                                            marginTop: 0,
                                        }]}
                                    >
                                        {walkTime}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>

                        <View style={{
                            width: dimensions.width * 0.941,
                            alignSelf: 'center',
                            marginTop: dimensions.height * 0.02,
                        }}>
                            <Text style={styles.interStyles}>
                                Name of walk
                            </Text>

                            <View style={styles.sunInputView}>
                                <TextInput
                                    style={[styles.textInputStyle, {
                                        fontWeight: '400',
                                        maxWidth: dimensions.width * 0.8,
                                    }]}
                                    placeholder="Enter walk name"
                                    placeholderTextColor="white"
                                    value={walkNameInput}
                                    onChangeText={setWalkNameInput}
                                    maxLength={50}
                                />

                                <TouchableOpacity onPress={() => setWalkNameInput('')}>
                                    <Image
                                        source={require('../assets/icons/sunCleanInputIcon.png')}
                                        style={{
                                            width: dimensions.height * 0.025,
                                            height: dimensions.height * 0.025,
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.interStyles}>
                                Description
                            </Text>

                            <View style={styles.sunInputView}>
                                <TextInput
                                    style={[styles.textInputStyle, {
                                        fontWeight: '400',
                                        maxWidth: dimensions.width * 0.8,
                                    }]}
                                    placeholder="Enter description"
                                    placeholderTextColor="white"
                                    value={walkDescriptionInput}
                                    onChangeText={setWalkDescriptionInput}
                                    maxLength={100}
                                />

                                <TouchableOpacity onPress={() => setWalkDescriptionInput('')}>
                                    <Image
                                        source={require('../assets/icons/sunCleanInputIcon.png')}
                                        style={{
                                            width: dimensions.height * 0.025,
                                            height: dimensions.height * 0.025,
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.interStyles}>
                                How long was it be?
                            </Text>

                            <View style={styles.sunInputView}>
                                <TextInput
                                    style={[styles.textInputStyle, {
                                        fontWeight: '400',
                                        maxWidth: dimensions.width * 0.8,
                                    }]}
                                    placeholder="Enter duration (e.g., 1h 30m)"
                                    placeholderTextColor="white"
                                    value={walkDurationInput}
                                    onChangeText={handleDurationInputChange}
                                    maxLength={7}
                                />

                                <TouchableOpacity onPress={() => setWalkDurationInput('')}>
                                    <Image
                                        source={require('../assets/icons/sunCleanInputIcon.png')}
                                        style={{
                                            width: dimensions.height * 0.025,
                                            height: dimensions.height * 0.025,
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.interStyles}>
                                When will it be?
                            </Text>

                            <View style={styles.sunInputView}>
                                <TextInput
                                    style={[styles.textInputStyle, {
                                        fontWeight: '400',
                                        maxWidth: dimensions.width * 0.8,
                                    }]}
                                    placeholder="Enter date (10.10.1010)"
                                    placeholderTextColor="white"
                                    value={walkDateInput}
                                    onChangeText={handleDateInputChange}
                                    maxLength={10}
                                />

                                <TouchableOpacity onPress={() => setWalkDateInput('')}>
                                    <Image
                                        source={require('../assets/icons/sunCleanInputIcon.png')}
                                        style={{
                                            width: dimensions.height * 0.025,
                                            height: dimensions.height * 0.025,
                                        }}
                                        resizeMode="contain"
                                    />
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.interStyles}>
                                Photo
                            </Text>

                            <TouchableOpacity
                                style={{
                                    backgroundColor: '#063667',
                                    borderRadius: dimensions.width * 0.05,
                                    alignSelf: 'flex-start',
                                    marginTop: dimensions.height * 0.01,
                                    width: dimensions.width * 0.941,
                                    height: dimensions.height * 0.19,
                                }}
                                onPress={selectImage}
                            >
                                {walkImage ? (
                                    <Image
                                        source={{ uri: walkImage }}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: dimensions.width * 0.05,
                                        }}
                                        resizeMode='cover'
                                    />
                                ) : (
                                    <View style={{
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text style={[styles.interStyles, { color: 'white' }]}>
                                            Tap to select image
                                        </Text>
                                    </View>
                                )}

                                {walkImage && (
                                    <TouchableOpacity style={{
                                        position: 'absolute',
                                        top: -dimensions.height * 0.01,
                                        right: -dimensions.width * 0.01,
                                        zIndex: 10
                                    }} onPress={() => setWalkImage(null)}>
                                        <Image
                                            source={require('../assets/icons/closeSunIcon.png')}
                                            style={{
                                                width: dimensions.height * 0.03,
                                                height: dimensions.height * 0.03,
                                            }}
                                            resizeMode='contain'
                                        />
                                    </TouchableOpacity>
                                )}
                            </TouchableOpacity>
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
                        disabled={!validateSaveWalk}
                        style={{
                            width: dimensions.width * 0.941,
                            alignSelf: 'center',
                            height: dimensions.height * 0.061,
                            borderRadius: dimensions.width * 0.1,
                            overflow: 'hidden',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: dimensions.height * 0.02,
                            opacity: validateSaveWalk ? 1 : 0.5,
                        }}
                        onPress={async () => {
                            const newId = ownedSunWalks.length > 0
                                ? Math.max(...ownedSunWalks.map(item => item.id)) + 1
                                : 1;
                            const newWalk = {
                                id: newId,
                                sunWalkTitle: walkNameInput,
                                sunWalkDescription: walkDescriptionInput,
                                sunWalkDuration: walkDurationInput,
                                sunWalkDate: walkDateInput,
                                sunWalkPeriod: selectedSunWalkPeriod,
                                walkTime: selectedTimeOfTheWalking,
                                walkImage: walkImage,
                            };

                            const updatedWalks = [newWalk, ...ownedSunWalks];
                            setOwnedSunWalks(updatedWalks);
                            try {
                                await AsyncStorage.setItem('ownedSunWalks', JSON.stringify(updatedWalks));
                            } catch (error) {
                                console.error("Error saving ownedSunWalks: ", error);
                            }
                            setAddNewSunWalkVisible(false);
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
                            style={[
                                styles.interStyles,
                                {
                                    fontSize: dimensions.width * 0.045,
                                    textAlign: 'center',
                                    color: 'white',
                                    fontFamily: fonts.sfProTextBold,
                                    marginTop: 0,
                                },
                            ]}
                        >
                            Save
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

const SunMercyrTrackerStyles = (dimensions) => StyleSheet.create({
    sunInputView: {
        alignSelf: 'center',
        width: dimensions.width * 0.941,
        height: dimensions.height * 0.059,
        backgroundColor: '#063667',
        borderRadius: dimensions.width * 0.1,
        paddingHorizontal: dimensions.width * 0.03,
        marginTop: dimensions.height * 0.014,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    textInputStyle: {
        fontFamily: fonts.sfProTextRegular,
        flexShrink: 1,
        fontSize: dimensions.width * 0.04,
        fontWeight: '400',
        color: 'white',
        textAlign: 'left',
        width: '100%',
    },
    interStyles: {
        color: 'white',
        fontFamily: fonts.interRegular,
        textAlign: 'left',
        flexShrink: 1,
        fontSize: dimensions.width * 0.045,
        marginTop: dimensions.height * 0.02,
        fontWeight: '800',
    },
});

export default AddNewSunWalkComponent;