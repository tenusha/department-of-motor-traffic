import React from 'react';
import {ScrollView, View, Text, StyleSheet, ToastAndroid, KeyboardAvoidingView, Dimensions} from 'react-native';
import {Header, Icon, Button, Card} from "react-native-elements"
import CustomTextField from "./commons/CustomTextField";
import {formatCardNumber, formatExpiryDate} from "./functions/UitilityFunctions"
import configs from "../config";


export default class PaymentGateway extends React.Component {
    static navigationOptions = {
        title: 'PaymentGateway'
    };

    state = {
        cardNo: '',
        cvvNo: '',
        expDate: '',
        textColor: '#2089dc'
    };

    handleChange = (name, value) => {

        if (name === 'expDate') {
            if (value.length <= 2) {
                value = value.replace(/\D/g, '');
            } else if (value.length > 3) {
                let temp = value.substring(3).replace(/\D/g, '');
                value = value.substring(0, 3) + temp;
            }
        } else {
            value = value.replace(/\D/g, '');
        }

        if (name === 'cardNo') {
            if (value.length <= 16) {
                let tempValue = formatCardNumber(value);
                this.setState({[name]: tempValue})
            }
        } else if (name === 'expDate') {
            if (value.length <= 5) {
                let tempValue = formatExpiryDate(value);
                this.setState({[name]: tempValue});
            }
        } else if (name === 'cvvNo') {
            if (value.length <= 3) {
                this.setState({[name]: value});
            }
        } else {
            this.setState({[name]: value})
        }
    };

    handleSubmit = () => {
        if (this.state.cardNo === '' || this.state.expDate === '' || this.state.cvvNo === '') {
            ToastAndroid.showWithGravityAndOffset(
                'Please fill all the respective fields!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        } else {
            this.props.navigation.navigate("Home")
        }
    };


    render() {
        const {navigation} = this.props;
        const {navigate} = this.props.navigation;
        const name = navigation.getParam("name", "No Name");
        const licenseNumber = navigation.getParam("licenseNumber", "No licenseNumber");
        const ref = navigation.getParam("ref", "No Reference");
        const vno = navigation.getParam("vno", "No Vehicle Number");
        const amount = navigation.getParam("amount", "No Amount");

        return (
            <KeyboardAvoidingView style={{flex: 5, alignItems: 'center', justifyContent: 'center'}} behavior="padding"
                                  enabled>
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
                        centerComponent={{
                            text: 'PAYMENT', style: {color: 'black', fontWeight: "bold"}
                        }}
                    />
                    <Card>
                        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Name </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{fontWeight: "bold"}}>: {name}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License Number </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{fontWeight: "bold"}}>: {licenseNumber}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Reference ID </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text style={{fontWeight: "bold"}}>: {ref}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Number </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{fontWeight: "bold"}}>: {vno}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Amount </Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text style={{fontWeight: "bold"}}>: {amount}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 10}}>
                                <CustomTextField style={styles.materialMessageTextbox}
                                                 keyboardType={'numeric'}
                                                 placeholder={'XXXX-XXXX-XXXX-XXXX'}
                                                 label={'Card Number :'}
                                                 maxLength={16}
                                                 value={this.state.cardNo}
                                                 handleChange={(value) => this.handleChange('cardNo', value)}/>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 5, flexDirection: 'column'}}>
                                    <CustomTextField style={styles.materialMessageTextbox}
                                                     placeholder={'12/23'}
                                                     label={'Exp Date :'}
                                                     value={this.state.expDate}
                                                     handleChange={(value) => this.handleChange('expDate', value)}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                </View>

                                <View style={{flex: 5, flexDirection: 'column'}}>
                                    <CustomTextField style={styles.materialMessageTextbox}
                                                     placeholder={'123'}
                                                     label={'CCV :'}
                                                     value={this.state.cvvNo}
                                                     handleChange={(value) => this.handleChange('cvvNo', value)}/>
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
                            onPress={this.handleSubmit}
                            title='CONFIRM PAYMENT'/>
                    </Card>

                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                    </View>

                </ScrollView>
            </KeyboardAvoidingView>
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

