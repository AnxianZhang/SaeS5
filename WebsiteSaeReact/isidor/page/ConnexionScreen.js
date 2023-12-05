import * as React from 'react';
<<<<<<< HEAD
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions} from 'react-native';
=======
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Header from '../component/Header';
import Field from '../component/Field';
import { Dimensions } from 'react-native';
>>>>>>> main
import { useState, useEffect } from 'react';
import Seperator from '../component/Seperator';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLanguage } from '../function/languageSelect';
<<<<<<< HEAD
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ConnexionScreen = ({language})=>{    
    const [selectLanguage, setSelectLanguage] = useState(language); 
=======
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { GLOBAL_STYLES } from '../style/global';
import Footer from '../component/Footer';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
const ConnexionScreen = ({ language }) => {
    const [selectLanguage, setSelectLanguage] = useState(language);
>>>>>>> main
    const [pseudo, setPseudo] = useState("");
    const [password, setPassword] = useState("");
    const [errorPseudo, setErrorPseudo] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
<<<<<<< HEAD
    const [disable, setDisable] =  useState(true);
    const navigation = useNavigation();

    useEffect(()=>{
        setSelectLanguage(getLanguage);
    })

    useEffect(()=>{
        if(pseudo === "" || password === ""){
            setDisable(true);
        }
        else{
=======
    const [disable, setDisable] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        setSelectLanguage(getLanguage);
    })

    useEffect(() => {
        if (pseudo === "" || password === "") {
            setDisable(true);
        }
        else {
>>>>>>> main
            setDisable(false);
        }
    })

<<<<<<< HEAD
    const sendDataToDatabase = async()=>{
        const data = {
            pseudo : pseudo,
            password : password
        }
        try {
            const response = await fetch('http://localhost:3005/connexion', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            });
            const result = await response.status;
            if(result === 401){
=======
    const sendDataToDatabase = async () => {
        const data = {
            pseudo: pseudo,
            password: password
        }
        try {
            const response = await fetch('http://localhost:3005/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.status;
            if (result === 401) {
>>>>>>> main
                setPseudo("");
                setPassword("")
                setErrorPseudo(selectLanguage.connexion.errorConnection);
                setErrorPassword(selectLanguage.connexion.errorConnection);
            }
<<<<<<< HEAD
            if(result === 402){
=======
            if (result === 402) {
>>>>>>> main
                setPseudo("");
                setPassword("");
                setErrorPseudo(selectLanguage.connexion.errorConnection);
                setErrorPassword(selectLanguage.connexion.errorConnection);
            }
<<<<<<< HEAD
            if(result !== 401 && result !== 402){
=======
            if (result !== 401 && result !== 402) {
>>>>>>> main
                setErrorPassword("");
                setErrorPseudo("");
            }
            console.log(result);
<<<<<<< HEAD
            if(result === 200){
                console.log("naviguer");
                await AsyncStorage.setItem("user", JSON.stringify({pseudo : pseudo, isConnect : true}));
=======
            if (result === 200) {
                console.log("naviguer");
                await AsyncStorage.setItem("user", JSON.stringify({ pseudo: pseudo, isConnect: true }));
>>>>>>> main
                setErrorPassword("");
                setErrorPseudo("");
                navigation.navigate("Home");
            }
        }
<<<<<<< HEAD
        catch(error){
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }
    return(
        <View style={styles.backcolor}>
          <Header style={styles.header} setLanguage={setSelectLanguage} language={selectLanguage}/>
          <View style={styles.FormContainer}>
                <View style={styles.FormulaireBox}>
                    <View style={styles.ConnexionTitle}>
                        <Text style={styles.ConnexionText}>{selectLanguage.connexion.connection}</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, {borderColor : errorPseudo.length > 0 && "#E55839", borderWidh : errorPseudo.length > 0 && 1}]} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} placeholder={errorPseudo.length ? errorPseudo : selectLanguage.connexion.pseudo} onChangeText={setPseudo} value={pseudo} secureTextEntry={false}/>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={[styles.fields, {borderColor : errorPassword.length > 0 && "#E55839", borderWidh : errorPassword.length > 0 && 1}]} placeholderTextColor={errorPassword.length ? "#E55839" : "#000000"} placeholder={errorPassword.length ? errorPassword : selectLanguage.connexion.password} onChangeText={setPassword} value={password} secureTextEntry={true}/>
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>sendDataToDatabase()} disabled={disable}>
                            <View style={[styles.ButtonConnectContainer, {backgroundColor : disable ? "#a9a9a9" : "#E55839"}]}>
=======
        catch (error) {
            console.error('Erreur lors de l\'envoi des données au backend', error);
        }
    }

    const windowWidthByHook = useScreenWidthDimention()
    const formulaireBoxWidthStyle = windowWidthByHook > 750 ? windowWidthByHook > 900 ? "50%" : "70%" : "90%"

    return (
        <ScrollView style={GLOBAL_STYLES.backcolor}>
            <Header style={GLOBAL_STYLES.header} setLanguage={setSelectLanguage} language={selectLanguage} />
            <View style={styles.FormContainer}>
                <View style={StyleSheet.compose(styles.FormulaireBox, { width: formulaireBoxWidthStyle })}>
                    <View style={GLOBAL_STYLES.form.title}>
                        <Text style={GLOBAL_STYLES.form.text}>{selectLanguage.connexion.connection}</Text>
                    </View>
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorPseudo.length > 0 && "#E55839", borderWidh: errorPseudo.length > 0 && 1 })} placeholderTextColor={errorPseudo.length ? "#E55839" : "#000000"} placeholder={errorPseudo.length ? errorPseudo : selectLanguage.connexion.pseudo} onChangeText={setPseudo} value={pseudo} secureTextEntry={false} />
                    <Field fieldsViewStyle={styles.InputStyle} TextInputStyle={StyleSheet.compose(GLOBAL_STYLES.form.fields, { borderColor: errorPassword.length > 0 && "#E55839", borderWidh: errorPassword.length > 0 && 1 })} placeholderTextColor={errorPassword.length ? "#E55839" : "#000000"} placeholder={errorPassword.length ? errorPassword : selectLanguage.connexion.password} onChangeText={setPassword} value={password} secureTextEntry={true} />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => sendDataToDatabase()} disabled={disable}>
                            <View style={StyleSheet.compose(styles.ButtonConnectContainer, { backgroundColor: disable ? "#a9a9a9" : "#E55839" })}>
>>>>>>> main
                                <Text style={styles.ConnexionButtonText}>{selectLanguage.connexion.connect}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
<<<<<<< HEAD
                    <TouchableOpacity onPress={()=>console.log("ok")}>
                    <View style={styles.forgetPassword}>
                        <Text style={styles.forgetPasswordText}>{selectLanguage.connexion.forgotPassword}</Text>
                    </View>
                    </TouchableOpacity>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={()=>navigation.navigate("Register")}>
                            <View style={styles.NewAccountButtonConnectContainer}>
                                <Text style={styles.NewAccountButtonText}>{selectLanguage.connexion.createNewAccount}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View> 
           </View>
        </View>
    )
}
const styles = StyleSheet.create({
backcolor : {
    flex: 1,
    backgroundColor : "#7094CB"
},
header: {
    flexDirection: 'row',
    alignItems: "center",
    paddingTop: 10,
    height: 100,
    backgroundColor : "#443955"
},
FormContainer : {
    alignItems: "center",
    justifyContent : "center",
    height: windowHeight*0.85,
},
FormulaireBox : {
    height : windowHeight * 0.7,
    width : windowWidth * 0.6,
    borderRadius : 50,
    backgroundColor : "#443955"
},
ConnexionTitle : {
    alignItems : "center",
    paddingTop : 15
},
ConnexionText:{
    color:"white",
    fontSize:24,
    fontFamily:"ExtraBold"
},
InputStyle : {
    alignItems : "center",
    paddingTop : 40
},
fields : {
    backgroundColor : "white",
    width : 450,
    height : 55,
    borderRadius : 20,
    padding : 20,
    fontSize : 20,
    color : "#000000"
},
ButtonContainer:{
    alignItems : "center",
    paddingTop : 40
},
ConnexionButtonText : {
    fontSize : 28,
    color : "#FFFFFF",
    fontFamily : "Light",
    textAlign : "center"
},
ButtonConnectContainer : {
    width : 450,
    height : 42,
    borderRadius : 20
},
forgetPassword : {
    alignItems : "center",
    paddingTop : 10
},
forgetPasswordText : {
    fontSize : 16,
    color : "#E55839",
    fontFamily : "regular",
    paddingBottom : 30,
},
NewAccountButtonConnectContainer : {
    width : 310,
    height : 42,
    backgroundColor : "#5BD94C",
    borderRadius : 20
},
NewAccountButtonText:{
    fontSize : 24,
    color : "#FFFFFF",
    fontFamily : "regular",
    textAlign : "center"
}
=======
                    <TouchableOpacity onPress={() => console.log("ok")}>
                        <View style={styles.forgetPassword}>
                            <Text style={styles.forgetPasswordText}>{selectLanguage.connexion.forgotPassword}</Text>
                        </View>
                    </TouchableOpacity>
                    <Seperator />
                    <View style={styles.ButtonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
                            <View style={GLOBAL_STYLES.form.buttonContainer}>
                                <Text style={GLOBAL_STYLES.form.buttonText}>{selectLanguage.connexion.createNewAccount}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <Footer backColor={"#443955"} setLanguage={setSelectLanguage} language={selectLanguage}></Footer>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    FormContainer: {
        alignItems: "center",
        justifyContent: "center",
        height: 750,
    },
    FormulaireBox: {
        height: windowHeight * 0.7,
        borderRadius: 50,
        backgroundColor: "#443955",
        flex: .75,
        alignItems: "center"
    },
    InputStyle: {
        paddingTop: 40
    },
    ButtonContainer: {
        alignItems: "center",
        paddingTop: 40,
    },
    ConnexionButtonText: {
        fontSize: 25,
        color: "#FFFFFF",
        fontFamily: "Light",
        margin: "auto",
    },
    ButtonConnectContainer: {
        width: 400,
        height: 42,
        borderRadius: 20,
    },
    forgetPassword: {
        alignItems: "center",
        paddingTop: 10
    },
    forgetPasswordText: {
        fontSize: 16,
        color: "#E55839",
        fontFamily: "regular",
        paddingBottom: 30,
    },
>>>>>>> main
});

export default ConnexionScreen;