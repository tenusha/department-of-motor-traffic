import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";
import configs from "../../config";

export default class MaterialButtonViolet extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.root, this.props.style]} onPress={this.props.handleClick}>
                <Text style={styles.caption}>{this.props.title}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#ffffff00",
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
        color: configs.theme,
        fontSize: 14,
        fontWeight: "200"
    }
});
