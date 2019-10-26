import React from 'react';
import {Image, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import AppHeader from "./commons/AppHeader";
import {Card} from "react-native-elements";
import CustomButton from "./commons/CustomButton"
import CustomTextField from "./commons/CustomTextField"
import LoadingScreen from "./commons/LoadingScreen"
import {getRevenueLicenseDetails} from "./functions/Services"

export default class RevenueLicense extends React.Component {
    static navigationOptions = {
        title: 'Revenue License Status',
        drawerIcon: (
            <Image source={require('../assets/icons/revenue_license.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        vehicle: 'Vehicle Number',
        vehicleNo: '',
        License_Issued_Date: '',
        Vehicle_Reg_No: '',
        License_Expiry_Date: '',
        License_No: '',
        loading: false
    }

    handleModalClose = () => {
        this.setState({loading: false})
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        if (this.state.vehicleNo && !this.props.loading) {
            this.setState({loading: true})
            await getRevenueLicenseDetails(this.state.vehicleNo)
                .then(data => {
                    this.setState({...data})
                }).catch(err => {
                    ToastAndroid.showWithGravityAndOffset(
                        'server error!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        100,
                    );
                })
            this.setState({loading: false, vehicleNo: ''})
        } else {
            ToastAndroid.showWithGravityAndOffset(
                'please add a valid vehicle number!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const data = this.state.License_Expiry_Date ?
            <View>
                <View
                    style={{
                        borderBottomColor: '#D3D3D3',
                        borderBottomWidth: 1,
                        margin: 10,
                        marginTop: 30,
                        marginBottom: 30
                    }}
                />
                <Card
                    title={"Vehicle Number : " + this.state.vehicle}
                    titleStyle={{fontSize: 18}}>
                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Reg No </Text></View>
                        <View style={{
                            flex: 1,
                            alignSelf: 'stretch'
                        }}><Text
                            style={{
                                fontWeight: "bold"
                            }}>: {this.state.Vehicle_Reg_No}</Text></View>
                    </View>
                    <Text/>
                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License No </Text></View>
                        <View style={{
                            flex: 1,
                            alignSelf: 'stretch'
                        }}><Text
                            style={{
                                fontWeight: "bold"
                            }}>: {this.state.License_No}</Text></View>
                    </View>
                    <Text/>
                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License Issued Date </Text></View>
                        <View style={{
                            flex: 1,
                            alignSelf: 'stretch'
                        }}><Text
                            style={{
                                fontWeight: "bold"
                            }}>: {this.state.License_Issued_Date}</Text></View>
                    </View>
                    <Text/>
                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                        <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License Expiry Date </Text></View>
                        <View style={{
                            flex: 1,
                            alignSelf: 'stretch'
                        }}><Text
                            style={{
                                fontWeight: "bold"
                            }}>: {this.state.License_Expiry_Date}</Text></View>
                    </View>
                </Card>
            </View> : null

        return (
            <View>
                <AppHeader {...this.props} title={'Revenue License'}/>
                <CustomTextField style={styles.materialMessageTextbox}
                                 placeholder={'e.g: KA-1010, 15-3456'}
                                 label={'Vehicle Number :'}
                                 value={this.state.vehicleNo}
                                 handleChange={(value) => this.handleChange('vehicleNo', value)}/>
                <View style={{alignItems: 'flex-end'}}>
                    <CustomButton style={styles.materialButtonPrimary} title={'Get Status'}
                                  handleClick={this.handleSubmit}/>
                </View>
                {data}
                <LoadingScreen loading={this.state.loading} handleClose={this.handleModalClose}/>
            </View>
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
        width: 130,
        height: 36,
        margin: 10
    }
});
