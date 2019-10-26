import React from 'react';
import {Alert, AsyncStorage, Image, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import {Button, Card, Icon} from "react-native-elements"
import AppHeader from "./commons/AppHeader";
import {addUserVehicle, getUserVehicleDetails, getUserVehicles, removeUserVehicle} from "./functions/Services";
import LoadingScreen from "./commons/LoadingScreen";
import CustomTextField from "./commons/CustomTextField"
import CustomButton from "./commons/CustomButton"
import configs from '../config.json'

export default class MyVehicles extends React.Component {
    static navigationOptions = {
        title: 'My Vehicles',
        drawerIcon: (
            <Image source={require('../assets/icons/my_vehicle.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        loading: false,
        user: '',
        vehicles: [],
        displayVehicles: [],
        vehicleNo: '',
        textColor: '#2089dc'
    }

    componentDidMount() {
        AsyncStorage.getItem("dmt_user").then(user => {
            const userObj = JSON.parse(user)
            this.setState({user: userObj}, () => this.updateData())
        })
    }

    handleModalClose = () => {
        this.setState({loading: false})
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleSubmit = async () => {
        this.setState({loading: true})
        if (this.state.vehicleNo) {
            await addUserVehicle(this.state.user.id, {vehicle: this.state.vehicleNo}).then(data => {
                ToastAndroid.showWithGravityAndOffset(
                    'new vehicle added!',
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
        } else {
            ToastAndroid.showWithGravityAndOffset(
                'please add a valid vehicle number!',
                ToastAndroid.SHORT,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        }
        this.setState({vehicleNo: '', loading: false})
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
                    getUserVehicleDetails(vehicleNo).then(data => {
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
        const alertMsg = "Vehicle " + no + " will be removed from your account"
        Alert.alert(
            'Remove Vehicle',
            alertMsg,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'OK', onPress: async () => {
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
                },
            ],
            {cancelable: false},
        );
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'My Vehicles'}/>
                <ScrollView>
                    <CustomTextField style={styles.materialMessageTextbox}
                                     placeholder={'e.g: KA-1010, 15-3456'}
                                     label={'Vehicle Number :'}
                                     value={this.state.vehicleNo}
                                     handleChange={(value) => this.handleChange('vehicleNo', value)}/>
                    <View style={{alignItems: 'flex-end'}}>
                        <CustomButton style={styles.materialButtonPrimary} title={'Add new vehicle'}
                                      handleClick={this.handleSubmit}/>
                        {/*<Button*/}
                        {/*title="Add new vehicle"*/}
                        {/*onPress={this.handleSubmit}*/}
                        {/*containerStyle={{width: 150, height: 36, marginTop: 20, marginRight: 10}}*/}
                        {/*buttonStyle={{borderColor: configs.buttonCol}}*/}
                        {/*/>*/}
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#D3D3D3',
                            borderBottomWidth: 1,
                            margin: 10,
                            marginTop: 25
                        }}
                    />
                    <View style={{alignItems: 'flex-end', marginRight: 15}}>
                        <Icon
                            name='refresh'
                            color={configs.buttonCol}
                            onPress={this.updateData}
                        />
                    </View>

                    {this.state.displayVehicles.length > 0 && this.state.displayVehicles.map((vehicle, i) => {
                        const barColor = this.getBarColor(vehicle.fines)
                        return <Card
                            key={i}>
                            <Text style={{fontSize: 18, textAlign: 'center', fontWeight: "bold"}}>Vehicle Number
                                : {vehicle.vehicle}</Text>
                            <View
                                style={{
                                    height: 5,
                                    backgroundColor: barColor,
                                    marginTop: 10,
                                    marginBottom: 15
                                }}
                            />
                            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Reg No </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text style={{fontWeight: "bold"}}>: {vehicle.Vehicle_Reg_No}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Make and Model </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text style={{fontWeight: "bold"}}>: {vehicle.make_and_model}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Model Year </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text
                                        style={{fontWeight: "bold"}}>: {vehicle.model_year}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Body Type </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text
                                        style={{fontWeight: "bold"}}>: {vehicle.body_type}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License No </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text
                                        style={{fontWeight: "bold"}}>: {vehicle.License_No}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License Issued
                                        Date </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text
                                        style={{fontWeight: "bold"}}>: {vehicle.License_Issued_Date}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>License Expiry
                                        Date </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text
                                        style={{fontWeight: "bold"}}>: {vehicle.License_Expiry_Date}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                    <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fines this week </Text></View>
                                    <View style={{
                                        flex: 1,
                                        alignSelf: 'stretch'
                                    }}><Text style={{fontWeight: "bold"}}>: {vehicle.fines}</Text></View>
                                </View>
                                <View style={{flex: 1, alignSelf: 'flex-end'}}>
                                    <Button
                                        icon={<Icon name='delete' color='red'/>}
                                        title="Remove"
                                        type="outline"
                                        onPress={() => this.removeVehicle(vehicle.vehicle)}
                                        buttonStyle={{borderColor: 'red', paddingRight: 10}}
                                        titleStyle={{color: 'red'}}
                                        containerStyle={{width: 100, height: 36}}
                                    />
                                </View>
                            </View>
                        </Card>
                    })}
                    {this.state.displayVehicles.length === 0 &&
                    <Card>
                        <Text style={{marginBottom: 25}}>You don't have any vehicles yet. Please add a vehicle.</Text>
                    </Card>
                    }
                    <View style={{paddingTop: 30}}/>
                    <LoadingScreen loading={this.state.loading} handleClose={this.handleModalClose}/>
                </ScrollView>
            </>
        );
    }

    getBarColor = fines => {
        if (fines === 0) {
            return "green"
        } else if (fines <= 2) {
            return "orange"
        } else {
            return "red"
        }
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