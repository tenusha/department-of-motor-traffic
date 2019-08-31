import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import configs from "../../config";

export default class CustomButton extends React.Component {

    render() {
        return (
            <View style={[styles.root, this.props.style]}>
                <Text style={styles.caption} onPress={this.props.handleClick}>{this.props.title}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: configs.buttonCol,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: 16,
        paddingLeft: 16,
        elevation: 2,
        minWidth: 88,
        borderRadius: 2,
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
        fontSize: 16,
        fontWeight: "200"
    }
});
