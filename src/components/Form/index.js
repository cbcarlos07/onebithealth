import React, {useState} from 'react'
import {
    View, 
    Text, 
    TextInput, 
    Vibration, 
    TouchableOpacity,
    Pressable,
    Keyboard
} from 'react-native'
import ResultIMC from './ResultIMC'
import styles from './style'

export default () => {

    const [height, setHeight] = useState(null)
    const [weight, setWeight] = useState(null)
    const [messageImc, setmessageImc] = useState("Preencha o peso e altura")
    const [imc, setImc] = useState(null)
    const [textButton, setTextButton] = useState("Calcular IMC")
    const [errorMessage,  setErrorMessage] = useState(null)
    const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
      ];

    const imcCalculator = () => {
        const heightFormat = height.replace(",",".")
        setImc((weight / (heightFormat * heightFormat)).toFixed(2))
    }

    const verificationIMC = () =>{
        if(!imc){
            Vibration.vibrate( PATTERN[1] )
            setErrorMessage("Campo obrigatório *")
        }
    }

    const validationImc = () =>{
        if(weight && height){
            imcCalculator()
            setHeight(null)
            setWeight(null)
            setmessageImc("Seu imc é igual: ")
            setTextButton("Calcular novamente")
            setErrorMessage(null)
            return
        }
        setImc(null)
        setTextButton("Calcular IMC")
        setmessageImc("Preencha o peso e altura")
        verificationIMC()
    }

    return (
        <Pressable onPress={Keyboard.dismiss} style={styles.formContext}>
            <View style={styles.form}> 
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setHeight}
                    value={height}
                    placeholder='Ex. 1.75'
                    keyboardType='numeric'/>

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setWeight}
                    value={weight}
                    placeholder='Ex.75.365'
                    keyboardType='numeric'/>
               
                <TouchableOpacity
                    style={styles.buttonCalculator}
                    onPress={() => validationImc()}>
                        <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
           </View>
           <ResultIMC 
                messageResultImc={messageImc} 
                resultImc={imc}/>

        </Pressable>
    )
}