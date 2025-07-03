import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {loadUserData} from '../redux/userSlice';
import {UserContext} from '../context/UserContext';
import {View} from 'react-native-animatable';
import {fonts} from '../assets/fonts';

const SunMercyrTrackerLoadingFirst = () => {
  const dispatch = useDispatch();
  const {setUser} = useContext(UserContext);
  const navigation = useNavigation();

  const dimensions = Dimensions.get('window');

  useEffect(() => {
    dispatch(loadUserData());
  }, [dispatch]);

  useEffect(() => {
    const sunMercyrUserLoading = async () => {
      try {
        const deviceId = await DeviceInfo.getUniqueId();
        const storageKey = `currentUser_${deviceId}`;
        const sunMercyrTrackerStoredUser = await AsyncStorage.getItem(
          storageKey,
        );

        if (sunMercyrTrackerStoredUser) {
          setUser(JSON.parse(sunMercyrTrackerStoredUser));
        }
      } catch (error) {
        console.error('Loading sun', error);
      }
    };

    sunMercyrUserLoading();
  }, [setUser]);

  return (
    <View
      style={{
        alignSelf: 'center',
        height: dimensions.height,
        alignItems: 'center',
        width: dimensions.width,
        backgroundColor: '#032950',
      }}>
      <Text
        style={{
          fontFamily: fonts.sfProTextHeavy,
          fontSize: dimensions.width * 0.07,
          color: '#FFFFFF',
          marginTop: dimensions.height * 0.19,
          textAlign: 'center',
        }}>
        Sun Merkyr Tracker
      </Text>

      <Image
        source={require('../assets/images/smallSunImage.png')}
        style={{
          alignSelf: 'center',
          marginTop: dimensions.height * 0.05,
          width: dimensions.width * 0.14,
          height: dimensions.width * 0.14,
        }}
        resizeMode="contain"
      />

      <Image
        source={require('../assets/images/sunsImage.png')}
        style={{
          position: 'absolute',
          bottom: -dimensions.height * 0.4,
          width: dimensions.width,
          height: dimensions.height,
          alignSelf: 'center',
        }}
        resizeMode="cover"
      />
    </View>
  );
};

export default SunMercyrTrackerLoadingFirst;
