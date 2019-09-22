import React from 'react';
import {
    Image,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    ToastAndroid,
    TouchableHighlight,
    View
} from 'react-native';
import MaterialButtonPrimary1 from "./login_symbols/MaterialButtonPrimary1";
import MaterialButtonViolet from "./login_symbols/MaterialButtonViolet";
import LoginTextBox from "./login_symbols/LoginTextBox";
import LoginHeader from "./login_symbols/LoginHeader";
import {Avatar} from "react-native-elements";
import {registerUser} from "./functions/Services";
import * as ImagePicker from 'expo-image-picker';

export default class LoginScreen extends React.Component {
    static navigationOptions = {
        title: 'SignIn'
    };

    state = {
        email: '',
        password: '',
        rpassword: '',
        license: '',
        firstName: '',
        lastName: '',
        image: null,
    }

    componentDidMount() {
        // this.getPermissionAsync().catch(err => console.log(err));
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        const data = this.state
        if (data.license && data.email && data.password && data.rpassword && data.firstName && data.lastName) {
            if (data.password === data.rpassword) {
                const profilePic = new FormData()
                profilePic.append('photo', {uri: this.state.image, name: this.state.image});
                const userObj = {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    password: data.password,
                    email: data.email,
                    license: data.license
                };
                await registerUser(userObj).then(async res => {
                    if (res && res.responseCode === '01') {
                        ToastAndroid.showWithGravityAndOffset(
                            res.reason,
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            100,
                        );
                    } else if (res) {
                        this.props.navigation.navigate("Login")
                        ToastAndroid.showWithGravityAndOffset(
                            'Registration successful! please login...',
                            ToastAndroid.SHORT,
                            ToastAndroid.BOTTOM,
                            25,
                            100,
                        );
                    } else {
                        ToastAndroid.showWithGravityAndOffset(
                            'Unable to register new user. please try again !',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            100,
                        );
                    }
                }).catch(err => {
                    ToastAndroid.showWithGravityAndOffset(
                        'Unable to register new user. please try again !',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        100,
                    );
                });
            } else {
                ToastAndroid.showWithGravityAndOffset(
                    'Password and confirm password does not match!',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    100,
                );
            }
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

    handleLogin = async () => {
        this.props.navigation.navigate("Login")
    }

    handleToggle = () => {
        this.setState({remember: !this.state.remember})
    }

    // getPermissionAsync = async () => {
    //     if (Constants.platform.ios) {
    //         const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    //         if (status !== 'granted') {
    //             alert('Sorry, we need camera roll permissions to make this work!');
    //         }
    //     }
    // }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({image: result.uri});
        }
    };

    render() {
        const {navigate} = this.props.navigation;
        const avatar = this.state.image ? <Avatar
            size={130}
            rounded
            overlayContainerStyle={{backgroundColor: 'white'}}
            source={{uri: this.state.image}}
            showEditButton
            onPress={this._pickImage}
        /> : <Avatar
            size={130}
            rounded
            overlayContainerStyle={{backgroundColor: 'white'}}
            source={require('../assets/icons/user_reg3.png')}
            showEditButton
            onPress={this._pickImage}/>
        return (
            <KeyboardAvoidingView style={{flex: 5, alignItems: 'center', justifyContent: 'center'}} behavior="padding"
                                  enabled>
                <ScrollView style={styles.root}>
                    <LoginHeader navigation={this.props.navigation}/>
                    <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 10}}>
                        {/*<TouchableHighlight*/}
                        {/*style={styles.profileImgContainer}*/}
                        {/*>*/}
                        {/*<Image source={require('../assets/icons/user_reg.png')} style={styles.profileImg} showEditButton/>*/}

                        {/*</TouchableHighlight>*/}
                        {avatar}
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/firstName.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'First Name'}
                                      value={this.state.firstName}
                                      handleChange={(value) => this.handleChange('firstName', value)}/>
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/firstName.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Last Name'}
                                      value={this.state.lastName}
                                      handleChange={(value) => this.handleChange('lastName', value)}/>
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/revenue_license.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Driving license number'}
                                      value={this.state.license}
                                      handleChange={(value) => this.handleChange('license', value)}/>
                    </View>
                    <View style={{flexDirection: "row", width: "100%"}}>
                        <Image source={require('../assets/icons/email.png')}
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
                    <View style={{flexDirection: "row", width: "100%", marginBottom: 20}}>
                        <Image source={require('../assets/icons/password.png')}
                               style={{width: 24, height: 24, marginTop: 30, marginLeft: 20}}/>
                        <LoginTextBox style={styles.materialFixedLabelTextbox} placeholder={'Re-enter password'}
                                      value={this.state.rpassword}
                                      type={'password'}
                                      handleChange={(value) => this.handleChange('rpassword', value)}/>
                    </View>
                    <MaterialButtonPrimary1 title={'Register'} style={styles.materialButtonPrimary1}
                                            handleSubmit={this.handleSubmit}/>
                    <MaterialButtonViolet title={'Login'} style={styles.materialButtonViolet}
                                          handleClick={this.handleLogin}/>
                    <View style={{marginBottom: 20}}/>
                </ScrollView>
            </KeyboardAvoidingView>
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