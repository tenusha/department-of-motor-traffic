import React from 'react';
import {AsyncStorage, Image, ToastAndroid} from 'react-native';
import LoadingScreen from "../commons/LoadingScreen";

export default class Logout extends React.Component {
    static navigationOptions = {
        title: 'Logout',
        drawerIcon: (
            <Image source={require('../../assets/icons/logout.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        loading: false
    }

    componentDidMount() {
        this.clearUser()
    }

    handleModalClose = () => {
        this.setState({loading: false})
        this.props.navigation.navigate("Reload")
    }

    clearUser = async () => {
        this.setState({loading: true})
        await AsyncStorage.removeItem("dmt_user")
        this.setState({loading: false})
        this.props.navigation.navigate("Reload")
        ToastAndroid.showWithGravityAndOffset(
            'successfully logout!',
            ToastAndroid.SHORT,
            ToastAndroid.BOTTOM,
            25,
            100,
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <LoadingScreen loading={this.state.loading} handleClose={this.handleModalClose}/>
        );
    }
}