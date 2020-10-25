import React from 'react'
import {View,Text, TouchableOpacity, StyleSheet} from 'react-native'

function ButtonText({children,style={},color,onPress}){
    return(
        <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
            <Text style={[styles.buttonText,{color:color}]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles=StyleSheet.create({
    button:{
        borderRadius:5,
        borderColor:'black',
        borderWidth:2,
        paddingLeft:40,
        paddingRight:40,
        paddingTop:5,
        paddingBottom:5,
        margin:5,
    },
    buttonText:{
        fontSize:35,
    }
})

export default ButtonText