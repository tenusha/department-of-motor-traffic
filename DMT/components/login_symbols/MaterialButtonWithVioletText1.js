import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";
import configs from "../../config";

export default class MaterialButtonWithVioletText1 extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.root, this.props.style]}>
                <Text style={styles.caption}>Forgot Your Password</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "transparent",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        minWidth: 88
    },
    caption: {
        color: configs.theme,
        fontSize: 14,
        fontWeight: "200"
    }
});
