import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const Detail: React.FC<props> = ({ navigation, route }) => {
    const sendData = route.params?.data;

    const [data, setData] = useState(sendData);

    const sendMesaage = async () => {
        const url = `whatsapp://send?phone=${
            data?.contact
        }&text=${encodeURIComponent("Hallo")}`;

        const supported = await Linking.canOpenURL(url);
        if (supported) {
            await Linking.openURL(url);
            navigation.navigate("home");
        }
    };
    return (
        <ScrollView
            style={styles.container}
            showsVerticalScrollIndicator={false}>
            <View style={styles.contContent}>
                <Text style={styles.topInfo}>Deskripsi Lengkap</Text>

                <Image resizeMode="cover" style={styles.img} src={data?.img} />
                <View style={styles.isiContent}>
                    <Text style={styles.namaHotel}>{data?.nama}</Text>
                    <Text style={styles.deskripsi}>{data?.deskripsi}</Text>
                    <TouchableOpacity onPress={() => sendMesaage()}>
                        <Text style={{ color : "blue" }}>
                            Hubungi : {data?.contact}
                        </Text>
                    </TouchableOpacity>
                    {data?.harga ? (
                        <Text style={styles.harga}>
                            Harga mulai dari : Rp.{data?.harga}
                        </Text>
                    ) : (
                        ""
                    )}
                    {data?.alamat ? <Text>alamat : {data?.alamat}</Text> : ""}

                    <TouchableOpacity
                        style={styles.maps}
                        onPress={() => Linking.openURL(`${data?.maps}`)}>
                        <Entypo name="location-pin" size={18} color="white" />
                        <Text style={styles.mapsText}>Buka Maps</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topInfo: {
        fontSize: 30,
        fontWeight: "800",
        width: 200,
        paddingHorizontal: 10,
        marginBottom: 7,
    },
    img: {
        width: 300,
        height: 300,
        marginHorizontal: "auto",
        borderRadius: 8,
        elevation: 5,
    },
    isiContent: {
        padding: 11,
    },
    namaHotel: {
        fontSize: 25,
        fontWeight: "800",
        textDecorationLine: "underline",
        textTransform: "uppercase",
    },
    deskripsi: {
        textAlign: "justify",
        marginTop: 5,
    },
    maps: {
        backgroundColor: "#4ca836",
        width: 120,
        borderRadius: 10,
        flexDirection: "row",
        textAlign: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginTop: 10,
        elevation: 3,
    },
    mapsText: {
        color: "white",
    },
    contContent: {
        backgroundColor: "#e8edea",
        width: 360,
        marginHorizontal: "auto",
        borderRadius: 10,
        marginVertical: 20,
    },
    harga: {
        paddingVertical: 5,
        marginTop: 5,
        borderTopWidth: 2,
    },
});

export default Detail;
