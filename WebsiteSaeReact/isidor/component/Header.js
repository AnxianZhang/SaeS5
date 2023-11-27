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

const Header = (props) => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();
    const [open, setOpen] = useState(false);
    const [isConnect, setIsConnect] = useState(false);

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
    return (
        <View style={props.style ? props.style : styles.header}>
            <View style={styles.headerLogo}>
                <ButtonImage onPress={() => navigation.navigate("Home")} source={{ uri: LogoSae }} style={styles.logoPicture} />
            </View>
            <View style={props.inProps? styles.containProposUnderLine : styles.containProps}>
                <ButtonText onPress={() => navigation.navigate("APropos")} text={props.language.Header.about} styleText={styles.headerText} />
            </View>
            <View style={styles.headerLastElement}>
                <View style={styles.containeWorldPicture}>
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
                            <Text style={styles.headerText}>{props.language.Home.buttonPlay}</Text>
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
        alignItems: "center",
        paddingTop: 10,
        height: 100
    },
    headerLogo: {
        paddingLeft: 60,
        paddingRight: 50
    },
    logoPicture: {
        width: 72,
        height: 64
    },
    headerText: {
        fontSize: 24,
        fontFamily: "regular",
        color: "white",
    },
    headerLastElement: {
        flex: 1,
        position: 'relative',
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingRight: 60
    },
    worldPicture: {
        width: 31,
        height: 31
    },
    containeWorldPicture: {
        paddingRight: 50,
    },
    containConnect: {
        paddingRight: 50,
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#EE8A45",
        paddingTop: 5,
        paddingBottom: 5,
        paddingRight: 30,
        paddingLeft: 30,
        borderRadius: 10
    },
    playLogo: {
        width: 25,
        height: 33,
        marginRight: 20
    },
    listContainer: {
        position: 'absolute',
        top : '100%'
    },

    containProposUnderLine:{
        borderBottomWidth: 5,
        borderBlockColor: "white",
    },
});

export default Header;