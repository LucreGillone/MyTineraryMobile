import React from "react"
import { View, Text, StyleSheet, TextInput, TouchableWithoutFeedback, Keyboard, ScrollView, Image, FlatList, TouchableOpacity } from "react-native"
import { connect } from "react-redux"
import { useEffect, useState } from "react"
import citiesActions from "../redux/actions/citiesActions"
import { showMessage, hideMessage } from "react-native-flash-message"
import CityCard from "../components/CityCard"
import Footer from "../components/Footer"
import BouncingPreloader from 'react-native-bouncing-preloader'

const Cities = (props) => {

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function getAllCities() {
            try{
                await props.getAllCities()
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
            setLoading(false)
        }
        getAllCities()
        
       // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const icons=["https://i.postimg.cc/xjM9pLTz/nube.png","https://i.postimg.cc/DzSTrXMm/paper-plane.png"]

    if(loading){
        return(
            <View style={styles.preloaderContainer}>
                <BouncingPreloader
                icons={icons}
                leftDistance={-100}
                rightDistance={-150}
                speed={2000}
                />
            </View>
        )
    }

   const search = (e) => {
      props.filterCities(e.nativeEvent.text)
   }

   const showCities = props.infoCities.length > 0 
   ? props.infoCities.map((city) => {
       return <CityCard key={city._id} city={city} route={props.route} navigation={props.navigation}/>}
       )
   : <View style={styles.main}>
        <Text style={styles.noCity}>We couldn't find a match for your search. Try another city!</Text>
   </View>

    return (
        <ScrollView style={styles.main}>
            <TouchableWithoutFeedback onPress={() => {
                Keyboard.dismiss()
            }}>
                <View style={styles.container}>
                    <Image source={require("../assets/airport_board.jpg")} style={styles.board} />
                    <View style={styles.inputContainer}>
                        <TextInput
                        style={styles.input}
                        placeholder="Choose your destination"
                        onChange={search}
                        />
                    </View>
                   {showCities}
                </View>
            </TouchableWithoutFeedback>
            <Footer/>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        infoCities: state.cities.filteredCities,
        firstName: state.users.firstName
    }
}

const mapDispatchToProps = {
        getAllCities: citiesActions.getAllCities,
        filterCities: citiesActions.filterCities,
}

export default connect(mapStateToProps, mapDispatchToProps)(Cities) 

const styles = StyleSheet.create({

    board: {
        width: 410,
        height: 60,
    }, 
    
    input: {
        borderWidth: 1,
        borderColor: "black",
        margin: 10,
        width: "85%",
        height: 30,
        paddingHorizontal: 10,
        borderRadius: 5
    }, 
   
    inputContainer: {
        width: "100%",
        alignItems: "center"
    }, 

    photo: {
        width: 420,
        height: 500
    },

    noCity: {
        alignSelf: "center",
        fontSize: 20,
        textAlign: "center",
        marginTop: 20,
        paddingHorizontal: 10,
    },

    preloaderContainer:{
        width:"100%",
        height:"100%",
        alignItems:'center',
        justifyContent:'center'
    }, 
    main: {
        flex: 1,
        height: 600
    }
})