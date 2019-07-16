import React from 'react';
import {AsyncStorage, Image, ToastAndroid} from 'react-native';
import LoadingScreen from "../commons/LoadingScreen";

export default class Login extends React.Component {


    state = {
        loading: false
    }

    componentDidMount() {
        this.navigateToLogin()
    }

    handleModalClose = () => {
        this.setState({loading: false})
        this.props.navigation.navigate("LoginScreen")
    }

    navigateToLogin = async () => {
        this.setState({loading: true})
        //await AsyncStorage.removeItem("dmt_user")
        this.setState({loading: false})
        this.props.navigation.navigate("LoginScreen")
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <LoadingScreen loading={this.state.loading} handleClose={this.handleModalClose}/>
        );
    }
}