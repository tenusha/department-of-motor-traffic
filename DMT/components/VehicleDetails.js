import React from 'react';
import {Image, Text} from 'react-native';
import AppHeader from "./commons/AppHeader";

export default class VehicleDetails extends React.Component {
    static navigationOptions = {
        title: 'Vehicle Details',
        drawerIcon: (
            <Image source={require('../assets/icons/vehicle_info.png')} style={{width: 24, height: 24}}/>
        )
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Vehicle Details'}/>
                <Text>Vehicle Details</Text>
            </>
        );
    }
}