import React from "react"
import Home from "../screens/Home"
import Stack from "./NavStack"
import SignUp from "../screens/SignUp"
import LogIn from "../screens/Login"
import LogOut from "../screens/LogOut"
import { useEffect } from "react"
import { connect } from 'react-redux'
import usersActions from '../redux/actions/usersActions'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Text, View, StyleSheet } from "react-native"
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList  } from '@react-navigation/drawer'

const Drawer = createDrawerNavigator()

const Navigator = (props) => {
    const { userToken, firstName } = props

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
           props.logInAsyncStorage(token)
        }
    }

    const CustomDrawerContent = (props) => {
        return (
           <DrawerContentScrollView {...props}>
              <View style={styles.container} >
                 <Text style={styles.text}>  Hello {firstName && firstName}</Text>
              </View>
              <DrawerItemList {...props} />
           </DrawerContentScrollView>
           
        )
       }

    
    return (
        <Drawer.Navigator
            drawerContent={props => <CustomDrawerContent {...props} />} 
            screenOptions={{
                drawerActiveBackgroundColor:"pink",
                drawerContentStyle:{
                marginTop: 45,
               backgroundColor:"white"
            },
               drawerActiveTintColor:"grey",
               drawerLabelStyle:{
                    fontSize:20,
               }
            }}
        >
            <Drawer.Screen 
            name="Home"
            component={Home}
            />
            <Drawer.Screen 
            name="Our Cities"
            component={Stack}
            />
            {!userToken
            ? <><Drawer.Screen 
            name="Sign Up"
            component={SignUp}
            />
            <Drawer.Screen 
            name="Log In"
            component={LogIn}
            /></>
            : <Drawer.Screen name="Log Out" component={LogOut} />
            }
            

        </Drawer.Navigator>
    )
}

mapStateToProps = (state) => {
    return {
        userToken: state.users.token,
        firstName: state.users.firstName
    }
}

const mapDispatchToProps = {
    logInAsyncStorage: usersActions.logInAsyncStorage
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigator)

const styles = StyleSheet.create({

    text: {
        fontFamily: "Nunito_400Regular",
        fontSize: 20,
        textDecorationLine: "underline",
        marginBottom: 17
    }
})