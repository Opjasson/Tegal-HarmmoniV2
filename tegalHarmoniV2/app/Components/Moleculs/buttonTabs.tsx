import React from "react";
import { Text, View, StyleSheet, Platform } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { PlatformPressable } from "@react-navigation/elements";
import {
    createBottomTabNavigator,
    BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";



const Icon = ({ label, focus }) => {
    switch (label) {
        case "Home":
            return focus ? (
                <Ionicons name="home" size={28} color={"#b39070"} />
            ) : (
                <Ionicons name="home-outline" size={28} color="#fff" />
            );
        case "Wisata":
            return focus ? (
                <FontAwesome6 name="umbrella-beach" size={24} color="#b39070" />
            ) : (
                <FontAwesome6 name="umbrella-beach" size={24} color="#fff" />
            );
        case "Kuliner":
            return focus ? (
                <Ionicons name="fast-food" size={24} color="#b39070" />
            ) : (
                <Ionicons name="fast-food" size={24} color="#fff" />
            );
        case "Hotel":
            return focus ? (
                <FontAwesome6 name="hotel" size={24} color="#b39070" />
            ) : (
                <FontAwesome6 name="hotel" size={24} color="#fff" />
            );
    }
};

const ButtonTabs = ({ state, descriptors, navigation }) => {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();
    return (
        <View
            style={{
                flexDirection: "row",
                backgroundColor: "#1F1F1F",
                paddingTop: 20,
                paddingHorizontal: 50,
                paddingBottom: 15,
                justifyContent: "space-between",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
            }}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: "tabPress",
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: "tabLongPress",
                        target: route.key,
                    });
                };

                return (
                    <PlatformPressable
                        key={index}
                        href={buildHref(route.name, route.params)}
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarButtonTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}>
                        <Icon label={label} focus={isFocused} />
                    </PlatformPressable>
                );
            })}
        </View>
    );
};

export default ButtonTabs;

const styles = StyleSheet.create({});
