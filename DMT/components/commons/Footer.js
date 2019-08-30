import React from 'react'
import {StyleSheet, Text, View} from 'react-native'
import configs from "../../config.json"

export default class Footer extends React.Component {

    render() {
        return (
            <View style={styles.header_footer_style}>
                <Text style={styles.textStyle}> Department of Motor Traffic </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    MainContainer: {
        justifyContent: 'center',
        flex: 1,
        paddingTop: 20,
    },
    rowViewContainer: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    header_footer_style: {
        width: '100%',
        height: 45,
        backgroundColor: configs.theme,
        padding: 10,
    },
    textStyle: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 16,
    },
});