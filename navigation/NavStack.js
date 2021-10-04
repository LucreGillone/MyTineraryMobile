import React from "react"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import Cities from "../screens/Cities"
import City from "../screens/City"

const Stack = createNativeStackNavigator()

const CitiesNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Cities"
                component={Cities}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen 
                name="City"
                component={City}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
    
}

export default CitiesNavigator