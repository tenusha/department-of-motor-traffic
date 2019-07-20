import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";

export default class MaterialButtonPrimary1 extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.root, this.props.style]} onPress={this.props.handleSubmit}>
                <Text style={styles.caption}>Login</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#2196F3",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        minWidth: 88,
        borderRadius: 100,
        borderColor: "#000000",
        borderWidth: 0,
        shadowOffset: {
            height: 1,
            width: 0
        },
        shadowColor: "#000",
        shadowOpacity: 0.35,
        shadowRadius: 5
    },
    caption: {
        color: "#fff",
        fontSize: 14,
        fontWeight: "200"
    }
});
