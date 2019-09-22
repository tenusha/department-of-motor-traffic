import React from 'react';
import {Image, StyleSheet, View, AsyncStorage, ScrollView, ToastAndroid, KeyboardAvoidingView, Text} from 'react-native';
import MaterialButtonPrimary1 from "./login_symbols/MaterialButtonPrimary1";
import MaterialButtonViolet from "./login_symbols/MaterialButtonViolet";
import MaterialCheckboxWithLabel1 from "./login_symbols/MaterialCheckboxWithLabel1";
import MaterialButtonWithVioletText1 from "./login_symbols/MaterialButtonWithVioletText1";
import LoginTextBox from "./login_symbols/LoginTextBox";
import LoginHeader from "./login_symbols/LoginHeader";
import {registerForPushNotificationsAsync} from "./functions/DmtNotification";
import {loginUser} from "./functions/Services";
import configs from "../config";
import {SocialIcon} from "react-native-elements";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: (
            <Image source={require('../assets/icons/login_black.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        email: '',
        password: '',
        remember: false
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        // TODO
        if (this.state.email && this.state.password) {
            const userObj = {
                email: this.state.email,
                password: this.state.password
            };

            await loginUser(userObj).then(async data => {
                if (data) {
                    let user = data;
                    await AsyncStorage.setItem("dmt_user", JSON.stringify(user))

                    // enable notification
                    registerForPushNotificationsAsync().catch(err => {
                        ToastAndroid.showWithGravityAndOffset(
                            'notification server error!',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            100,
                        );
                    })
                    this.props.navigation.navigate("UserApp")
                } else {
                    ToastAndroid.showWithGravityAndOffset(
                        'Invalid email or password !',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        100,
                    );
                }
            }).catch(err => {
                ToastAndroid.showWithGravityAndOffset(
                    'Invalid email or password !',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    100,
                );
            });

        } else {
            ToastAndroid.showWithGravityAndOffset(
                'Please fill required fields!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        }
    }

    handleSignUp = async () => {
        this.props.navigation.navigate("SignIn")
    }

    handleToggle = () => {
        this.setState({remember: !this.state.remember})
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <KeyboardAvoidingView style={{flex: 5, alignItems: 'center', justifyContent: 'center'}} behavior="padding"
                                  enabled>
                <LoginHeader navigation={this.props.navigation}/>
                <ScrollView style={styles.root}>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                        <View style={{width: 150, height: 150, backgroundColor: configs.theme, borderRadius: 10}}>
                            <Image source={require('../assets/icons/login_logo.png')}
                                   style={{width: 150, height: 150}}/>
                        </View>
                    </View>

                    <SocialIcon
                        title='Sign In With Facebook'
                        button
                        type='facebook'
                        style={{...styles.socialIcons, marginTop: 20}}
                    />
                    <SocialIcon
                        title='Sign In With Google'
                        button
                        type='google'
                        light
                        style={styles.socialIcons}
                    />
                    <Or/>

                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/username.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Email'}
                                      value={this.state.email}
                                      handleChange={(value) => this.handleChange('email', value)}/>
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/password.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Password'}
                                      value={this.state.password}
                                      type={'password'}
                                      handleChange={(value) => this.handleChange('password', value)}/>
                    </View>
                    <MaterialCheckboxWithLabel1 style={styles.materialCheckboxWithLabel1} label={"Remember me"}
                                                checked={this.state.remember} handleToggle={this.handleToggle}/>
                    <MaterialButtonPrimary1 title={'Login'} style={styles.materialButtonPrimary1}
                                            handleSubmit={this.handleSubmit}/>
                    <MaterialButtonViolet title={'Sign Up'} style={styles.materialButtonViolet}
                                          handleClick={this.handleSignUp}/>

                    <MaterialButtonWithVioletText1
                        style={{...styles.materialButtonWithVioletText1, marginBottom: 20}}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        );
    }
}

function Or() {
    return (
        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
            <View
                style={{
                    flex: 1, alignSelf: 'stretch',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginLeft: 20
                }}
            />
            <View
                style={{
                    width: 20,
                    marginLeft: 15,
                    marginRight: 15
                }}
            >
                <Text style={{
                    textAlign: "center",
                    color: 'grey',
                    fontSize: 16,
                    marginTop: 20
                }}>or</Text>
            </View>
            <View
                style={{
                    flex: 1, alignSelf: 'stretch',
                    borderBottomColor: 'grey',
                    borderBottomWidth: 1,
                    marginRight: 20
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "rgb(255,255,255)"
    },
    materialFixedLabelTextbox: {
        margin: 10,
        height: 50,
        width: "80%"
    },
    materialButtonPrimary1: {
        height: 40,
        opacity: 1,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10
    },
    materialButtonViolet: {
        height: 40,
        marginLeft: 20,
        marginRight: 20
    },
    materialCheckboxWithLabel1: {
        margin: 20,
        height: 40,
    },
    materialButtonWithVioletText1: {
        marginTop: 20,
        height: 36,
    },
    socialIcons: {
        height: 36,
        marginLeft: 20,
        marginRight: 20
    }
});