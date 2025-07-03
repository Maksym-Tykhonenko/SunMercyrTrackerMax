import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from 'react-native';
import { fonts } from '../assets/fonts';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SunMercyrTrackerArticlesScP from './SunMercyrTrackerArticlesScP';

import sunHomePlaces from '../components/sunHomePlaces';
import HomeSunPlaceDetailsComponent from '../components/HomeSunPlaceDetailsComponent';
import SunArticleComponent from '../components/SunArticleComponent';
import SunMercyrTrackerWalksPlannerScP from './SunMercyrTrackerWalksPlannerScP';
import SunMercyrTrackerProfileScP from './SunMercyrTrackerProfileScP';

const sunMercyrTrackerButtons = [
  {
    id: 25,
    sunScPNameTitle: 'Sun Mercyr Home Page',
    sunScPWhiteIcon: require('../assets/icons/whiteSunIcons/sunIcon.png'),
    sunScPGoldenIcon: require('../assets/icons/goldenSunIcons/sunIcon.png'),
  },
  {
    id: 26,
    sunScPNameTitle: 'Sun Mercyr Articles',
    sunScPWhiteIcon: require('../assets/icons/whiteSunIcons/infoIcon.png'),
    sunScPGoldenIcon: require('../assets/icons/goldenSunIcons/infoIcon.png'),
  },
  {
    id: 28,
    sunScPNameTitle: 'Sun Mercyr Walks Planner',
    sunScPWhiteIcon: require('../assets/icons/whiteSunIcons/peopleIcon.png'),
    sunScPGoldenIcon: require('../assets/icons/goldenSunIcons/peopleIcon.png'),
  },
  {
    id: 29,
    sunScPNameTitle: 'Sun Mercyr Profile',
    sunScPWhiteIcon: require('../assets/icons/whiteSunIcons/profileIcon.png'),
    sunScPGoldenIcon: require('../assets/icons/goldenSunIcons/profileIcon.png'),
  },
]

const SunMercyrTrackerHomeScP = () => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const [choosedSunMercyrScrPage, setChoosedSunMercyrScrPage] = useState('Sun Mercyr Home Page');
  const styles = SunMercyrTrackerStyles(dimensions);
  const [sunPlaceDetailsVisible, setSunPlaceDetailsVisible] = useState(false);
  const [selectedSunMercPlace, setSelectedSunMercPlace] = useState(null);
  const [ownedArticles, setOwnedArticles] = useState([]);

  useEffect(() => {
    const loadOwnedSunMercyrArticles = async () => {
      try {
        const storedOwnedSunMercyrArticles = await AsyncStorage.getItem('ownedArticles');
        if (storedOwnedSunMercyrArticles !== null) {
          setOwnedArticles(JSON.parse(storedOwnedSunMercyrArticles));
        }
      } catch (error) {
        console.error('Error loading ownedArticles:', error);
      }
    };
    loadOwnedSunMercyrArticles();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss() }}>
      <View style={{
        height: dimensions.height,
        backgroundColor: '#032950',
        width: dimensions.width,
        flex: 1,
      }}>
        {Platform.OS === 'android' && (
          <View style={{ marginTop: dimensions.height * 0.021 }} />
        )}

        {choosedSunMercyrScrPage === 'Sun Mercyr Home Page' ? (
          <SafeAreaView style={{
          }}>
            <Text
              style={[styles.interStyles, {
                fontSize: dimensions.width * 0.07,
                fontWeight: '700',
                paddingHorizontal: dimensions.width * 0.05,
                textAlign: 'center',
                color: 'white',
              }]}
            >
              Sun information
            </Text>
            <View style={{ marginTop: dimensions.height * 0.01 }} />

            <ScrollView style={{}} showsVerticalScrollIndicator={true} contentContainerStyle={{
              paddingBottom: dimensions.height * 0.3,
            }}>
              {sunHomePlaces.map((sunHomePlaces, index) => (
                <SunArticleComponent
                  key={sunHomePlaces.id}
                  article={sunHomePlaces}
                  dimensions={dimensions}
                  styles={styles}
                  ownedArticles={ownedArticles}
                  setOwnedArticles={setOwnedArticles}
                  onPress={() => {
                    setSelectedSunMercPlace(sunHomePlaces);
                    setSunPlaceDetailsVisible(true);
                  }}
                />
              ))
              }
            </ScrollView>

            <Modal
              animationType="fade"
              transparent={true}
              visible={sunPlaceDetailsVisible}
              onRequestClose={() => {
                setSunPlaceDetailsVisible(prev => !prev);
              }}
            >
              <View style={{
                width: dimensions.width,
                height: dimensions.height,
              }}>
                <HomeSunPlaceDetailsComponent setSunPlaceDetailsVisible={setSunPlaceDetailsVisible}
                  selectedSunMercPlace={selectedSunMercPlace}
                  setSelectedSunMercPlace={setSelectedSunMercPlace}
                />
              </View>
            </Modal>
          </SafeAreaView>
        ) : choosedSunMercyrScrPage === 'Sun Mercyr Articles' ? (
          <SunMercyrTrackerArticlesScP setChoosedSunMercyrScrPage={setChoosedSunMercyrScrPage} ownedArticles={ownedArticles} setOwnedArticles={setOwnedArticles} />
        ) : choosedSunMercyrScrPage === 'Sun Mercyr Walks Planner' ? (
          <SunMercyrTrackerWalksPlannerScP setChoosedSunMercyrScrPage={setChoosedSunMercyrScrPage} />
        ) : choosedSunMercyrScrPage === 'Sun Mercyr Profile' ? (
          <SunMercyrTrackerProfileScP setChoosedSunMercyrScrPage={setChoosedSunMercyrScrPage} />
        ) : null}

        <View style={{
          alignItems: 'center',
          bottom: dimensions.height * 0.04,
          alignSelf: 'center',
          width: dimensions.width * 0.941,
          justifyContent: 'center',
          position: 'absolute',
        }}>
          <View style={{
            height: dimensions.height * 0.0788,
            width: dimensions.width * 0.941,
            paddingHorizontal: dimensions.width * 0.07,
            borderRadius: dimensions.width * 0.1,
            backgroundColor: '#07427E',

            alignItems: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            justifyContent: 'space-between',
          }}>
            {sunMercyrTrackerButtons.map((sunMercyrTrackerButton, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setChoosedSunMercyrScrPage(sunMercyrTrackerButton.sunScPNameTitle);
                }}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={choosedSunMercyrScrPage === sunMercyrTrackerButton.sunScPNameTitle
                    ? sunMercyrTrackerButton.sunScPGoldenIcon
                    : sunMercyrTrackerButton.sunScPWhiteIcon
                  }
                  style={{
                    height: dimensions.height * 0.037,
                    width: dimensions.height * 0.037,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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

export default SunMercyrTrackerHomeScP;
