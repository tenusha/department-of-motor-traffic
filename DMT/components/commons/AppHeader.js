import React from 'react';
import {Button, Header, Icon} from "react-native-elements";

export default class AppHeader extends React.Component {

    render() {
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
                    icon={<Icon name='person' color='#ffffff'/>}
                    buttonStyle={{
                        borderRadius: 0,
                        marginLeft: 0,
                        marginRight: 0,
                        marginBottom: 0
                    }}
                    onPress={() => this.props.navigation.navigate("LoginScreen")}/>
                }

            />
        );
    }
}

