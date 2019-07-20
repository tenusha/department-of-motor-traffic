import React, {Component} from "react";
import {StyleSheet, TouchableOpacity, Text} from "react-native";
import Icon from "@builderx/icons";

export default class MaterialCheckboxWithLabel1 extends Component {
    render() {
        return (
            <TouchableOpacity style={[styles.root, this.props.style]} onPress={this.props.handleToggle}>
                <Icon
                    name={
                        this.props.checked ? "checkbox-marked" : "checkbox-blank-outline"
                    }
                    type={"MaterialCommunityIcons"}
                    style={styles.checkIcon}
                />
                <Text style={styles.checkLabel}>{this.props.label || "Label"}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "transparent",
        flexDirection: "row",
    },
    checkIcon: {
        color: "#2196F3",
        fontSize: 28,
        lineHeight: 28,
        alignSelf: "center",

    },
    checkLabel: {
        color: "rgba(0,0,0,0.87)",
        marginLeft: 2,
        marginTop: 10,
        fontSize: 16
    }
});
