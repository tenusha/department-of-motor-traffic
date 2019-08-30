import React from 'react'
import {Button, Header} from "react-native-elements"
import { Image} from "react-native"
import configs from "../../config"

export default class AppHeader extends React.Component {

    render() {
        return (
            <Header
                containerStyle={{
                    backgroundColor: configs.theme
                }}
                leftComponent={<Button
                    type="clear"
                    icon={<Image source={require('../../assets/icons/left_arrow.png')} style={{width: 24, height: 24}}/>}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    onPress={() => this.props.navigation.navigate("Home")}/>}
            />
        );
    }
}

