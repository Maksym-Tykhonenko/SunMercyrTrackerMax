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
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts } from '../assets/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeSunPlaceDetailsComponent from '../components/HomeSunPlaceDetailsComponent';
import LinearGradient from 'react-native-linear-gradient';
import SunWalkDetailsComponent from '../components/SunWalkDetailsComponent';
import AddNewSunWalkComponent from '../components/AddNewSunWalkComponent';

const SunMercyrTrackerWalksPlannerScP = ({ ownedArticles, setOwnedArticles }) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = SunMercyrTrackerStyles(dimensions);
  const [sunWalkDetailsVisible, setSunWalkDetailsVisible] = useState(false);
  const [selectedSunWalkPeriod, setSelectedSunWalkPeriod] = useState('Sunrise');
  const [selectedTimeOfTheWalking, setSelectedTimeOfTheWalking] = useState('Past');
  const [ownedSunWalks, setOwnedSunWalks] = useState([]);
  const [selectedSunWalk, setSelectedSunWalk] = useState(null);
  const [addNewSunWalkVisible, setAddNewSunWalkVisible] = useState(false);

  const periodOrder = ['Sunrise', 'Sunset', 'Other'];
  const timeOrder = ['Past', 'Future', 'Archived'];

  useEffect(() => {
    const loadOwnedSunWalks = async () => {
        try {
            const storedWalks = await AsyncStorage.getItem('ownedSunWalks');
            if (storedWalks !== null) {
                setOwnedSunWalks(JSON.parse(storedWalks));
            }
        } catch (error) {
            console.error("Error loading ownedSunWalks:", error);
        }
    };
    loadOwnedSunWalks();
}, []);

  const sortedSunWalks = ownedSunWalks
    .filter(walk => {
      const periodMatch = selectedSunWalkPeriod ? walk.sunWalkPeriod === selectedSunWalkPeriod : true;
      const timeMatch = selectedTimeOfTheWalking ? walk.walkTime === selectedTimeOfTheWalking : true;
      return periodMatch && timeMatch;
    })
    .sort((a, b) => {
      const periodDiff = periodOrder.indexOf(a.sunWalkPeriod) - periodOrder.indexOf(b.sunWalkPeriod);
      if (periodDiff !== 0) return periodDiff;
      return timeOrder.indexOf(a.walkTime) - timeOrder.indexOf(b.walkTime);
    });

  return (
    <SafeAreaView style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
    }}>
      {/* <Text
        style={[styles.interStyles, {
          fontSize: dimensions.width * 0.07,
          paddingHorizontal: dimensions.width * 0.05,
          textAlign: 'left',
          alignSelf: 'flex-start',
          color: 'white',
          fontFamily: fonts.sfProTextHeavy,
          paddingBottom: dimensions.height * 0.02,
        }]}
      >
        Walks planner
      </Text> */}

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
        setAddNewSunWalkVisible(true);
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
          Plan new walk
        </Text>
      </TouchableOpacity>

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
              }]}
            >
              {walkTime}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {sortedSunWalks.length > 0 ? (
        <ScrollView style={{}} showsVerticalScrollIndicator={true} contentContainerStyle={{
          paddingBottom: dimensions.height * 0.3,
        }}>
          {sortedSunWalks.map((sunWalk, index) => (
            <TouchableOpacity key={sunWalk.id} style={{
              width: dimensions.width * 0.941,
              alignSelf: 'center',
              marginTop: dimensions.height * 0.02,
              backgroundColor: '#063667',
              borderRadius: dimensions.width * 0.05,
              paddingHorizontal: dimensions.width * 0.035,
              paddingVertical: dimensions.height * 0.02,
            }} onPress={() => {
              setSelectedSunWalk(sunWalk);
              setSunWalkDetailsVisible(true);
            }}>
              {sunWalk.walkImage && (
                <Image
                  source={{ uri: sunWalk.walkImage }}
                  style={{
                    width: '100%',
                    height: dimensions.height * 0.16,
                    borderRadius: dimensions.width * 0.03,
                    alignSelf: 'center',
                  }}
                  resizeMode="cover"
                />
              )}

              <View style={{
                alignSelf: 'center',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: sunWalk.walkImage ? dimensions.height * 0.014 : 0,
              }}>
                <Text
                  style={[styles.interStyles, {
                    fontSize: dimensions.width * 0.046,
                    fontWeight: '700',

                  }]}
                >
                  {sunWalk.sunWalkTitle}
                </Text>

                <Text
                  style={[styles.interStyles, {
                    fontSize: dimensions.width * 0.04,
                    fontWeight: '400',
                    marginTop: dimensions.height * 0.007,
                    opacity: 0.5
                  }]}
                >
                  {sunWalk.sunWalkDate}
                </Text>
              </View>


              <Text
                style={[styles.interStyles, {
                  fontSize: dimensions.width * 0.04,
                  fontWeight: '400',
                  marginTop: dimensions.height * 0.007,
                }]}
              >
                {sunWalk.sunWalkDescription}
              </Text>

              <View style={{
                alignSelf: 'center',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: dimensions.height * 0.008,
              }}>
                <View style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                }}>
                  <Text style={styles.timeTypeTextStyle}>
                    {sunWalk.sunWalkDuration}
                  </Text>

                  <Text style={[styles.timeTypeTextStyle, {
                    opacity: 0.5,
                    paddingHorizontal: dimensions.width * 0.01,

                  }]}>
                    •
                  </Text>

                  <Text style={styles.timeTypeTextStyle}>
                    {sunWalk.sunWalkPeriod}
                  </Text>
                </View>

                <TouchableOpacity>
                  <Text style={[styles.timeTypeTextStyle, {
                    fontWeight: '800',
                    fontSize: dimensions.width * 0.046,
                  }]}>
                    •••
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))
          }
        </ScrollView>
      ) : (
        <View>
          <Image
            source={require('../assets/images/noSunWalksImage.png')}
            style={{
              alignSelf: 'center',
              marginTop: dimensions.height * 0.1,
              width: dimensions.width * 0.16,
              height: dimensions.width * 0.16,
            }}
            resizeMode="contain"
          />
          <Text
            style={[styles.interStyles, {
              fontSize: dimensions.width * 0.044,
              textAlign: 'center',
              color: 'white',
              fontWeight: '400',
              marginTop: dimensions.height * 0.02,
            }]}
          >
            There are no any walks yet
          </Text>
        </View>
      )}

      <Modal
        animationType="fade"
        transparent={true}
        visible={sunWalkDetailsVisible}
        onRequestClose={() => {
          setSunWalkDetailsVisible(prev => !prev);
        }}
      >
        <View style={{
          width: dimensions.width,
          height: dimensions.height,
        }}>
          <SunWalkDetailsComponent setSunWalkDetailsVisible={setSunWalkDetailsVisible}
            selectedSunWalk={selectedSunWalk}
            setSelectedSunWalk={setSelectedSunWalk}
          />
        </View>
      </Modal>

      <Modal
        animationType="fade"
        transparent={true}
        visible={addNewSunWalkVisible}
        onRequestClose={() => {
          setAddNewSunWalkVisible(prev => !prev);
        }}
      >
        <View style={{
          width: dimensions.width,
          height: dimensions.height,
        }}>
          <AddNewSunWalkComponent setAddNewSunWalkVisible={setAddNewSunWalkVisible}
            ownedSunWalks={ownedSunWalks}
            setOwnedSunWalks={setOwnedSunWalks}
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

export default SunMercyrTrackerWalksPlannerScP;
