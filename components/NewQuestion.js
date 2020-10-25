import React, { useState } from 'react'
import {connect} from 'react-redux'
import {View,Text,TextInput,StyleSheet, ImagePropTypes} from 'react-native'
import {addNewCard} from '../actions/deck'
import ButtonText from './ButtonText'



function NewQuestion(props){
    const [question,onChangeQuestion]=useState('')
    const [answer,onChangeAnswer]=useState('')

    const handleSubmit=()=>{
        const {title}=props
        if(question==='' || answer===''){
            alert('There is an empty field')
        }
        else{props.dispatch(addNewCard(title,{question,answer}))
        //update DB
        //goto home
        onChangeQuestion('')
        onChangeAnswer('')
        props.navigation.goBack()
    }
    }

    return(
        <View style={styles.addCard}> 
             <TextInput
             style={styles.textInput}
             placeholder='Add question'
             onChangeText={(questionText)=>onChangeQuestion(questionText)}
             value={question}
             />
             <TextInput
             style={styles.textInput}
             placeholder='Add answer'
             onChangeText={(answerText)=>onChangeAnswer(answerText)}
             value={answer}
             />
            <ButtonText 
            style={{backgroundColor:'black'}} 
            color={'white'} 
            onPress={handleSubmit}
            >Submit</ButtonText>
        </View>
    )
}

const styles=StyleSheet.create({
    addCard:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
    },
    textInput:{
        borderRadius:4,
        borderColor:'black',
        borderWidth:2,
        padding:5,
        margin:5,
        marginBottom:40,
        width:300,
        height:45,
        fontSize:25,
    },
})


function mapStateToProps({decks},{route}){
    const title=route.params.title
    return{
        title,
        decks
    }
}

export default connect(mapStateToProps)(NewQuestion)