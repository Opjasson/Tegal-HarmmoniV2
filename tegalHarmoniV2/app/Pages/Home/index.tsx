import { home, iklan } from "@/app/Inventory";
import { Entypo } from "@expo/vector-icons";
import { NavigationProp } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    Text,
    View,
    StyleSheet,
    Linking,
    TouchableOpacity,
    ScrollView,
} from "react-native";

interface props {
    navigation: NavigationProp<any, any>;
}

const Home: React.FC<props> = ({ navigation }) => {
    const [data, setData] = useState<{
        id: number;
        nama: string;
        deskripsi: string;
        img: string;
        maps: string;
    }>();

    const [data2, setData2] = useState<{
        id: number;
        nama: string;
        deskripsi: string;
        img: string;
        maps: string;
    }>();

    const [data3, setData3] = useState<{
        id: number;
        nama: string;
        deskripsi: string;
        img: string;
        maps: string;
    }>();

    // fetching data hotel atau menambil data dari backend/API
    const fetchData = async () => {
        const response = await fetch("http://192.168.220.220:5000/hotel/7");
        const satu = await response.json();

        // setData = mengisi state data dari fetching
        setData(satu);
    };

    // fetching data wisata atau mengambil data dari backend/API
    const fetchData2 = async () => {
        const response2 = await fetch("http://192.168.220.220:5000/wisata/7");
        const satu2 = await response2.json();

        // setData = mengisi state data dari fetching
        setData2(satu2);
    };

    const fetchData3 = async () => {
        const response3 = await fetch("http://192.168.220.220:5000/kuliner/8");
        const satu3 = await response3.json();

        // setData = mengisi state data dari fetching
        setData3(satu3);
    };

    useEffect(() => {
        fetchData();
        fetchData2();
        fetchData3();
    }, []);

    return (
        <View style={styles.containerContent}>
            <ScrollView>
                <View style={{ flexDirection : "row", justifyContent : "space-between" }}>
                    <View style={styles.titlePage}>
                        <Text style={styles.home}>Home</Text>
                        <Image style={styles.icon} source={home} />
                    </View>
                    <TouchableOpacity>
                        <Text style={{ fontSize : 20 }}>Log out</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <Text style={styles.head1}>Penawaran Weekend</Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("formPromo")}>
                        <ImageBackground
                            source={iklan}
                            style={styles.iklanImg}></ImageBackground>
                    </TouchableOpacity>

                    <Text style={styles.head1}>Isi Penawaran</Text>

                    {/* Menampilkan isi penawaran hotel dari fetch hotel*/}
                    <View style={styles.content}>
                        <Image
                            src={data?.img}
                            resizeMode="cover"
                            style={styles.img}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.namaHotel}>
                                Hotel {data?.nama}
                            </Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Detail", {
                                        data: data,
                                    })
                                }>
                                <Text style={styles.descHotel}>
                                    {data?.deskripsi.substring(0, 70)}
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: "400",
                                            color: "blue",
                                        }}>
                                        {" "}
                                        Selengkapnya...
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(`${data?.maps}`)
                                }>
                                <Text>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="black"
                                    />
                                    Buka maps
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Menampilkan isi penawaran wisata dari fetch wisata */}
                    <View style={styles.content}>
                        <Image
                            src={data2?.img}
                            resizeMode="cover"
                            style={styles.img}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.namaHotel}>{data2?.nama}</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Detail", {
                                        data: data,
                                    })
                                }>
                                <Text style={styles.descHotel}>
                                    {data2?.deskripsi.substring(0, 70)}
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: "400",
                                            color: "blue",
                                        }}>
                                        {" "}
                                        Selengkapnya...
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(`${data2?.maps}`)
                                }>
                                <Text>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="black"
                                    />
                                    Buka maps
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* menampilkan kuliner hasil dari fetching data kuliner */}
                    <View style={styles.content}>
                        <Image
                            src={data3?.img}
                            resizeMode="cover"
                            style={styles.img}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.namaHotel}>{data3?.nama}</Text>
                            <TouchableOpacity
                                onPress={() =>
                                    navigation.navigate("Detail", {
                                        data: data,
                                    })
                                }>
                                <Text style={styles.descHotel}>
                                    {data3?.deskripsi.substring(0, 70)}
                                    <Text
                                        style={{
                                            fontSize: 10,
                                            fontWeight: "400",
                                            color: "blue",
                                        }}>
                                        {" "}
                                        Selengkapnya...
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() =>
                                    Linking.openURL(`${data3?.maps}`)
                                }>
                                <Text>
                                    <Entypo
                                        name="location-pin"
                                        size={18}
                                        color="black"
                                    />
                                    Buka maps
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    head1: {
        fontSize: 20,
        fontWeight: "800",
        padding: 5,
        textDecorationLine: "underline",
        backgroundColor: "#393E46",
        marginTop: 10,
        color: "white",
    },
    home: {
        fontSize: 30,
        fontWeight: "900",
        padding: 10,
    },
    titlePage: {
        flexDirection: "row",
    },
    icon: {
        height: 40,
        width: 40,
        marginTop: 9,
    },
    iklanImg: {
        height: 200,
    },
    containerContent: {
        flex: 1,
    },
    headContent: {
        backgroundColor: "#e8edea",
        width: 300,
        marginHorizontal: "auto",
        borderRadius: 10,
        marginVertical: 8,
        flexDirection: "row",
        alignItems: "center",
    },
    content: {
        flexDirection: "row",
        marginBottom: 5,
        backgroundColor: "#e8edea",
        paddingVertical: 3,
    },
    searchHotel: {
        width: 270,
    },
    namaHotel: {
        fontSize: 15,
        fontWeight: "500",
        color: "#a1a199",
        textDecorationLine: "underline",
        textTransform: "capitalize",
    },
    descHotel: {
        fontSize: 20,
        fontWeight: "bold",
        width: 255,
    },
    img: {
        height: 150,
        width: 150,
    },
});
