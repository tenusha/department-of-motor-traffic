import React from 'react';
import {Text} from 'react-native';
import AppHeader from "./commons/AppHeader";
import {Icon} from "react-native-elements";

export default class VehicleDetails extends React.Component {
    static navigationOptions = {
        title: 'Vehicle Details',
        drawerIcon:(
            <Icon name='info'/>
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