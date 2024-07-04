import React, {useState} from 'react'
import {
    View, 
    Text, 
    TextInput, 
    Vibration, 
    TouchableOpacity,
    Pressable,
    Keyboard,
    FlatList
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
    const [imcList, setImcList] = useState([])
    const ONE_SECOND_IN_MS = 1000;
    const PATTERN = [
        1 * ONE_SECOND_IN_MS,
        2 * ONE_SECOND_IN_MS,
        3 * ONE_SECOND_IN_MS,
      ];

    const imcCalculator = () => {
        const heightFormat = height.replace(",",".")
        const totalImc = (weight / (heightFormat * heightFormat)).toFixed(2)
        setImcList(arr => [...arr, {id: new Date().getTime(), imc: totalImc}])
        setImc(totalImc)
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
        }else{
            setImc(null)
            setTextButton("Calcular IMC")
            setmessageImc("Preencha o peso e altura")
            verificationIMC()
        }
    }

    return (
        <View  style={styles.formContext}>
            {
                !imc
                ?
                    <Pressable onPress={Keyboard.dismiss} style={styles.form}>
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
                    </Pressable>
                :     
                    <View style={styles.exhibitionResultImc}>
                        <ResultIMC 
                            messageResultImc={messageImc} 
                            resultImc={imc}/>
                        <TouchableOpacity
                            style={styles.buttonCalculator}
                            onPress={() => validationImc()}>
                                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                        </TouchableOpacity>
                    </View>        
            }
            <FlatList
                showsVerticalScrollIndicator={false}
                style={styles.listImcs}
                data={imcList.reverse()}
                renderItem={(({item}) => {
                    return(
                        <Text style={styles.resultImcItem}>
                            <Text style={styles.textResultItemList} >Resultado IMC = </Text>
                            {item.imc}
                        </Text>
                    )
                })}
                keyExtractor={(item) => {
                    item.id
                }}>

            </FlatList>
        </View>

    )
}