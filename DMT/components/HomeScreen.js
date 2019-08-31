import React from 'react'
import {AsyncStorage, Image, ScrollView, Text, View} from 'react-native'
import {Button, Card, Icon} from "react-native-elements"
import Footer from './commons/Footer'
import RevenueLicense from './RevenueLicense'
import AppHeader from "./commons/AppHeader"
import configs from "../config.json"

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Home",
        drawerIcon: (
            <Image source={require('../assets/icons/home.png')} style={{width: 24, height: 24}}/>
        )
    };

    componentDidMount() {
        AsyncStorage.getItem("dmt_user").then(user => {
            if (user) {
                this.props.navigation.navigate("UserApp")
            }
        })
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'DMT'}/>
                <ScrollView>
                    {/*<View style={{backgroundColor: configs.theme}}>*/}
                        {/*<Image*/}
                            {/*source={require('../assets/home_logo.png')}*/}
                            {/*style={{width: "100%", height: 105}}*/}
                        {/*/>*/}
                    {/*</View>*/}
                    <Card
                        onPress={() => navigate('OngoingNumbers')}
                        title='Ongoing Numbers'
                        titleStyle={{fontSize: 18}}
                        image={require('../assets/ongoing_numbers.jpg')}>
                        <Text style={{marginBottom: 10, textAlign: 'justify'}}>
                            You can enquire the last issued Vehicle Number of the desired vehicle category through this
                            service.
                        </Text>
                        <Button
                            icon={<Icon name='code' color={configs.theme}/>}
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                borderWidth: 1,
                                borderColor: configs.theme
                            }}
                            titleStyle={{
                                color: configs.theme
                            }}
                            type="outline"
                            onPress={() => navigate('OngoingNumbers')}
                            title='VIEW NOW'/>
                    </Card>
                    <Card
                        title='Vehicle Details'
                        titleStyle={{fontSize: 18}}
                        image={require('../assets/vehicle_details.jpg')}>
                        <Text style={{marginBottom: 10}}>
                            You can get the details of a registered vehicle through this service.
                        </Text>
                        <Button
                            icon={<Icon name='code' color={configs.theme}/>}
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                borderWidth: 1,
                                borderColor: configs.theme
                            }}
                            titleStyle={{
                                color: configs.theme
                            }}
                            type="outline"
                            onPress={() => navigate('VehicleDetails')}
                            title='VIEW NOW'/>
                    </Card>
                    <Card
                        title='Revenue Licence Details'
                        titleStyle={{fontSize: 18}}
                        containerStyle={{marginBottom: 20}}
                        image={require('../assets/revenue_license.png')}>
                        <Text style={{marginBottom: 10}}>
                            You may obtain your revenue licence details for Motor cars, Motor cycles, Dual purpose
                            vehicles,
                            Land vehicles, Three wheelers, Motor car A-Z online using this service.
                        </Text>
                        <Button
                            icon={<Icon name='code' color={configs.theme}/>}
                            buttonStyle={{
                                borderRadius: 0,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                borderWidth: 1,
                                borderColor: configs.theme
                            }}
                            titleStyle={{
                                color: configs.theme
                            }}
                            type="outline"
                            onPress={() => navigate('RevenueLicense')}
                            title='VIEW NOW'/>
                    </Card>
                    <Footer/>
                </ScrollView>
            </>
        );
    }
}