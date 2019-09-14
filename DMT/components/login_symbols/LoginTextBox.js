import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

export default class CustomTextField extends React.Component {

    render() {
        return (
            <View style={[styles.root, this.props.style]}>

                <TextInput
                    secureTextEntry={this.props.type === 'password' ? true : false}
                    placeholder={this.props.placeholder}
                    value={this.props.value}
                    style={[
                        styles.inputStyle,
                        {
                            borderBottomColor: this.props.error
                                ? "red"
                                : this.props.success
                                    ? "green"
                                    : "#D9D5DC"
                        }
                    ]}
                    onChangeText={this.props.handleChange}
                />
                {this.props.error ? (
                    <Text
                        style={[
                            styles.helper1,
                            {
                                color: this.props.error ? "red" : "transparent"
                            }
                        ]}
                    >
                        Error message
                    </Text>
                ) : null}
                {this.props.success ? (
                    <Text
                        style={[
                            styles.helper2,
                            {
                                color: this.props.success ? "green" : "transparent"
                            }
                        ]}
                    >
                        Success message
                    </Text>
                ) : null}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        backgroundColor: "transparent"
    },
    inputStyle: {
        width: "100%",
        color: "#000",
        paddingTop: 8,
        paddingBottom: 8,
        borderColor: "#D9D5DC",
        borderBottomWidth: 1,
        fontSize: 16,
    },
    helper1: {
        paddingTop: 8,
        fontSize: 12,
        textAlign: "left"
    },
    helper2: {
        paddingTop: 8,
        fontSize: 12,
        textAlign: "left"
    }
});
