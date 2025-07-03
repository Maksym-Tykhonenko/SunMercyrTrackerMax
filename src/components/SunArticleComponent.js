import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from 'react';
import { TouchableOpacity, Image, View, Text } from 'react-native';

const SunArticleComponent = ({ article, dimensions, styles, onPress, ownedArticles, setOwnedArticles }) => {
    const isOwned = ownedArticles && ownedArticles.includes(article.id);

    const handleHeartPress = async () => {
        let newOwnedArticles;
        if (isOwned) {
            newOwnedArticles = ownedArticles.filter(itemId => itemId !== article.id);
        } else {
            newOwnedArticles = [...ownedArticles, article.id];
        }
        setOwnedArticles(newOwnedArticles);
        try {
            await AsyncStorage.setItem('ownedArticles', JSON.stringify(newOwnedArticles));
        } catch (error) {
            console.error('Error saving ownedArticles in AsyncStorage:', error);
        }
    };

    return (
        <TouchableOpacity
            key={article.id}
            style={{
                alignSelf: 'center',
                width: dimensions.width * 0.941,
                marginTop: dimensions.height * 0.02,
                alignItems: 'center',
            }}
            onPress={onPress}
        >
            <Image
                source={article.image}
                style={{
                    width: dimensions.width * 0.941,
                    height: dimensions.height * 0.21,
                    borderRadius: dimensions.width * 0.05,
                }}
                resizeMode="cover"
            />

            <View
                style={{
                    alignSelf: 'center',
                    width: dimensions.width * 0.941,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: dimensions.width * 0.03,
                }}
            >
                <Text
                    style={[
                        styles.interStyles,
                        {
                            fontSize: dimensions.width * 0.055,
                            fontWeight: '700',
                            textAlign: 'left',
                            color: 'white',
                            marginTop: dimensions.height * 0.01,
                            maxWidth: dimensions.width * 0.8,
                        },
                    ]}
                    ellipsizeMode="tail"
                    numberOfLines={1}
                >
                    {article.title}
                </Text>

                <TouchableOpacity onPress={handleHeartPress} style={{
                    zIndex: 10
                }}>
                    <Image
                        source={
                            isOwned
                                ? require('../assets/icons/savedGoldSunHeartIcon.png')
                                : require('../assets/icons/goldSunHeartIcon.png')
                        }
                        style={{
                            width: dimensions.width * 0.07,
                            height: dimensions.width * 0.07,
                        }}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            <Text
                style={[
                    styles.interStyles,
                    {
                        fontSize: dimensions.width * 0.045,
                        fontWeight: '400',
                        textAlign: 'left',
                        color: 'white',
                        marginTop: dimensions.height * 0.01,
                        paddingHorizontal: dimensions.width * 0.03,
                        maxWidth: dimensions.width * 0.941,
                    },
                ]}
                ellipsizeMode="tail"
                numberOfLines={1}
            >
                {article.sunText}
            </Text>
        </TouchableOpacity>
    );
};

export default SunArticleComponent;