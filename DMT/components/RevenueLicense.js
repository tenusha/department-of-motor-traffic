import React from 'react';
import {View, StyleSheet, Text, ToastAndroid} from 'react-native';
import AppHeader from "./commons/AppHeader";
import {Button, Card, Icon, Input} from "react-native-elements";
import CustomButton from "./commons/CustomButton"
import CustomTextField from "./commons/CustomTextField"
import LoadingScreen from "./commons/LoadingScreen"
import {getRevenueLicenseDetails} from "./functions/Services"

export default class RevenueLicense extends React.Component {
    static navigationOptions = {
        title: 'Revenue License Status',
        drawerIcon: (
            <Icon name='event'/>
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
                    this.setState({loading: false})
                    console.log(err)
                    ToastAndroid.showWithGravityAndOffset(
                        'server error!',
                        ToastAndroid.LONG,
                        ToastAndroid.BOTTOM,
                        25,
                        100,
                    );
                })
            this.setState({loading: false})
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const data = this.state.License_Expiry_Date ?
            <>
                <View
                    style={{
                        borderBottomColor: '#D3D3D3',
                        borderBottomWidth: 1,
                        top: 210,
                        margin: 10
                    }}
                />
                <Card
                    containerStyle={{top: 220}}
                    title={"Vehicle Number : " + this.state.vehicle}
                    titleStyle={{fontSize: 18}}>
                    <Text style={{marginBottom: 25}}>License Issued Date : <Text
                        style={{color: "rgb(0,102,102)"}}>{this.state.License_Issued_Date}</Text></Text>
                    <Text style={{marginBottom: 25}}>Vehicle Reg No : <Text
                        style={{color: "rgb(0,102,102)"}}>{this.state.Vehicle_Reg_No}</Text></Text>
                    <Text style={{marginBottom: 25}}>License Expiry Date : <Text
                        style={{color: "rgb(0,102,102)"}}>{this.state.License_Expiry_Date}</Text></Text>
                    <Text style={{marginBottom: 25}}>License No : <Text
                        style={{color: "rgb(0,102,102)"}}>{this.state.License_No}</Text></Text>
                </Card>
            </> : null

        return (
            <View>
                <AppHeader {...this.props} title={'Revenue License'}/>
                <CustomTextField style={styles.materialMessageTextbox}
                                 placeholder={'e.g: KA-1010, 15-3456'}
                                 label={'Vehicle Number :'}
                                 handleChange={(value) => this.handleChange('vehicleNo', value)}/>
                <CustomButton style={styles.materialButtonPrimary} title={'Get Status'}
                              handleClick={this.handleSubmit}/>
                {data}
                <LoadingScreen loading={this.state.loading} handleClose={this.handleModalClose}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    materialMessageTextbox: {
        top: 90,
        left: 12.58,
        width: 340,
        height: 90,
        position: "absolute"
    },
    materialButtonPrimary: {
        top: 220,
        left: 220,
        width: 130,
        height: 36,
        position: "absolute"
    }
});
