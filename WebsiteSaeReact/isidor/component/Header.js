import * as React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import LogoSae from "../assets/LogoSae.png";
import World from "../assets/world.png"
import ButtonText from './ButtonText';
import ButtonImage from './ButtonImage';
import { useNavigation } from '@react-navigation/native';
import Play from "../assets/Play.png";
import { useIsFocused } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect } from 'react';
import List from './List';
import { getLanguage } from '../function/languageSelect';
<<<<<<< HEAD
=======
import useScreenWidthDimention from '../hook/useScreenWidthDimention';
import { GLOBAL_STYLES } from '../style/global';
>>>>>>> main

const Header = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [isConnect, setIsConnect] = useState(false);

<<<<<<< HEAD
=======
    const windowWidth = useScreenWidthDimention();

>>>>>>> main
    useEffect(() => {
        getData()
    }, [isFocused])

    useEffect(()=>{
        props.setLanguage(getLanguage);
    })

    const getData = async () => {
        const response = await AsyncStorage.getItem("user");
        const responseJSON = JSON.parse(response);
        if (responseJSON !== null) {
            setIsConnect(responseJSON.isConnect);
        }
    }

    const disconnection = async () => {
        setIsConnect(false);
        props.setIsConnect(false);
        await AsyncStorage.setItem("user", JSON.stringify({ pseudo: null, isConnect: false }));
    }
<<<<<<< HEAD
    return (
        <View style={props.style ? props.style : styles.header}>
            <View style={styles.headerLogo}>
                <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={styles.logoPicture} />
            </View>
            <View style={styles.containPropos}>
                <ButtonText onPress={() => console.log("toucher")} text={props.language.Header.about} styleText={styles.headerText} />
            </View>
            <View style={styles.headerLastElement}>
                <View style={styles.containeWorldPicture}>
=======
    
    return (
        <View style={[props.style ? props.style : styles.header, {paddingHorizontal: windowWidth <= 450 ? 10 : 50}]}>
            <View style = {{flex: 1, flexDirection: "row", alignItems: 'center', /*backgroundColor: "cyan",*/ justifyContent: 'flex-start', gap: 50,}}>
                <View>
                    <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={GLOBAL_STYLES.projectLogo} />
                </View>
                {windowWidth > 750 && <View style={props.inProps? styles.containProposUnderLine : styles.containProps}>
                    <ButtonText onPress={() => navigation.navigate("APropos")} text={props.language.Header.about} styleText={styles.headerText} />
                </View>}
            </View>
            <View style={styles.headerLastElement}>
                <View>
>>>>>>> main
                    <ButtonImage onPress={() => setOpen(!open)} source={{ uri: World }} style={styles.worldPicture} />
                    {open &&
                    <View style={styles.listContainer}><List /></View>
                    }
                </View>
                <View style={styles.containConnect}>
                    <ButtonText onPress={() => { isConnect ? disconnection() : navigation.navigate("Connexion") }} text={isConnect ? props.language.Header.disconnect : props.language.Header.connect} styleText={styles.headerText} />
                </View>
                <View>
                    <TouchableOpacity onPress={() => { isConnect ? navigation.navigate("Game") : navigation.navigate("Connexion") }}>
                        <View style={styles.buttonContent}>
                            <Image source={{ uri: Play }} style={styles.playLogo} />
<<<<<<< HEAD
                            <Text style={styles.headerText}>{props.language.Home.buttonPlay}</Text>
=======
                            {windowWidth > 750 && <Text style={styles.headerText}>{props.language.Home.buttonPlay}</Text>}
>>>>>>> main
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
<<<<<<< HEAD
=======
        // justifyContent: 'space-between',
>>>>>>> main
        alignItems: "center",
        paddingTop: 10,
        height: 100
    },
<<<<<<< HEAD
    headerLogo: {
        paddingLeft: 60,
        paddingRight: 50
    },
    logoPicture: {
        width: 72,
        height: 64
    },
=======
    // headerLogo: { // <====================================================
    //     // paddingLeft: 60,
    //     // paddingRight: 50
    // },
    // logoPicture: {
    //     width: 72,
    //     height: 64
    // },
>>>>>>> main
    headerText: {
        fontSize: 24,
        fontFamily: "regular",
        color: "white",
    },
    headerLastElement: {
        flex: 1,
<<<<<<< HEAD
        position: 'relative',
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 60
=======
        alignItems: 'center',
        justifyContent: "flex-end",
        // backgroundColor: "pink",
        // position: 'relative',
        flexDirection: "row",
        // justifyContent: "flex-end",
        // paddingRight: 60
>>>>>>> main
    },
    worldPicture: {
        width: 31,
        height: 31
    },
<<<<<<< HEAD
    containeWorldPicture: {
        paddingRight: 50,
    },
    containConnect: {
        paddingRight: 50,
=======
    // containeWorldPicture: { // <==============================================================
    //     // paddingRight: 50,
    // },
    containConnect: {
        paddingHorizontal: 25,
>>>>>>> main
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EE8A45",
<<<<<<< HEAD
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 30,
        paddingLeft: 30,
=======
        gap: 15,
        // paddingTop: 5,
        // paddingBottom: 5,
        // paddingRight: 30,
        // paddingLeft: 30,
        paddingVertical: 5,
        paddingHorizontal: 15,
>>>>>>> main
        borderRadius: 10
    },
    playLogo: {
        width: 25,
        height: 33,
<<<<<<< HEAD
        marginRight: 20
=======
        // marginRight: 20
>>>>>>> main
    },
    listContainer: {
        position: 'absolute',
        top : '100%'
    },
<<<<<<< HEAD
    
=======

    containProposUnderLine:{
        borderBottomWidth: 5,
        borderBlockColor: "white",
    },
>>>>>>> main
});

export default Header;