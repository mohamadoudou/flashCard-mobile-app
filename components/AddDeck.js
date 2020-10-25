import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { addNewDeck } from '../actions/deck'
import ButtonText from './ButtonText'



function AddDeck(props) {
    const [deckTitle, onChangeText] = useState('')

    const handleSubmit = () => {
        if(deckTitle===''){
            alert('Add a title before submitting')
        }
        else{
        props.dispatch(addNewDeck(deckTitle))
        onChangeText('')
        props.navigation.navigate('DeckDetail', { title: deckTitle })
    }
}

    return (
        <View style={styles.addDeck}>
            <Text style={styles.addDeckText}>What is the title of your new deck?</Text>
            <TextInput
                style={styles.textInput}
                placeholder='Deck Title'
                onChangeText={(text) => onChangeText(text)}
                value={deckTitle}
            />
            <ButtonText
                style={{ backgroundColor: 'black' }}
                color={'white'}
                onPress={handleSubmit}
            >Create Deck</ButtonText>
        </View>
    )
}

const styles = StyleSheet.create({
    addDeck: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    addDeckText: {
        fontSize: 50,
        textAlign: 'center',
        margin: 10
    },
    textInput: {
        borderRadius: 4,
        borderColor: 'black',
        borderWidth: 2,
        padding: 5,
        margin: 5,
        marginBottom: 40,
        width: 300,
        height: 45,
        fontSize: 25,
    },
})


function mapStateToProps({ decks }) {
    return {
        decks
    }
}

export default connect(mapStateToProps)(AddDeck)