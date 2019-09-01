import React from 'react';
import {ScrollView, View, Text} from 'react-native';
import AppHeader from "./commons/AppHeader";


export default class PaymentGateway extends React.Component {
    static navigationOptions = {
        title: 'PaymentGateway'
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Payment Gateway'}/>
                <ScrollView>
                    <View>
                        <Text>Payment Gateway</Text>
                    </View>
                </ScrollView>
            </>
        );
    }
}
