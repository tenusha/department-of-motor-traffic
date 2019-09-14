import React from 'react';
import {ScrollView, View, Text} from 'react-native'
import {Header, Icon} from "react-native-elements"


export default class PaymentGateway extends React.Component {
    static navigationOptions = {
        title: 'PaymentGateway'
    };


    render() {
        const {navigate} = this.props.navigation;
        return (
            <View>
                <ScrollView>
                    <Header
                        containerStyle={{
                            backgroundColor: 'white',
                            borderBottomColor: 'white'
                        }}
                        leftComponent={<Icon
                            name={'arrow-back'}
                            color={'black'}
                            onPress={() => this.props.navigation.navigate("FineManagement")}
                        />}
                    />
                    <View style={{marginLeft: 20}}>
                        <Text>Payment Gateway</Text>
                    </View>
                </ScrollView>
            </View>
        );
    }
}
