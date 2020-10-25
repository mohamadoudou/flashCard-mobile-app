import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { deleteDeckData } from '../actions/deck'
import {clearNotifications} from '../utils/helpers'
import ButtonText from './ButtonText'


function DeckDetail(props) {

    const toAddCard=()=>{
        if(deck){
            navigation.navigate('NewQuestion', { title: deck.title })
        }else {
            alert("This deck doesn't exist")
        }
    }

    const toQuiz = () => {

        clearNotifications()

        if(deck && deck.questions.length > 0){
            navigation.navigate('Quiz', { title: deck.title })
        }
        else{
            alert("You don't have any card in this deck please add card")
        }
    }
    
    const handleDelete=()=>{

        if(deck){
            props.dispatch(deleteDeckData(deck.title))
            navigation.goBack()
        }else{
            alert('choose a deck first')
        }
    }

    const { deck, navigation } = props

    return (
        <View style={styles.deckDetail}>
            <Text style={[styles.title,{textAlign:'center'}]}>{deck?deck.title:'choose a deck first'}</Text>
            <Text style={styles.subtitle}>{deck&&deck.questions?deck.questions.length:0} cards</Text>
            <View style={{ marginTop: 60 }}>
                <ButtonText
                    onPress={toAddCard}
                >
                    Add Card</ButtonText>
                <ButtonText
                    style={{ backgroundColor: 'black' }} color={'white'}
                    onPress={toQuiz}
                >
                    Start Quiz
                </ButtonText>
                <ButtonText
                    style={{ backgroundColor: 'white' }} color={'red'}
                    onPress={handleDelete}
                >
                    Delete Deck
                </ButtonText>
            </View>
        </View>
    )
}



const styles = StyleSheet.create({
    deckDetail: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    title: {
        fontSize: 70,
    },
    subtitle: {
        fontSize: 35,
        color: 'grey',
    },
})


function mapStateToProps({ decks }, { route }) {
    const deckId = route.params.title
    const deck = decks ? decks[deckId] : {}
    return {
        deck
    }
}

export default connect(mapStateToProps)(DeckDetail)