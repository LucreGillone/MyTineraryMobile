import React from 'react'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from "./redux/reducers/rootReducer"
import thunk from "redux-thunk"
import { NavigationContainer } from '@react-navigation/native'
import Navigator from './navigation/NavDrawer'
import FlashMessage from "react-native-flash-message"
import {useFonts, Nunito_200ExtraLight,Nunito_400Regular,Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold } from "@expo-google-fonts/nunito"
import AppLoading from "expo-app-loading"
import {LogBox} from "react-native"
LogBox.ignoreAllLogs(true)

const globalStore = createStore(rootReducer, applyMiddleware(thunk))

const App = () => {

  let [fontsLoaded] = useFonts({
    Nunito_200ExtraLight,
    Nunito_400Regular,
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold
  })

  if(!fontsLoaded){
    return <AppLoading/>
  }else{
    return (
      <Provider store={globalStore}>
        <NavigationContainer>
          <Navigator/>
          <FlashMessage position="bottom" floating={true} icon= "auto"/>
        </NavigationContainer>
      </Provider>
    )
  }
}

export default App
