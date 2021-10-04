import React from "react"
import { ScrollView, Text, ImageBackground, StyleSheet } from "react-native"
import Hero from "../components/Hero"
import Carousel from "../components/Carousel"
import Footer from "../components/Footer"

const Home = (props) => {
    return (
        <>
            <ScrollView style={styles.main}>
                <ImageBackground source={require('../assets/sky.jpg')} style={styles.skyImage}>
                    <Hero navigation={props.navigation}/>
                    <Text style={styles.title}>Popular MyTineraries</Text>
                    <Carousel style={styles.carousel}/>
                </ImageBackground>
                <Footer style={styles.footer}/>
            </ScrollView>
        </>
    )
}

export default Home

const styles = StyleSheet.create({
    main: {
        flex: 1
    },

    skyImage: {
        flex: 1,
        width: "100%",
        height: 1040,
        alignItems: "center"
    },

    title: {
        fontFamily: "Nunito_700Bold",
        paddingTop: 25, 
        marginBottom: 15,
        fontSize: 27
    },

    carousel: {
        marginBottom: 20,
    }

})