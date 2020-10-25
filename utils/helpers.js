import { AsyncStorage ,Platform} from 'react-native'
import  * as Permissions from 'expo-permissions'
import * as Notifications from 'expo-notifications'
import Constants from 'expo-constants'
import { NOTIFICATIONS } from 'expo-permissions'
const MOBILEFLASHCARD='mobileFlashCard:key'
const NOTIFICATIONS_KEY='mobileFalshCard:notifications'

let decks = {
    React: {
        title: 'React',
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    },
    JavaScript: {
        title: 'JavaScript',
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }
}

_storeData = async () => {
    try{await AsyncStorage.setItem(
        MOBILEFLASHCARD,
        JSON.stringify(decks)
    )
    }catch(e){
        alert('Failed to save your data to the storage')
    }
}

export const _getData=async()=>{
    let decks
    try {
       decks= await AsyncStorage.getItem(MOBILEFLASHCARD)
    } catch (e) {
        alert('Failed to get data from storage')
    }

    if(decks==null){
        _storeData()
        
        try {
            decks= await AsyncStorage.getItem(MOBILEFLASHCARD)
         } catch (e) {
             alert('Failed to get data from storage')
         }
     
    }
    return JSON.parse(decks)
}


export function getDeck(id) {
    return decks[id]
}

const _saveDeckTitle=async(title)=>{
    try {
        await AsyncStorage.mergeItem(MOBILEFLASHCARD,JSON.stringify({
            [title]: {
                title: title,
                questions: []
            }
        }))
    } catch (e) {
        alert('Failed to save Deck title from storage')
    }
}
export function saveDeckTitle(title) {
    _saveDeckTitle(title)
    //AsyncStorage.removeItem(MOBILEFLASHCARD)
    return {
        title: title,
        questions: []
    }

}

export const deleteDeckDataAsync=async(title)=>{

   try {
       let decks=await AsyncStorage.getItem(MOBILEFLASHCARD)
       decks=JSON.parse(decks)
       delete decks[title]
       await AsyncStorage.setItem(MOBILEFLASHCARD,JSON.stringify(decks))
       
   } catch (error) {
       alert('an error occur please try again')
   }
   return decks
}

const _addCardToDeck=async (title,card)=>{
    try {
       
        let decks= await AsyncStorage.getItem(MOBILEFLASHCARD)
        decks=JSON.parse(decks)
        decks={
            ...decks,
            [title]:{
                ...decks[title],
                questions:decks[title].questions.concat(card)
            }
        }
        await AsyncStorage.setItem(MOBILEFLASHCARD,JSON.stringify(decks))
    } catch (e) {
        console.log('Failed to save card to deck')
    }
}

export function addCardToDeck(title, card) {
    _addCardToDeck(title,card)
    return {
        title,
        card
    }
}




export const setNotifications=()=>{

    const trigger =new Date()
    trigger.setDate(trigger.getDate()+1)
    trigger.setHours(6)
    trigger.setMinutes(30)

Notifications.scheduleNotificationAsync({  
        content: {
            title: "FashCard reminder 📬",
            body: "Don't forget to do your Quiz today",
            data: { data: 'goes here' },
        },
         trigger
        // trigger:{
        //     seconds:30,
        //     repeats:false,
        // },    
    })
}

export const clearNotifications=async ()=>{
    await AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then( Notifications.cancelAllScheduledNotificationsAsync())
    askNotification()
    await AsyncStorage.getItem(NOTIFICATIONS_KEY)
}

 export const askNotification=async ()=>{
    const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS)
    if(status==='granted'){
        const notificationAdded =await AsyncStorage.getItem(NOTIFICATIONS_KEY)
       
        if(notificationAdded===null){
        Notifications.cancelAllScheduledNotificationsAsync()
        setNotifications()
        await AsyncStorage.setItem(NOTIFICATIONS_KEY,JSON.stringify(true))
        const resetnot =await AsyncStorage.getItem(NOTIFICATIONS_KEY)
        }
    }else{console.log ('Notification permission denied')}
}