import {
    kuliner,
} from "@/app/Inventory";
import { NavigationProp } from "@react-navigation/native";
import Entypo from "@expo/vector-icons/Entypo";
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    ScrollView,
    StatusBar,
    ImageBackground,
    Image,
    TouchableOpacity,
    Linking,
    TextInput,
} from "react-native";

interface props {
    navigation: NavigationProp<any, any>;
}

const Wisata: React.FC<props> = ({ navigation }) => {
    // UseState = penyimpanan data sementara
    const [data, setData] = useState<
        {
            id: number;
            nama: string;
            deskripsi: string;
            img: string;
            maps: string;
        }[]
    >([]);

    const [find, setFind] = useState<string>();
    const [findLower, setFindLower] = useState<string>("");

    // fetching data untuk mengambil data dari API
    const fetchData = async () => {
        const response = await fetch("http://192.168.3.220:5000/kuliner");
        const data = await response.json();

        // setData = mengisi state data dari fetching
        setData(data);
    };

    // memuat data setiap halaman ini dibuka
    useEffect(() => {
        fetchData();
    }, []);

    // menfilter data berdasarkan yang diketian di search
    const filterHotel = data.filter((item) => {
        const words = findLower.split(" ");
        return words.some((word) => item.nama.includes(word));
    });

    return (
        // Tampilan Yang Memuat daftar Hotel
        <View style={styles.container}>
            <StatusBar barStyle={"light-content"} backgroundColor={"#1F1F1F"} />
            <View style={styles.banner}>
                <ImageBackground
                    style={styles.bgBanner}
                    source={kuliner}>
                    <View style={styles.judulBan}>
                        <Text style={styles.banText}>HALAMAN KULINER</Text>
                    </View>
                </ImageBackground>
            </View>

            {/* Form cari hotel */}
            <View style={styles.headContent}>
                <TextInput
                    placeholder="Cari Kuliner"
                    style={styles.searchHotel}
                    onChangeText={(text) => {
                        setFind(text);
                        setFindLower(text.toLowerCase());
                    }}
                />
                <Entypo name="magnifying-glass" size={24} color="black" />
            </View>
            {/* end form cari hotel */}

            <ScrollView showsVerticalScrollIndicator={false}>
                {Object.values(filterHotel).map((item, index) => (
                    <View style={styles.content} key={index}>
                        <Image
                            src={item.img}
                            resizeMode="cover"
                            style={styles.img}
                        />
                        <View style={{ marginLeft: 5 }}>
                            <Text style={styles.namaHotel}>
                                {item.nama}
                            </Text>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Detail", {data : item})}>
                                <Text style={styles.descHotel}>
                                    {item.deskripsi.substring(0, 70)}
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
                                onPress={() => Linking.openURL(`${item.maps}`)}>
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
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    banner: {
        height: 150,
    },
    bgBanner: {
        flex: 1,
    },
    banText: {
        color: "white",
        width: 100,
        textAlign: "center",
    },
    banText2: {
        color: "white",
    },
    judulBan: {
        backgroundColor: "#1F1F1F",
        width: 150,
        height: 60,
        alignItems: "center",
        paddingTop: 4,
    },
    img: {
        height: 150,
        width: 150,
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
        width: 200
    },
    descHotel: {
        fontSize: 20,
        fontWeight: "bold",
        width: 255,
    },
});

export default Wisata;
