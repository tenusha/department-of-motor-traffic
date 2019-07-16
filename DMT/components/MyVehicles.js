import React from 'react';
import {AsyncStorage, Image, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Button, Card} from "react-native-elements"
import AppHeader from "./commons/AppHeader";
import {getRevenueLicenseDetails, getUserVehicles, removeUserVehicle} from "./functions/Services";
import LoadingScreen from "./commons/LoadingScreen";
import AddVehicle from "./sections/AddVehicle";

export default class MyVehicles extends React.Component {
    static navigationOptions = {
        title: 'My Vehicles',
        drawerIcon: (
            <Image source={require('../assets/icons/my_vehicle.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        loading: false,
        showAddVehicle: false,
        user: '',
        vehicles: [],
        displayVehicles: []
    }

    componentDidMount() {
        AsyncStorage.getItem("dmt_user").then(user => {
            const userObj = JSON.parse(user)
            this.setState({user: userObj}, () => this.updateData())
        })
    }

    handleModalClose = () => {
        this.setState({loading: false, showAddVehicle: false})
    }

    handleSubmit = async () => {
    }

    updateData = async () => {
        this.setState({loading: true})
        await getUserVehicles(this.state.user.id)
            .then(data => {
                this.setState({vehicles: data})
            }).catch(err => {
                ToastAndroid.showWithGravityAndOffset(
                    'server error!',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    100,
                );
            })
        this.setState({loading: false}, () => this.getVehicleData())
    }

    getVehicleData = () => {
        if (this.state.vehicles) {
            this.setState({displayVehicles: []}, () => {
                this.state.vehicles.map((vehicleNo, i) => {
                    getRevenueLicenseDetails(vehicleNo).then(data => {
                        this.setState({displayVehicles: [...this.state.displayVehicles, data]})
                    }).catch(err => {
                        ToastAndroid.showWithGravityAndOffset(
                            'server error!',
                            ToastAndroid.LONG,
                            ToastAndroid.BOTTOM,
                            25,
                            100,
                        );
                    })
                })
            })
        }
    }

    removeVehicle = async no => {
        this.setState({loading: true})
        await removeUserVehicle(this.state.user.id, no).then(data => {
            ToastAndroid.showWithGravityAndOffset(
                'vehicle removed!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
            this.updateData()
        }).catch(err => {
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

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <AppHeader {...this.props} title={'My Vehicles'}/>
                <Button
                    title="Add new vehicle"
                    type="outline"
                    onPress={() => this.setState({showAddVehicle: true})}
                    containerStyle={{width: 150, height: 36, marginTop: 20, marginLeft: 200}}
                />
                <View
                    style={{
                        borderBottomColor: '#D3D3D3',
                        borderBottomWidth: 1,
                        margin: 10,
                        marginTop: 25
                    }}
                />

                {this.state.displayVehicles.length > 0 && this.state.displayVehicles.map((vehicle, i) => {
                    return <Card
                        key={i}
                        title={"Vehicle Number : " + vehicle.vehicle}
                        titleStyle={{fontSize: 18}}>
                        <Text style={{marginBottom: 25}}>License Issued Date : <Text
                            style={{color: "rgb(0,102,102)"}}>{vehicle.License_Issued_Date}</Text></Text>
                        <Text style={{marginBottom: 25}}>Vehicle Reg No : <Text
                            style={{color: "rgb(0,102,102)"}}>{vehicle.Vehicle_Reg_No}</Text></Text>
                        <Text style={{marginBottom: 25}}>License Expiry Date : <Text
                            style={{color: "rgb(0,102,102)"}}>{vehicle.License_Expiry_Date}</Text></Text>
                        <Text style={{marginBottom: 25}}>License No : <Text
                            style={{color: "rgb(0,102,102)"}}>{vehicle.License_No}</Text></Text>
                        <Button
                            title="Remove vehicle"
                            type="outline"
                            onPress={() => this.removeVehicle(vehicle.vehicle)}
                            buttonStyle={{borderColor: 'red'}}
                            titleStyle={{color: 'red'}}
                            containerStyle={{width: 140, height: 36, marginLeft: 160}}
                        />
                    </Card>
                })}
                {this.state.displayVehicles.length == 0 &&
                <Card>
                    <Text style={{marginBottom: 25}}>You don't have any vehicles yet. Please add a vehicle.</Text>
                </Card>
                }
                <View style={{paddingTop: 30}}/>
                <AddVehicle handleSubmit={this.handleSubmit} showAddVehicle={this.state.showAddVehicle}
                            handleClose={this.handleModalClose}/>
                <LoadingScreen loading={this.state.loading} handleClose={this.handleModalClose}/>
            </ScrollView>
        );
    }
}