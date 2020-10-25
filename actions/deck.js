import { addCardToDeck, deleteDeckDataAsync,saveDeckTitle,_getData } from "../utils/helpers"
export const RECEIVE_DECKS='RECEIVE_DECKS'
export const ADD_DECK='ADD_DECK'
export const ADD_CARD='ADD_CARD'
export const DELETE_DECK='DELETE_DECK'

function receiveDecks(decks){
    return{
        type:RECEIVE_DECKS,
        decks
    }
}

function addDeck(newDeck){
    return{
        type:ADD_DECK,
        newDeck
    }
}

function deleteDeck(newDecks){
    return{
        type:DELETE_DECK,
        newDecks,
    }
}

function addCard(title,card){
    return{
        type:ADD_CARD,
        title,
        card
    }
}

export function receiveDecksData(){
    return (dispatch)=>{  
        _getData()
        .then((decks)=>{ dispatch(receiveDecks(decks))} )
           
  
    }
}

export function addNewDeck(title){
    return (dispatch)=>{  
        setTimeout(() => {
            const newDeck= saveDeckTitle(title)
            dispatch(addDeck(newDeck))
          }, 500); 
  
    }
}

export function deleteDeckData(title){
    return (dispatch)=>{
        deleteDeckDataAsync(title)
        .then((newDecks)=>{ dispatch(deleteDeck(newDecks))})
    }
}

export function addNewCard(title,card){
    return (dispatch)=>{
        setTimeout(()=>{
            addCardToDeck(title,card)
            dispatch(addCard(title,card))
        },500)
    }
}