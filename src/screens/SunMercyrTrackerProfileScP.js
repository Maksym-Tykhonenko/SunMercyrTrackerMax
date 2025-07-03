import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Share,
  Linking,
} from 'react-native';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { launchImageLibrary } from 'react-native-image-picker';
import SunSystemComponent from '../components/SunSystemComponent';
import SunAchievmentsComponent from '../components/SunAchievmentsComponent';

const SunMercyrTrackerProfileScP = ({ setChoosedSunMercyrScrPage }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = SunMercyrTrackerStyles(dimensions);
  const [sunSystemDetailsVisible, setSunSystemDetailsVisible] = useState(false);

  const [sunAchievmentsVisible, setSunAchievmentsVisible] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [profileName, setProfileName] = useState('Name Surname');
  const [profileImage, setProfileImage] = useState(null);

  const selectProfileImage = () => {
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
        setProfileImage(response.assets[0].uri);
      }
    });
  };

  const rowButtons = [
    {
      id: 1,
      title: 'Privacy Policy',
      onPress: () => {
        Linking.openURL('https://www.termsfeed.com/live/e4f5e07a-f2e6-41ff-b044-cc7e35b50c8e');
      },
      buttonImage: require('../assets/icons/privacyIcon.png'),
    },
    {
      id: 2,
      title: 'Achievements',
      onPress: () => {
        setSunAchievmentsVisible(true);
      },
      buttonImage: require('../assets/icons/achievmentsIcon.png'),
    }
  ];

  useEffect(() => {
    const loadProfileData = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem('profileData');
        if (storedProfile !== null) {
          const { profileName, profileImage } = JSON.parse(storedProfile);
          setProfileName(profileName);
          setProfileImage(profileImage);
        }
      } catch (error) {
        console.error("Error loading profile data:", error);
      }
    };
    loadProfileData();
  }, []);

  useEffect(() => {
    if (!isEditing) {
      const saveProfileData = async () => {
        try {
          const data = { profileName, profileImage };
          await AsyncStorage.setItem('profileData', JSON.stringify(data));
        } catch (error) {
          console.error("Error saving profile data:", error);
        }
      };
      saveProfileData();
    }
  }, [isEditing, profileName, profileImage]);

  return (
    <SafeAreaView style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
    }}>
      <View style={{
        flexDirection: 'row',
        width: dimensions.width * 0.9,
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingBottom: dimensions.height * 0.02,
      }}>
        <Text
          style={[styles.interStyles, {
            fontSize: dimensions.width * 0.07,
            textAlign: 'left',
            alignSelf: 'flex-start',
            color: 'white',
            fontFamily: fonts.sfProTextHeavy,
          }]}
        >
          Profile
        </Text>

        <TouchableOpacity onPress={() => setIsEditing(prev => !prev)}>
          <Text
            style={[styles.interStyles, {
              fontSize: dimensions.width * 0.05,
              textAlign: 'left',
              alignSelf: 'flex-start',
              color: '#F5CB1C',
              fontFamily: fonts.sfProTextRegular,
            }]}
          >
            {isEditing ? 'Done' : 'Edit'}
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
        width: dimensions.width * 0.9,
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingBottom: dimensions.height * 0.02,
        marginTop: dimensions.height * 0.02,
        alignItems: 'center',
      }}>
        <TouchableOpacity
          style={{
            width: dimensions.width * 0.23,
            height: dimensions.width * 0.23,
            borderRadius: dimensions.width * 0.5,
            backgroundColor: '#063667',
          }}
          onPress={isEditing ? selectProfileImage : null}
          disabled={!isEditing}
        >
          {profileImage ? (
            <Image
              source={{ uri: profileImage }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: dimensions.width * 0.5,
              }}
              resizeMode="cover"
            />
          ) : null}
        </TouchableOpacity>

        <View style={{ flex: 1, marginLeft: dimensions.width * 0.03 }}>
          {isEditing ? (
            <TextInput
              style={[styles.interStyles, {
                fontSize: dimensions.width * 0.055,
                color: 'white',
                fontFamily: fonts.sfProTextBold,
              }]}
              value={profileName}
              onChangeText={setProfileName}
              placeholder="Enter your name"
              placeholderTextColor="#aaa"
            />
          ) : (
            <Text
              style={[styles.interStyles, {
                fontSize: dimensions.width * 0.055,
                textAlign: 'left',
                color: 'white',
                fontFamily: fonts.sfProTextBold,
              }]}
            >
              {profileName}
            </Text>
          )}
        </View>
      </View>

      <TouchableOpacity style={{
        width: dimensions.width * 0.941,
        alignSelf: 'center',
        height: dimensions.height * 0.1,
        borderRadius: dimensions.width * 0.055,
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginTop: 0,
        backgroundColor: '#063667',
        overflow: 'hidden',
        paddingLeft: dimensions.width * 0.04,
      }} onPress={() => { setSunSystemDetailsVisible(true); }}>
        <Text
          style={[styles.interStyles, {
            fontSize: dimensions.width * 0.048,
            textAlign: 'center',
            color: 'white',
            fontWeight: '500',
          }]}
        >
          Sun’s system
        </Text>

        <Image
          source={require('../assets/images/sunImage.png')}
          style={{
            width: dimensions.height * 0.14,
            height: dimensions.height * 0.14,
            position: 'absolute',
            right: 0,
            bottom: -dimensions.height * 0.019,
          }}
          resizeMode='contain'
        />
      </TouchableOpacity>

      <View style={{
        flexDirection: 'row',
        width: dimensions.width * 0.9,
        alignSelf: 'center',
        justifyContent: 'space-between',
        paddingBottom: dimensions.height * 0.02,
        marginTop: dimensions.height * 0.02,
        alignItems: 'center',
      }}>
        {rowButtons.map((button) => (
          <TouchableOpacity key={button.id} style={{
            width: dimensions.width * 0.43,
            height: dimensions.width * 0.43,
            borderRadius: dimensions.width * 0.05,
            backgroundColor: '#063667',
          }} onPress={button.onPress}>
            <Text
              style={[styles.interStyles, {
                fontSize: dimensions.width * 0.048,
                textAlign: 'center',
                color: 'white',
                fontWeight: '600',
                marginTop: dimensions.width * 0.04,
              }]}
            >
              {button.title}
            </Text>

            <Image
              source={button.buttonImage}
              style={{
                width: dimensions.width * 0.25,
                height: dimensions.width * 0.25,
                position: 'absolute',
                alignSelf: 'center',
                bottom: 0,
              }}
              resizeMode='contain'
            />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={{
        width: dimensions.width * 0.941,
        alignSelf: 'center',
        height: dimensions.height * 0.061,
        borderRadius: dimensions.width * 0.1,
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: dimensions.height * 0.02,
      }} onPress={() => {
        Share.share({
          message: 'In the Sun Mercyr Tracker you can explore sun system 🌞',
        })
      }}>
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
            fontSize: dimensions.width * 0.045,
            textAlign: 'center',
            color: 'white',
            fontFamily: fonts.sfProTextBold,
          }]}
        >
          Share with friends
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={sunSystemDetailsVisible}
        onRequestClose={() => {
          setSunSystemDetailsVisible(prev => !prev);
        }}
      >
        <View style={{
          width: dimensions.width,
          height: dimensions.height,
        }}>
          <SunSystemComponent setSunSystemDetailsVisible={setSunSystemDetailsVisible} />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={sunAchievmentsVisible}
        onRequestClose={() => {
          setSunAchievmentsVisible(prev => !prev);
        }}
      >
        <View style={{
          width: dimensions.width,
          height: dimensions.height,
        }}>
          <SunAchievmentsComponent setSunAchievmentsVisible={setSunAchievmentsVisible}
            setChoosedSunMercyrScrPage={setChoosedSunMercyrScrPage}
          />
        </View>
      </Modal>
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
  timeTypeTextStyle: {
    color: 'white',
    fontFamily: fonts.interRegular,
    textAlign: 'left',
    flexShrink: 1,
    fontSize: dimensions.width * 0.037,
    fontWeight: '400',
  },
});

export default SunMercyrTrackerProfileScP;
