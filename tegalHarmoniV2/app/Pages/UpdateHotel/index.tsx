import Button from "@/app/Components/Moleculs/Button";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    Image,
    View,
    Platform,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { NavigationProp, RouteProp } from "@react-navigation/native";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const UpdateHotel: React.FC<props> = ({ navigation, route }) => {
    const [image, setImage] = useState<string>();
    
    const sendData = route.params?.data;
    
    const [data, setData] = useState(sendData);

    const [nama, setNama] = useState<string>(data?.nama);
    const [deskripsi, setDeskripsi] = useState<string>(data?.deskripsi);
    const [imgSend, setImgSend] = useState<string>(data?.img);
    const [maps, setMaps] = useState<string>(data?.maps);
    const [harga, setHarga] = useState<string>(data?.harga);
    const [alamat, setAlamat] = useState<string>(data?.alamat);
    
    useEffect(() => {
        (async () => {
            if (Platform.OS !== "web") {
                const { status } =
                    await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== "granted") {
                    alert("Permission to access gallery is required!");
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadToCloudinary(result.assets[0].uri);
        }
    };

    const uploadToCloudinary = async (imageUri) => {
        const data2 = new FormData();

        // Ekstrak file name dan type dari URI
        const fileName = imageUri.split("/").pop();
        const fileType = fileName.split(".").pop();

        data2.append("file", {
            uri: imageUri,
            name: fileName,
            type: `image/${fileType}`,
        });

        data2.append("upload_preset", "Cloudinary_my_first_time"); // dari cloudinary
        data2.append("cloud_name", "dqcnnluof");

        try {
            const res = await fetch(
                "https://api.cloudinary.com/v1_1/dqcnnluof/image/upload",
                {
                    method: "POST",
                    body: data2,
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            const json = await res.json();
            setImgSend(json.secure_url);
            console.log("Uploaded URL:", json.secure_url);
        } catch (error) {
            console.error("Upload failed:", error);
        }
    };
    // Handle deleteButton
    const info = () => {
        Alert.alert("Data Berhasil Dirubah", "Kembali Ke Home", [
            {
                text: "Home",
                onPress: () => navigation.navigate("Setting"),
                style: "default",
            },
        ]);
    };

    // Handle updateButton
    const sendUpdate = async () => {
        try {
            await fetch(`http://192.168.220.220:5000/hotel/${data?.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    nama: nama,
                    deskripsi: deskripsi,
                    img: imgSend,
                    maps: maps,
                    harga: harga,
                    alamat: alamat,
                }),
            });
            info();
        } catch (error) {
            alert("ada error nih");
        }
    };

    return (
        <ScrollView>
            <View style={styles.containerForm}></View>
            {/* End Form */}

            <Text style={styles.textLabel}>Nama</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 5,
                }}
                keyboardType="default"
                placeholder="Nama Hotel"
                onChangeText={(text) => setNama(text)}
                value={nama}
            />

            <Text style={styles.textLabel}>Deskripsi</Text>
            <TextInput
                style={styles.textArea}
                placeholder="Deskripsi"
                onChangeText={(text) => setDeskripsi(text)}
                multiline={true}
                numberOfLines={4}
                value={deskripsi}
            />

            <Text style={styles.textLabel}>Img</Text>
            <Button aksi={() => pickImage()} style={styles.button}>
                Image
            </Button>

            <Text style={styles.textLabel}>Maps</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 5,
                }}
                keyboardType="default"
                placeholder="Maps"
                onChangeText={(text) => setMaps(text)}
                value={maps}
            />

            <Text style={styles.textLabel}>Harga</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 5,
                }}
                keyboardType="default"
                placeholder="RNO"
                onChangeText={(text) => setHarga(text)}
                value={harga}
            />

            <Text style={styles.textLabel}>Alamat</Text>
            <TextInput
                style={{
                    borderWidth: 1,
                    marginBottom: 5,
                    borderRadius: 5,
                }}
                keyboardType="default"
                placeholder="RNO"
                onChangeText={(text) => setAlamat(text)}
                value={alamat}
            />

            <Button
                aksi={() => sendUpdate()}
                style={[
                    styles.button,
                    { marginHorizontal: "auto", width: 190, marginTop: 10 },
                ]}>
                Ubah
            </Button>

            <Button
                aksi={() => alert("Hallo")}
                style={[
                    styles.button,
                    {
                        marginHorizontal: "auto",
                        width: 190,
                        marginTop: 10,
                        backgroundColor: "red",
                    },
                ]}>
                Delete
            </Button>
            {/* End Form */}
        </ScrollView>
    );
};

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
    },
    navbar: {
        padding: 7,
        marginBottom: 40,
        backgroundColor: "#3bb9f7",
    },
    container: {
        flex: 1,
    },
    containerForm: {
        paddingHorizontal: 5,
    },
    button: {
        backgroundColor: "#3bb9f7",
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
});

export default UpdateHotel;
