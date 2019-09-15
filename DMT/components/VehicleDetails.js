import React from 'react';
import {Image, ScrollView, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import AppHeader from "./commons/AppHeader";
import CustomTextField from "./commons/CustomTextField";
import {Button, Card} from "react-native-elements";
import configs from "../config";

export default class VehicleDetails extends React.Component {
    static navigationOptions = {
        title: 'Vehicle Details',
        drawerIcon: (
            <Image source={require('../assets/icons/vehicle_info.png')} style={{width: 24, height: 24}}/>
        )
    };
    state = {
        display: false,
        vehicleNo: '',
        vehicleDetails: []

    }

    getVehicle = () => {
        const PUSH_ENDPOINT = configs.dmtUrl + "/slvehicles/" + this.state.vehicleNo
        fetch(PUSH_ENDPOINT).then(res => res.json()).then(res => {
            this.setState({
                vehicleDetails: res
            })
            if (res.length == 0) {
                ToastAndroid.showWithGravityAndOffset(
                    'Not a Valid Vehicle Number',
                    ToastAndroid.LONG,
                    ToastAndroid.BOTTOM,
                    25,
                    100,
                )
            }
        });

    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleDisplay = () => {
        this.setState({display: !this.state.display})
    }

    handleSubmit = async () => {
        if (this.state.vehicleNo === '') {
            ToastAndroid.showWithGravityAndOffset(
                'Enter Valid Vehicle Number',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        } else {
            await this.getVehicle()
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Vehicle Details'}/>
                <ScrollView>
                    <CustomTextField style={styles.materialMessageTextbox}
                                     placeholder={'e.g: KA-1010, 15-3456'}
                                     label={'Vehicle Number :'}
                                     value={this.state.vehicleNo}
                                     handleChange={(value) => this.handleChange('vehicleNo', value)}
                    />
                    <View style={{alignItems: 'flex-end'}}>
                        <Button
                            title="Get Details"
                            onPress={this.handleSubmit}
                            containerStyle={{width: 150, height: 36, marginTop: 20, marginRight: 10}}
                            buttonStyle={{backgroundColor: configs.buttonCol}}
                            titleStyle={{
                                color: "#FFFFFF"
                            }}
                        />
                    </View>
                    <View
                        style={{
                            borderBottomColor: '#D3D3D3',
                            borderBottomWidth: 1,
                            margin: 10,
                            marginTop: 25
                        }}
                    />

                    {this.state.vehicleDetails.length != 0 && this.state.vehicleDetails.map((vehicle) => {
                        return <Card
                            key={vehicle._id}
                            title='Vehicle Details'
                            titleStyle={{fontSize: 18}}>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Number</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.vehicleNumber}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Owner</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.vehicleOwner}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Engine Number</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.engineNumber}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Class</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.class}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Manufacturer</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.manufacturer}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Model</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.model}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Year</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {vehicle.year}</Text></View>
                            </View>
                        </Card>
                    })}

                    <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                    </View>

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
    }
});