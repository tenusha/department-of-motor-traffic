import React from 'react'
import {Button, Header, Icon} from "react-native-elements"
import {AsyncStorage, Image} from "react-native"
import configs from "../../config.json"

export default class AppHeader extends React.Component {

    state = {
        user: ''
    }

    componentDidMount() {
        AsyncStorage.getItem("dmt_user").then(user => {
            const userObj = JSON.parse(user)
            this.setState({user: userObj})
        })
    }

    render() {
        const userIcon = this.state.user ?
            <Image source={require('../../assets/icons/logged_user.png')} style={{width: 30, height: 30}}/> :
            <Image source={require('../../assets/icons/login.png')} style={{width: 30, height: 30}}/>
        const navigateTo = this.state.user ? "Home" : "Login"
        const centerComponent = this.props.title === 'DMT' ? <Button
            type="clear"
            icon={<Image source={require('../../assets/home_logo.png')} style={{width: 130, height: 45}}/>}
            buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0
            }}/> : {text: this.props.title, style: {color: '#fff', fontSize: 20}}
        return (
            <Header
                containerStyle={{
                    backgroundColor: configs.theme,
                    borderBottomColor: configs.theme
                }}
                leftComponent={<Button
                    type="clear"
                    icon={<Icon name='menu' color='#ffffff'/>}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    onPress={() => this.props.navigation.openDrawer()}/>}

                // centerComponent={{text: this.props.title, style: {color: '#fff', fontSize: 20}}}
                centerComponent={centerComponent}

                rightComponent={<Button
                    type="clear"
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

