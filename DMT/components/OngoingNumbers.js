import React from 'react';
import {Image, Text} from 'react-native';
import AppHeader from "./commons/AppHeader";

export default class OngoingNumbers extends React.Component {
    static navigationOptions = {
        title: 'Ongoing Numbers',
        drawerIcon: (
            <Image source={require('../assets/icons/ongoing_numbers.png')} style={{width: 24, height: 24}}/>
        )
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Ongoing Numbers'}/>
                <Text>Ongoing Numbers</Text>
            </>
        );
    }
}