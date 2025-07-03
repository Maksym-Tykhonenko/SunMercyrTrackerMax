import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { fonts } from '../assets/fonts';
import HomeSunPlaceDetailsComponent from '../components/HomeSunPlaceDetailsComponent';
import LinearGradient from 'react-native-linear-gradient';

import sunUVIndexArticlesData from '../components/sunUVIndexArticlesData';
import sunTotalEclipseArticlesData from '../components/sunTotalEclipseArticlesData';
import sunPartialEclipseArticlesData from '../components/sunPartialEclipseArticlesData';
import SunArticleComponent from '../components/SunArticleComponent';

const sunMercyrHorizontalScrollButtons = [
  {
    id: 1,
    articleCategoryName: 'UV-index',
  },
  {
    id: 2,
    articleCategoryName: 'Total Eclipse',
  },
  {
    id: 3,
    articleCategoryName: 'Partial Eclipse',
  },
]

const SunMercyrTrackerArticlesScP = ({ ownedArticles, setOwnedArticles}) => {
  const [dimensions, setDimensions] = useState(Dimensions.get('window'));
  const styles = SunMercyrTrackerStyles(dimensions);
  const [sunPlaceDetailsVisible, setSunPlaceDetailsVisible] = useState(false);
  const [selectedSunMercPlace, setSelectedSunMercPlace] = useState(null);
  const [selectedSunMercurArticleType, setSelectedSunMercurArticleType] = useState('');

  const allArticlesData = [...sunPartialEclipseArticlesData, ...sunUVIndexArticlesData, ...sunTotalEclipseArticlesData];

  const getArticlesDataByHorizontalScrollButton = (buttonName) => {
    switch (buttonName) {
      case 'UV-index':
        return sunUVIndexArticlesData;
      case 'Total Eclipse':
        return sunTotalEclipseArticlesData;
      case 'Partial Eclipse':
        return sunPartialEclipseArticlesData;
      default:
        return allArticlesData;
    }
  }

  const currentArticlesData = getArticlesDataByHorizontalScrollButton(selectedSunMercurArticleType);

  return (
    <SafeAreaView style={{
      flex: 1,
      width: dimensions.width,
      height: dimensions.height,
    }}>
      <Text
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
        Articles
      </Text>

      <ScrollView style={{

      }} horizontal={true} showsHorizontalScrollIndicator={false}>
        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingHorizontal: dimensions.width * 0.025,
          marginTop: dimensions.height * 0.01,
          marginBottom: dimensions.height * 0.012,
        }}>
          {sunMercyrHorizontalScrollButtons.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={{
                height: dimensions.height * 0.064,
                backgroundColor: '#063667',
                marginHorizontal: dimensions.width * 0.013,
                borderRadius: dimensions.width * 0.04,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                if (selectedSunMercurArticleType === category.articleCategoryName) {
                  setSelectedSunMercurArticleType('');
                  return;
                }
                setSelectedSunMercurArticleType(category.articleCategoryName);
              }}
            >
              {selectedSunMercurArticleType === category.articleCategoryName && (
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
                  paddingHorizontal: dimensions.width * 0.05,
                  textAlign: 'center',
                  color: 'white',
                  fontWeight: '500',
                }]}
              >
                {category.articleCategoryName}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <Text
        style={[styles.interStyles, {
          fontSize: dimensions.width * 0.05,
          paddingHorizontal: dimensions.width * 0.05,
          textAlign: 'left',
          alignSelf: 'flex-start',
          color: 'white',
          fontFamily: fonts.sfProTextBold,
          marginTop: dimensions.height * 0.025,
          marginBottom: dimensions.height * 0.01,
        }]}
      >
        {selectedSunMercurArticleType === '' ? 'All articles' : selectedSunMercurArticleType}
      </Text>

      <ScrollView style={{}} showsVerticalScrollIndicator={true} contentContainerStyle={{
        paddingBottom: dimensions.height * 0.3,
      }}>
        {currentArticlesData.map((article, index) => (
          <SunArticleComponent
            key={article.id}
            article={article}
            dimensions={dimensions}
            styles={styles}
            ownedArticles={ownedArticles}
            setOwnedArticles={setOwnedArticles}
            onPress={() => {
              setSelectedSunMercPlace(article);
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

export default SunMercyrTrackerArticlesScP;
