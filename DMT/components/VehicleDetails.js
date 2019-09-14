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
        vehicleNo: ''

    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    handleDisplay = () => {
        this.setState({display: !this.state.display})
    }

    handleSubmit = () => {
        if (this.state.vehicleNo === '') {
            ToastAndroid.showWithGravityAndOffset(
                'Enter Valid Vehicle Number',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                100,
            );
        }
        else{
            this.handleDisplay()
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

                    {this.state.display && <Card
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
                                }}>CAQ-6599</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Owner</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: T.M.Guruge</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Engine Number</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: H567685</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Class</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Motor Car</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Manufacturer</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Toyota</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Model</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Axia RX</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Year</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: 2018</Text></View>
                        </View>
                    </Card>}

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