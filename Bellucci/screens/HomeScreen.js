import React, { useState, useRef } from 'react';
import {View,Text,StyleSheet,Image,TextInput,TouchableOpacity,Dimensions,StatusBar,Animated,} from 'react-native';
import Swiper from 'react-native-deck-swiper';

const dummyData = [
  {
    id: 1,
    name: 'Denim Jacket',
    brand: 'Zara',
    image: 'https://images.unsplash.com/photo-1543076447-215ad9ba6923',
    price: '$89.99'
  },
  {
    id: 2,
    name: 'Penny Mini Dress',
    brand: 'Vestique',
    image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e4',
    price: '$52.00'
  },
  {
    id: 3,
    name: 'Leather Boots',
    brand: 'Pull & Bear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772',
    price: '$120.00'
  },
];

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.9;
const CARD_HEIGHT = screenHeight * 0.65; 

export default function HomeScreen() {
  const [cards, setCards] = useState(dummyData);
  const [searchText, setSearchText] = useState('');
  const swiperRef = useRef(null);

  const handleSwiped = (cardIndex) => {
    console.log('Swiped card at index:', cardIndex);
  };

  const handleSwipeLeft = (cardIndex) => {
    console.log('Disliked:', cards[cardIndex]);
  };

  const handleSwipeRight = (cardIndex) => {
    console.log('Liked:', cards[cardIndex]);
  };

  const renderCard = (item) => {
    return (
      <Animated.View style={[styles.card, styles.cardShadow]}>
        <Image 
          source={{ uri: item.image }} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.itemInfo}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemBrand}>{item.brand}</Text>
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header with search */}
      <View style={styles.header}>
        <Text style={styles.welcome}>Welcome to Bellucci</Text>
        
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Search clothes..."
            style={styles.searchInput}
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main swiper area - */}
      <View style={styles.swiperWrapper}>
        <Swiper
          ref={swiperRef}
          cards={cards}
          renderCard={renderCard}
          onSwiped={handleSwiped}
          onSwipedLeft={handleSwipeLeft}
          onSwipedRight={handleSwipeRight}
          stackSize={3}
          backgroundColor="transparent"
          cardIndex={0}
          infinite
          animateCardOpacity
          swipeAnimationDuration={400}
          stackSeparation={-5}
          disableTopSwipe
          disableBottomSwipe
          overlayLabels={{
            left: {
              title: 'NOPE',
              style: {
                label: {
                  backgroundColor: 'red',
                  borderColor: 'red',
                  color: 'white',
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: -30,
                }
              }
            },
            right: {
              title: 'LIKE',
              style: {
                label: {
                  backgroundColor: 'green',
                  borderColor: 'green',
                  color: 'white',
                  borderWidth: 1,
                  fontSize: 24,
                },
                wrapper: {
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: 30,
                  marginLeft: 30,
                }
              }
            }
          }}
          containerStyle={styles.swiperContainer}
          cardStyle={styles.cardStyle}
          marginTop={0}
          marginBottom={0}
          cardVerticalMargin={0}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: StatusBar.currentHeight || 40, // Dynamic status bar height
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  swiperWrapper: {
    flex: 1,
    marginTop: -10, 
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 10,
    marginRight: 10,
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  swiperContainer: {
    flex: 1,
    marginTop: 0,
    paddingTop: 0,
    justifyContent: 'flex-start', 
  },
  cardStyle: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginTop: 0,
    marginBottom: 0,
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 15,
    backgroundColor: '#fff',
    overflow: 'hidden',
  },
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: '100%',
    height: '80%',
  },
  itemInfo: {
    padding: 15,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  itemBrand: {
    fontSize: 14,
    color: 'gray',
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
  },
});
