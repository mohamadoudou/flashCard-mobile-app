import React, { useState } from 'react'
import { connect } from 'react-redux'
import { View, Text, Button, StyleSheet } from 'react-native'
import { ProgressChart } from 'react-native-chart-kit'
import ButtonText from './ButtonText'



function Quiz({ deck, questions, navigation }) {
    const [questionNumber, setNumber] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [showAnswer, setShowAnswer] = useState(false)
    const [correctAnswer, setCorrectAnswer] = useState(0)
    const handleCorrect = () => {
        if (questions.length - 1 > questionNumber) {
            setNumber(questionNumber + 1)
            setCorrectAnswer(correctAnswer + 1)
        }
        else {
            setCorrectAnswer(correctAnswer + 1)
            setShowResult(true)
        }
    }
    const handleIncorrect = () => {
        if (questions.length - 1 > questionNumber) {
            setNumber(questionNumber + 1)
        }
        else {
            setShowResult(true)
        }
    }

    const toQuiz = () => {
        setNumber(0)
        setCorrectAnswer(0)
        setShowResult(false)
        setShowAnswer(false)
        navigation.navigate('Quiz', { title: deck.title })
    }

    if (!showResult) {
        return (
            <View style={{ flex: 1 }}>
                <Text style={styles.count}>{`${questionNumber + 1}/${questions ? questions.length : 0}`}</Text>
                <View style={styles.quizContainer}>
                    {!showAnswer ? <Text
                        style={styles.quizText}
                    >
                        {questions[questionNumber] ? questions[questionNumber].question : null}
                    </Text> : <Text
                        style={styles.quizText}
                    >
                            {questions[questionNumber] ? questions[questionNumber].answer : null}
                        </Text>
                    }
                    <Button
                        title={!showAnswer ? 'Show answer' : 'Show question'}
                        onPress={() => setShowAnswer(!showAnswer)}
                    />
                    <View>
                        <ButtonText onPress={handleCorrect}>Correct</ButtonText>
                        <ButtonText onPress={handleIncorrect}>Incorrect</ButtonText>
                    </View>
                </View>
            </View>
        )
    }
    else {
        const data = {
            labels: ["correct answer"], // optional
            data: [correctAnswer/questions.length]
          }
          const chartConfig = {
            backgroundGradientFrom: "white",
            //backgroundGradientFromOpacity: 0,
            backgroundGradientTo: "white",
            //backgroundGradientToOpacity: 0.5,
            color: (opacity = 1) => `rgba(30,130 ,76 , ${opacity})`,
            strokeWidth: 1, // optional, default 3
            barPercentage: 0.7,
            useShadowColorFromDataset: false // optional
          };
        return (
            <View style={styles.quizContainer}>
                <ProgressChart
                data={data}
                width={400}
                height={200}
                strokeWidth={12}
                radius={65}
                chartConfig={chartConfig}
                hideLegend={true}
                />
                <Text style={{fontSize:20}}>result {(correctAnswer / questions.length) * 100}% correct </Text>
                <View>
                    <ButtonText onPress={toQuiz}>Restart Quiz</ButtonText>
                    <ButtonText onPress={() => { navigation.goBack() }}>Back to Deck</ButtonText>
                </View>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    quizContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    quizText: {
        textAlign: 'center',
        fontSize: 40,
    },
    count: {
        marginTop: 8,
        marginLeft: 8,
        fontSize: 25,
    },
})

function mapStateToProps({ decks }, { route }) {
    const deckId = route.params.title
    const deck = decks[deckId]
    const questions = deck ? deck.questions : []
    return {
        deck,
        questions
    }
}


export default connect(mapStateToProps)(Quiz)