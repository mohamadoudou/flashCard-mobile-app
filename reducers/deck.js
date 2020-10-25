import {RECEIVE_DECKS,ADD_DECK, ADD_CARD, DELETE_DECK} from '../actions/deck'



export function decks(state={},action){
    switch(action.type){
        case RECEIVE_DECKS:
            return{
                ...action.decks
            }
        case ADD_DECK:
            return{
                ...state,
                [action.newDeck.title]:action.newDeck
            }
        case ADD_CARD:
            return{
                ...state,
                [action.title]:{
                    ...state[action.title],
                    questions:state[action.title].questions.concat(action.card)
                }
            }
        case DELETE_DECK:
            return {
                ...action.newDecks,
            }
        default: return{
                state
        }
    }
}