import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'



function Deck(props) {
    const { deck, navigation } = props
    return (
        <TouchableOpacity
            style={[styles.deckContainer, styles.boxShadow]}
            onPress={() => navigation.navigate('DeckDetail', { title: deck.title })}
        >
            <Text style={[styles.text, { fontSize: 30, color: 'black' }]}>{deck?deck.title:null}</Text>
            <Text style={[styles.text, { fontSize: 20, color: 'grey', marginTop: 10 }]}>{deck&&deck.questions ? deck.questions.length : 0} cards</Text>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
    deckContainer: {
        backgroundColor: 'white',
        height: 150,
    },
    boxShadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 5,
        margin: 3
    },
    text: {
        textAlign: 'center',
        marginTop: 20,
    }
})



function mapStateToProps({ decks }, { deckId }) {
    const deck = decks ? decks[deckId] : {}
    return {
        deck
    }
}



export default connect(mapStateToProps)(Deck)