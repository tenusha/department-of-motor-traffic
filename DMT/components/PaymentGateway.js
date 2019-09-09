import React from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import AppHeader from "./commons/AppHeader";
import {Button, Card} from "react-native-elements";
import CustomTextField from "./commons/CustomTextField";


export default class PaymentGateway extends React.Component {
    static navigationOptions = {
        title: 'PaymentGateway'
    };

    state = {
        ownerName: '',
        licenceNo: '',
        referenceId: '',
        vehicleNo: '',
        amount: '',
        cardNo: '',
        cvvNo: '',
        expDate: '',
        textColor: '#2089dc'
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Payment Gateway'}/>
                <ScrollView>
                    <Card>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Name </Text></View>
                                <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                                }}><Text
                                    style={{fontWeight: "bold"}}>: {this.state.name}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License Number </Text></View>
                                <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                                }}><Text
                                    style={{fontWeight: "bold"}}>: {this.state.licenceNo}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Reference ID </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text style={{fontWeight: "bold"}}>: {this.state.referenceId}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Number </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{fontWeight: "bold"}}>: {this.state.vehicleNo}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Amount </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text style={{fontWeight: "bold"}}>: {this.state.amount}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 10}}>
                                <CustomTextField style={styles.materialMessageTextbox}
                                             placeholder={'XXXX-XXXX-XXXX-XXXX'}
                                             label={'Card Number :'}
                                             value={this.state.cardNo}/>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 5, flexDirection: 'column'}}>
                                    <CustomTextField style={styles.materialMessageTextbox}
                                                 placeholder={'12/23'}
                                                 label={'Expiration Date :'}
                                                 value={this.state.cardNo}/>
                                </View>
                                <View style={{flex: 1}}>
                                </View>

                                <View style={{flex: 5, flexDirection: 'column'}}>
                                    <CustomTextField style={styles.materialMessageTextbox}
                                                 placeholder={'123'}
                                                 label={'CCV :'}
                                                 value={this.state.cardNo}/>
                                </View>
                            </View>
                        </View>
                        <Button
                            buttonStyle={{
                                backgroundColor: '#15B867',
                                borderRadius: 15,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                borderWidth: 0
                            }}
                            title='CONFIRM PAYMENT'/>
                    </Card>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    materialMessageTextbox: {
        padding: 10,
        width: "100%",
        height: 100,
    },
    materialButtonPrimary: {
        width: 150,
        height: 36,
        margin: 10
    }
});
