import React from 'react';
import {Modal, StyleSheet, Text, View} from 'react-native';
import {Section} from './commons/Section';
import {Input} from "./commons/Input";
import {formatCardNumber, formatExpiryDate} from './functions/UitilityFunctions';
import CustomButton from "./commons/CustomButton";
import {Card} from "react-native-elements";


export default class PaymentGateway extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            cardno    : null,
            pin       : null,
            cvv       : null,
            paymentAmount: null,
            expirydate: null
        }
    }

    _handleInputChange(key, value) {
        let formattedValue = null;

        switch(key) {
            case 'cardno':
                formattedValue = formatCardNumber(value);
                break;
            case 'expirydate':
                formattedValue = formatExpiryDate(value, this.state.expirydate);
                break;
            default:
                formattedValue = value;
                break;
        }

        this.setState({[key]: formattedValue});
    }

    // renderPinInput() {
    //     const { pin } = this.state;
    //     return (this.props.authModel === PIN)
    //         ? (
    //             <Section>
    //                 <Input
    //                     placeholder='PIN'
    //                     value={pin}
    //                     onChangeText={this._handleInputChange.bind(this, 'pin')}
    //                     maxLength={4}
    //                     secureTextEntry
    //                 />
    //             </Section>
    //         )
    //         : null
    // }

    render() {
        const { cardno, cvv, expirydate, paymentAmount } = this.state;
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.showPayment}
                onRequestClose={() => {
                    this.props.handlePaymentClose()
                }}>
                <View style={styles.modalBackground}>
                    <View >
                        <Section>
                            <Text style={{marginBottom: 25}}>Total amount due : <Text
                                style={{color: "rgb(0,102,102)"}}>{}</Text></Text>
                        </Section>
                        <Section>
                            <Input
                                placeholder='Card Number'
                                value={cardno}
                                onChangeText={this._handleInputChange.bind(this, 'cardno')}
                            />
                        </Section>
                        <Section>
                            <View style={styles.inputContainer}>
                                <Input
                                    placeholder='MM / YY'
                                    value={expirydate}
                                    onChangeText={this._handleInputChange.bind(this, 'expirydate')}
                                    maxLength={7}
                                />
                            </View>
                            <View style={[styles.inputContainer, styles.spacing]}>
                                <Input
                                    placeholder='CVV'
                                    value={cvv}
                                    onChangeText={this._handleInputChange.bind(this, 'cvv')}
                                    maxLength={3}
                                    secureTextEntry
                                />
                            </View>
                        </Section>
                        <Section>
                            <CustomButton style={styles.materialButtonPrimary} title={'Pay'}
                                          handleClick={ this.props.handlePaymentClose()}/>
                        </Section>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000080'
    },

    inputContainer: {
        flex: 1,
        height: 36
    },

    spacing: {
        marginLeft: 12
    },

    checkboxContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});