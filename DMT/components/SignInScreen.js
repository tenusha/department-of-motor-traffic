import React from 'react';
import {Image, StyleSheet, View, ScrollView, TouchableHighlight, ToastAndroid} from 'react-native';
import MaterialButtonPrimary1 from "./login_symbols/MaterialButtonPrimary1";
import MaterialButtonViolet from "./login_symbols/MaterialButtonViolet";
import MaterialCheckboxWithLabel1 from "./login_symbols/MaterialCheckboxWithLabel1";
import LoginTextBox from "./login_symbols/LoginTextBox";
import LoginHeader from "./login_symbols/LoginHeader";
import configs from "../config";

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'Login',
        drawerIcon: (
            <Image source={require('../assets/icons/login_black.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        username: '',
        password: '',
        rpassword: '',
        license: '',
        remember: false
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        this.props.navigation.navigate("Login")
        ToastAndroid.showWithGravityAndOffset(
            'Registration successful! please login...',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            100,
        );
    }

    handleLogin = async () => {
        this.props.navigation.navigate("Login")
    }

    handleToggle = () => {
        this.setState({remember: !this.state.remember})
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView style={styles.root}>
                <LoginHeader navigation={this.props.navigation}/>
                <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                    <TouchableHighlight
                        style={styles.profileImgContainer}
                    >
                        <Image source={require('../assets/icons/user_reg.png')} style={styles.profileImg}/>
                    </TouchableHighlight>
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <Image source={require('../assets/icons/revenue_license.png')}
                           style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                    <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'driving license number'}
                                  value={this.state.license}
                                  handleChange={(value) => this.handleChange('license', value)}/>
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <Image source={require('../assets/icons/username.png')}
                           style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                    <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'username'}
                                  value={this.state.username}
                                  handleChange={(value) => this.handleChange('username', value)}/>
                </View>
                <View style={{flexDirection: "row", width: "100%"}}>
                    <Image source={require('../assets/icons/password.png')}
                           style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                    <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'password'}
                                  value={this.state.password}
                                  type={'password'}
                                  handleChange={(value) => this.handleChange('password', value)}/>
                </View>
                <View style={{flexDirection: "row", width: "100%", marginBottom:20}}>
                    <Image source={require('../assets/icons/password.png')}
                           style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                    <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'re-enter password'}
                                  value={this.state.rpassword}
                                  type={'password'}
                                  handleChange={(value) => this.handleChange('rpassword', value)}/>
                </View>
                <MaterialButtonPrimary1 title={'Register'} style={styles.materialButtonPrimary1} handleSubmit={this.handleSubmit}/>
                <MaterialButtonViolet title={'Login'} style={styles.materialButtonViolet} handleClick={this.handleLogin}/>
                <View style={{marginBottom:20}}/>
            </ScrollView>
        );
    }
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
        marginLeft: 15,
        marginRight: 15,
        marginBottom: 10
    },
    materialButtonViolet: {
        height: 40,
        marginLeft: 15,
        marginRight: 15
    },
    materialCheckboxWithLabel1: {
        margin: 20,
        height: 40,
    },
    materialButtonWithVioletText1: {
        marginTop: 20,
        height: 36,
    },
    profileImgContainer: {
        height: 130,
        width: 130,
        borderRadius: 40,
    },
    profileImg: {
        height: 130,
        width: 130,
        borderRadius: 40,
    }
});