import React from 'react';
import {Button, Header, Icon} from "react-native-elements";
import {AsyncStorage, Image} from "react-native";

export default class AppHeader extends React.Component {

    render() {
        return (
            <Header
                leftComponent={<Button
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

