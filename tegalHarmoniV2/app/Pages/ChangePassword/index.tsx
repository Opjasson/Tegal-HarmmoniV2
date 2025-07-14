import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { NavigationProp, RouteProp } from "@react-navigation/native";

interface props {
    navigation: NavigationProp<any, any>;
    route: RouteProp<any, any>;
}

const ChangePassword: React.FC<props> = ({ navigation, route }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confPassword, setConfPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [id, setId] = useState("")
    const [error, setError] = useState<string>();

    const data = route.params?.data
    console.log(data);
    
    const handleChangePass = async () => {
        const response = await fetch(`http://192.168.220.220:5000/user/${data.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: data.email,
                password: password,
                role: data.role,
                confPassword: confPassword,
            }),
        });
        if (JSON.stringify(response.status) === "400") {
            setError("Password sesuaikan Confirm Password!");
        } else {
            alert("Berhasil merubah akun");
            navigation.navigate("Login");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Login</Text>
            </View>
            <View style={styles.body}>
                {/* Icon user bulat */}
                <View style={styles.avatarCircle}>
                    <FontAwesome name="user" size={36} color="#fff" />
                </View>

                {/* Card putih */}
                <View style={styles.card}>
                    <Text
                        style={{
                            color: "red",
                            fontSize: 15,
                            textAlign: "center",
                        }}>
                        {error}
                    </Text>

                    <View style={styles.inputGroup}>
                        <MaterialIcons
                            name="lock-outline"
                            size={20}
                            color="gray"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry={!showPassword}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}>
                            <MaterialIcons
                                name={
                                    showPassword
                                        ? "visibility-off"
                                        : "visibility"
                                }
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.inputGroup}>
                        <MaterialIcons
                            name="lock-outline"
                            size={20}
                            color="gray"
                            style={styles.icon}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Password"
                            secureTextEntry={!showPassword}
                            value={confPassword}
                            onChangeText={setConfPassword}
                        />
                        <TouchableOpacity
                            onPress={() => setShowPassword(!showPassword)}>
                            <MaterialIcons
                                name={
                                    showPassword
                                        ? "visibility-off"
                                        : "visibility"
                                }
                                size={20}
                                color="gray"
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.signInButton}
                        onPress={() => handleChangePass()}>
                        <Text style={styles.signInText}>Change Password</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#4BA3A2" },
    header: {
        height: 50,
        backgroundColor: "#3F51B5",
        justifyContent: "center",
        paddingHorizontal: 16,
    },
    headerText: { color: "#fff", fontSize: 18 },
    body: {
        flex: 1,
        alignItems: "center",
        paddingTop: 30,
    },
    avatarCircle: {
        backgroundColor: "#3F51B5",
        width: 80,
        height: 80,
        borderRadius: 40,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: -40,
        zIndex: 1,
    },
    card: {
        backgroundColor: "#fff",
        width: "85%",
        borderRadius: 10,
        padding: 20,
        paddingTop: 60,
        elevation: 5,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
        marginBottom: 20,
    },
    icon: { marginRight: 10 },
    input: {
        flex: 1,
        height: 40,
    },
    forgotPassword: {
        alignItems: "flex-end",
        marginBottom: 20,
    },
    forgotText: {
        fontSize: 12,
        color: "gray",
    },
    signInButton: {
        backgroundColor: "#F57C00",
        paddingVertical: 12,
        borderRadius: 6,
        alignItems: "center",
    },
    signInText: {
        color: "#fff",
        fontSize: 16,
    },
});

export default ChangePassword;
