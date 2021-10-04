import React from "react"
import Carousel from "react-native-snap-carousel"
import { View, StyleSheet, ImageBackground, Text } from "react-native"

const CarouselCities = () => {

    const items = [
        {
            picture:require("../assets/agra.jpg"),
            city: "Agra"
        },
        {
            picture:require("../assets/cairo.jpg"),
            city: "Cairo"
        },
        {
            picture:require("../assets/bali.jpg"),
            city: "Bali"
        },
        {
            picture:require("../assets/cappadocia.jpg"),
            city: "Cappadocia"
        },   
        {
            picture:require("../assets/machu_picchu.jpg"),
            city: "Machu Picchu"
        },
        {
            picture:require("../assets/london.jpg"),
            city: "London"
        },
        {
            picture:require("../assets/moscow.jpg"),
            city: "Moscow"
        },
        {
            picture: require("../assets/new_york.jpg"),
            city: "New York"
        },
        {
            picture: require("../assets/paris.jpg"),
            city: "Paris"
        },
        {
            picture:require("../assets/sydney.jpg"),
            city: "Sydney"
        },
        {
            picture: require("../assets/rome.jpg"),
            city: "Rome"
        },
        {
            picture: require("../assets/vatnajokull2.jpg"),
            city: "Vatnajokull"
        }
      ]
        _renderItem = ({item}) => {
            return (
                <View>
                    <View style={styles.popularMytineraries}>
                        
                        <View key={item.city} style={styles.slide}>
                            <ImageBackground source={item.picture} style={styles.image}>
                                <Text style={styles.imageTitle}>{ item.city }</Text>
                            </ImageBackground>
                            
                        </View>
                    </View>
                </View>
            )
        }
     

    return (
            <Carousel
              data={items}
              renderItem={_renderItem}
              sliderWidth={380}
              itemWidth={380}
              layout={'default'} 
              loop={true}
              autoplay={true}
            />
    )
}

export default CarouselCities

const styles = StyleSheet.create({


    popularMytineraries: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
    },
    
    image: {
        width: 420,
        height: 550,
        justifyContent: "flex-end"
    },

    title: {
        marginBottom: 20,
        fontSize: 30
    },

    imageTitle: {
        fontFamily: "Nunito_400Regular",
        fontSize: 27,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.342)",
        color: "white",
    }
})