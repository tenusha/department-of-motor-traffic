import React from 'react';
import {Text} from 'react-native';
import AppHeader from "./commons/AppHeader";
import {Icon} from "react-native-elements";

export default class OngoingNumbers extends React.Component {
    static navigationOptions = {
        title: 'Ongoing Numbers',
        drawerIcon:(
            <Icon name='update'/>
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