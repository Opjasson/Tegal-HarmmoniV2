import {
    NavigationProp,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    ScrollView,
    Alert,
    StatusBar,
    ImageBackground,
    Image,
    TouchableOpacity,
    Linking,
} from "react-native";
import Button from "@/app/Components/Moleculs/Button";
import Entypo from "@expo/vector-icons/Entypo";
import { Picker } from "@react-native-picker/picker";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const SettingWisata: React.FC<props> = ({ navigation, route }) => {
    // Get id menggunakan params di previos page
    // End state

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
    
        // fetching data untuk mengambil data dari API
        const fetchData = async () => {
            const response = await fetch("http://192.168.220.220:5000/wisata");
            const data = await response.json();
    
            // setData = mengisi state data dari fetching
            setData(data);
        };
    
        // memuat data setiap halaman ini dibuka
        useEffect(() => {
            fetchData();
        }, []);
    

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor="#2F5249" barStyle="light-content" />
            <View style={styles.navbar}>
                <Text style={styles.textNav}>Wisata</Text>
            </View>
            <View style={styles.topBar}>
                <Button
                    aksi={() => navigation.navigate("Setting")}
                    style={styles.button}>
                    Hotel
                </Button>

                <Button
                    aksi={() => navigation.navigate("SettingKuliner")}
                    style={styles.button}>
                    Kuliner
                </Button>

                <Button
                    aksi={() => navigation.navigate("SettingWisata")}
                    style={styles.button}>
                    Wisata
                </Button>
            </View>

            <Button aksi={() => navigation.navigate("TambahWisata")} style={styles.button}>
               + Tambah
            </Button>

            <View style={styles.container}>
                {/* end form cari hotel */}

                <ScrollView showsVerticalScrollIndicator={false}>
                    {data.map((item, index) => (
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
                                    onPress={() =>
                                        navigation.navigate("UpdateWisata", {
                                            data: item,
                                        })
                                    }>
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
                                    onPress={() =>
                                        Linking.openURL(`${item.maps}`)
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
                    ))}
                </ScrollView>
            </View>
            {/* Form Update */}
        </View>
    );
};

// pemberian style/gaya supaya lebih menarik dan hidup
const styles = StyleSheet.create({
    textArea: {
        width: "100%",
        height: 100,
        borderColor: "gray",
        borderWidth: 1,
        padding: 10,
        fontSize: 16,
    },
    textNav: {
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
    },
    navbar: {
        padding: 7,
        marginBottom: 40,
        backgroundColor: "#2F5249",
    },
    container: {
        flex: 1,
    },
    containerForm: {
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: "#2F5249",
        width: 100,
        padding: 8,
        alignItems: "center",
        borderRadius: 9,
    },
    topBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 30,
    },
    textLabel: {
        fontWeight: "bold",
        fontSize: 18,
        paddingHorizontal: 3,
    },
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
    },
    descHotel: {
        fontSize: 20,
        fontWeight: "bold",
        width: 255,
    },
});

export default SettingWisata;
