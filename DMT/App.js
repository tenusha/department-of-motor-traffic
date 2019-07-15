import React from 'react'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen'
import OngoingNumbers from './components/OngoingNumbers'
import VehicleDetails from './components/VehicleDetails'
import RevenueLicense from './components/RevenueLicense'
import MyVehicles from './components/MyVehicles'

import {AsyncStorage} from 'react-native';
import {View, Text, ScrollView} from 'react-native';
import {Image} from "react-native-elements";
import {createDrawerNavigator, createAppContainer, createSwitchNavigator, DrawerItems} from 'react-navigation'


export default class App extends React.Component {

    render() {
        return (
            <AppContainer/>
        );
    }
}

const customDrawerContent = (props) => (
    <ScrollView>
        <Image
            source={require('./assets/drawer_image.png')}
            style={{width: "100%", height: 150}}
        />
        <DrawerItems {...props}/>
    </ScrollView>
)

const DrawerNavigator = createDrawerNavigator({
        Home: {screen: HomeScreen},
        OngoingNumbers: {screen: OngoingNumbers},
        VehicleDetails: {screen: VehicleDetails},
        RevenueLicense: {screen: RevenueLicense},
        MyVehicles: {screen: MyVehicles},
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Home',
        contentComponent: customDrawerContent,
    }
);

const SwitchNavigator = createSwitchNavigator({
        LoginScreen: {screen: LoginScreen},
        App: DrawerNavigator
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'App'
    }
);

const AppContainer = createAppContainer(SwitchNavigator)


// initialRouteName: 'Home',
//     defaultNavigationOptions: {
//     headerStyle: {
//         backgroundColor: '#800080',
//     },
//     headerTintColor: '#fff',
//         headerTitleStyle: {
//         fontWeight: 'bold',
//     }
// }