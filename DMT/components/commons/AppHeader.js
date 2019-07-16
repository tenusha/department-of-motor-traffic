import React from 'react';
import {Button, Header, Icon} from "react-native-elements";
import {AsyncStorage, Image} from "react-native";

export default class AppHeader extends React.Component {

    state = {
        user: ''
    }

    componentDidMount() {
        AsyncStorage.getItem("dmt_user").then(user => {
            this.setState({user})
        })
    }

    render() {
        const userIcon = this.state.user ?
            <Image source={require('../../assets/icons/logged_user.png')} style={{width: 30, height: 30}}/> :
            <Image source={require('../../assets/icons/login.png')} style={{width: 30, height: 30}}/>
        const navigateTo = this.state.user ? "Home" : "Login"
        return (
            <Header
                leftComponent={<Button
                    icon={<Icon name='menu' color='#ffffff'/>}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    onPress={() => this.props.navigation.openDrawer()}/>}

                centerComponent={{text: this.props.title, style: {color: '#fff', fontSize: 20}}}

                rightComponent={<Button
                    icon={userIcon}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    onPress={() => this.props.navigation.navigate(navigateTo)}/>
                }

            />
        );
    }
}

