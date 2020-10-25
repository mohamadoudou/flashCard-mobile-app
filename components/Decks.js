import React,{useEffect} from 'react'
import {View,Text,StyleSheet,FlatList} from 'react-native'
import {connect} from 'react-redux'
import {receiveDecksData} from '../actions/deck'
import Deck from './Deck'
function Decks(props){

    useEffect(()=>{
        props.dispatch(receiveDecksData())
    
      },[])

    const {decks,deckIds}=props
    
    renderDeck=({item,index})=>{
        return(
            <View key={index}>
                <Deck deckId={item} navigation={props.navigation}/>
            </View>
        )
    }
   return(
    <FlatList
    data={deckIds}
    renderItem={({item,index})=>renderDeck({item,index})}
    keyExtractor={(index)=>index.toString()}
    />
   )
}


const styles=StyleSheet.create({
    decksContainer:{
        flex:1,
        backgroundColor:'white',
        marginTop:30,
    }
 
 })



function mapStateToProps({decks}){
    const deckIds=decks?Object.keys(decks):[]
    console.log('decks values in decks components',decks)
    return{
        deckIds,
        decks
    }
}

export default connect(mapStateToProps)(Decks)