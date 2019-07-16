import React from 'react';
import {AsyncStorage, Text} from 'react-native';
import {Button} from "react-native-elements";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'My Vehicles'
    };

    state = {}

    componentDidMount() {
        this.setUser()
    }

    setUser = async () => {
        const user = {
            fname: "Tenusha",
            lname: "Guruge"
        }

        AsyncStorage.setItem("dmt_user", JSON.stringify(user))
        console.log("set User")
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <Text>Login</Text>
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        backgroundColor: '#e30047'
                    }}
                    onPress={() => {
                        this.props.navigation.navigate("App")
                    }}
                    title='go back'/>
            </>
        );
    }
}