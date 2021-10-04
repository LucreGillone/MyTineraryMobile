import React from "react"
import { View, TouchableOpacity, ImageBackground, Text, StyleSheet } from "react-native"

const CityCard = (props) => {

    const { city } = props

    return (
        <View style={styles.card} key={city._id}>
           <TouchableOpacity onPress={() => props.navigation.navigate("City", { selectedCity: city })}>
                <ImageBackground
                    source={{ uri: `https://gillone-mytinerary.herokuapp.com/${city.picture}`}}
                    style={styles.photo}
                >
                <Text style={styles.title}>{city.city}</Text>
                </ImageBackground>
           </TouchableOpacity>
       </View>
    )
}

export default CityCard

const styles = StyleSheet.create({

    photo: {
        width: 380,
        height: 500,
        marginVertical: 15,
        marginLeft: 16,
    },

    title: {
        fontFamily: "Nunito_400Regular",
        fontSize: 30,
        textAlign: "center",
        backgroundColor: "rgba(0, 0, 0, 0.342)",
        color: "white",
    }
   
})