import React from 'react';
import {AsyncStorage, Image, Text, ToastAndroid} from 'react-native';
import {Button} from "react-native-elements";
import {registerForPushNotificationsAsync} from "./functions/DmtNotification";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: (
            <Image source={require('../assets/icons/login_black.png')} style={{width: 24, height: 24}}/>
        )
    };

    componentDidMount() {
        this.setUser()
    }

    setUser = async () => {
        const user = {
            id: 1,
            fname: "Tenusha",
            lname: "Guruge",
            email: "tenusha@gmail.com"
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
                        this.props.navigation.navigate("Reload")
                    }}
                    title='go back'/>
                <Button
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0,
                        backgroundColor: '#ff0000'
                    }}
                    onPress={() => {
                        registerForPushNotificationsAsync().catch(err => {
                            ToastAndroid.showWithGravityAndOffset(
                                'notification server error!',
                                ToastAndroid.SHORT,
                                ToastAndroid.BOTTOM,
                                25,
                                100,
                            );
                        })
                        this.props.navigation.navigate("Reload")
                    }}
                    title='login'/>
            </>
        );
    }
}