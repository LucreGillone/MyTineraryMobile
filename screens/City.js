import React from "react"
import { View, Image, StyleSheet, Text, ScrollView } from "react-native"
import { connect } from "react-redux"
import itinerariesActions from "../redux/actions/itinerariesActions"
import { useEffect, useState } from "react"
import Itinerary from "../components/Itinerary"
import Footer from "../components/Footer"
import BouncingPreloader from 'react-native-bouncing-preloader'

const City = (props) => {

    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        const getItineraries = async () => {

            try{
                let response = await props.getItineraryByCity(props.route.params.selectedCity._id)
                if (response.success) {
                    setLoading(false)
                }
            } catch (err){
                showMessage({
                    message: "We're having technical difficulties!",
                    type: "danger",
                    position: "top",
                    statusBarHeight: "80", 
                    backgroundColor: "rebeccapurple"
                })
                console.log(err.message)
                return false
            }
        }
        getItineraries()
    },[props.route.params.selectedCity._id])


    const icons=["https://i.postimg.cc/xjM9pLTz/nube.png","https://i.postimg.cc/xjM9pLTz/nube.png",,]

    if(loading){
        return(
            <View style={styles.preloaderContainer}>
                <BouncingPreloader
                icons={icons}
                leftDistance={-300}
                rightDistance={-350}
                speed={1500}
                />
            </View>
        )
    }

    return (
        <ScrollView>  
            <Image source={{ uri: `https://gillone-mytinerary.herokuapp.com/${props.route.params.selectedCity.hero}`}} style={styles.heroCity} />
            <View style={styles.cityContainer}>
                <View style={styles.cityName}>
                    <Text style={styles.title}>{props.route.params.selectedCity.city.toUpperCase()}</Text>
                </View>
            </View>
            {props.cityItineraries.length === 0
            ? <View style={{marginTop: 90}}>
                <Text style={{color: '#333', fontSize: 30, textAlign: 'center', padding: 30, fontWeight: 'bold'}}> Sorry! There are no itineraries for this city yet. Check out later!</Text>
            </View> 
            : <View style={{marginTop: '10%', marginBottom: '15%'}}>
                {props.cityItineraries.map(itinerary => <Itinerary key={itinerary._id} itinerary={itinerary} navigation={props.navigation}/>)}
            </View> 
            }
            <Footer/>
        </ScrollView>
    )
}

const mapStateToProps = state => {
    return {
        cityItineraries: state.itineraries.cityItineraries
    }
}

const mapDispatchToProps = {
    getItineraryByCity: itinerariesActions.getItineraryByCity
}

export default connect(mapStateToProps, mapDispatchToProps)(City)

const styles = StyleSheet.create({
    heroCity: {
        width: "100%",
        height: 200,
    },

    title: {
        color: "white",
        borderWidth: 1,
        borderColor: "white",
        paddingVertical: 5,
        fontFamily: "Nunito_400Regular",
        fontSize: 22,
        textAlign: "center",
        width: 150

    },

    cityName: {
        backgroundColor: "black",
        paddingVertical: 10,
        paddingHorizontal: 5,
        marginTop: 15,
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        width: 175,
    },

    cityContainer: {
        justifyContent: "center",
        alignItems: "center"
    },

    preloaderContainer:{
        width:"100%",
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    }
})