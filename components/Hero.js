import React from "react"
import {View, Text, Image, StyleSheet, Button} from "react-native"

const Hero = (props) => {
    return (
        <>
            <Image source={require('../assets/logo.png')} style={styles.logo}/>
            <Text style={styles.title}>MyTinerary</Text>
                <Text style={styles.slogan}>Find your perfect trip,
                designed by insiders who know and love their cities!</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Ready to take off?" color="black" onPress={()=>props.navigation.navigate("Our Cities") }/>
                </View>
        </>
    )
}
export default Hero

const styles = StyleSheet.create({

    title: {
        fontFamily: "Nunito_800ExtraBold",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: 45
    },

    slogan: {
        fontFamily: "Nunito_400Regular",
        fontSize: 20,
        paddingHorizontal: 15,
        textAlign: "center",
        marginTop: 20
    },

    buttonContainer: {
        width: "50%",
        marginTop: 20
    },

    button: {
    },

    logo: {
        width: 100,
        height: 100,
        marginTop: 25,
    }
})