import { splashScreen } from "@/app/Inventory";
import { NavigationProp } from "@react-navigation/native";
import React from "react";
import {
    Image,
    StatusBar,
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from "react-native";



interface props {
    navigation : NavigationProp<any,any>
}

const SplashScreen: React.FC<props> = ({navigation}) => {
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={"#1F1F1F"} barStyle={"light-content"} />
            <View style={styles.contMain}>
                <Image style={styles.image} source={splashScreen} />
            </View>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.butText}>Mulai</Text>
                </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffff",
        justifyContent: "center",
    },
    button: {
        backgroundColor: "#faf1c8",
        width: 100,
        padding: 3,
        borderRadius: 7,
        marginHorizontal: "auto",
    },
    butText: {
        textAlign: "center",
        fontWeight: "900",
    },
    image: {
        width: 260,
        height: 260,
        marginHorizontal: "auto",
    },
    contMain: {
        backgroundColor: "#202123",
        width: 260,
        marginHorizontal: 'auto',
        elevation: 7,
        marginBottom: 15
    },
});

export default SplashScreen;
