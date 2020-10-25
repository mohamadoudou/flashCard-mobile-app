import { StatusBar } from 'expo-status-bar'
import React, { useEffect } from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import * as Notifications from 'expo-notifications'
import {Entypo,Ionicons} from '@expo/vector-icons'
import reducer from './reducers'
import Decks from './components/Decks'
import AddDeck from './components/AddDeck'
import DeckDetail from './components/DeckDetail'
import NewQuestion from './components/NewQuestion'
import Quiz from './components/Quiz'
import {askNotification} from './utils/helpers'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()
const handleNotification = () => {
  console.warn('ok! got your notif');
};

const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
       name='Decks' 
       component={Decks} 
       options={{
        tabBarLabel: 'Decks',
         tabBarIcon:()=>
           Platform.OS==='ios'?
           <Ionicons name="ios-list" size={24} color="black" />:
           <Ionicons name="md-list" size={24} color="black" />
    
       }}
      
      />
      <Tab.Screen 
      name='AddDeck' 
      component={AddDeck} 
      options={{
        tabBarIcon:()=><Entypo name="add-to-list" size={24} color="black" />
      }}
       />
    </Tab.Navigator>
  )
}

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
         name='Tabs'
         component={Tabs} 
         options={{
           title:'Home',
           headerTintColor: 'black',
           headerStyle: { backgroundColor: 'white' },
         }}
         />
        <Stack.Screen name='DeckDetail' component={DeckDetail} />
        <Stack.Screen name='NewQuestion' component={NewQuestion} />
        <Stack.Screen name='Quiz' component={Quiz} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const store = createStore(reducer, applyMiddleware(thunk))

export default function App() {
  useEffect(()=>{
    askNotification()
    const listener =Notifications.addNotificationReceivedListener(
      () => {
        (handleNotification)
    })
    return () => listener.remove();
  },[])
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Stacks />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
