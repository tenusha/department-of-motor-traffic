import React from 'react'
import HomeScreen from './components/HomeScreen'
import LoginScreen from './components/LoginScreen'
import OngoingNumbers from './components/OngoingNumbers'
import VehicleDetails from './components/VehicleDetails'
import RevenueLicense from './components/RevenueLicense'
import MyVehicles from './components/MyVehicles'
import Logout from './components/actions/Logout'
import Reload from './components/commons/Reload'
import {ScrollView, View} from 'react-native';
import {Image} from "react-native-elements";
import {createAppContainer, createDrawerNavigator, createSwitchNavigator, DrawerItems} from 'react-navigation'
import configs from "./config.json"
import FineManagement from "./components/FineManagement";

import SignInScreen from "./components/SignInScreen";
import PaymentGateway from "./components/PaymentGateway";


export default class App extends React.Component {

    render() {
        return (
            <AppContainer/>
        );
    }
}

const customDrawerContent = (props) => (
    <ScrollView>
        <View style={{backgroundColor: configs.theme}}>
            <Image
                source={require('./assets/drawer_image.png')}
                style={{width: "100%", height: 150}}
            />
        </View>
        <DrawerItems {...props}/>
    </ScrollView>
)

const DrawerNavigator = createDrawerNavigator({
        Home: {screen: HomeScreen},
        OngoingNumbers: {screen: OngoingNumbers},
        VehicleDetails: {screen: VehicleDetails},
        RevenueLicense: {screen: RevenueLicense},
        Login: {screen: LoginScreen}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Home',
        contentOptions: {
            activeLabelStyle: {
                color: configs.theme
            }
        },
        contentComponent: customDrawerContent,
    }
);

const DrawerNavigatorLoginUsers = createDrawerNavigator({
        Home: {screen: HomeScreen},
        OngoingNumbers: {screen: OngoingNumbers},
        VehicleDetails: {screen: VehicleDetails},
        RevenueLicense: {screen: RevenueLicense},
        MyVehicles: {screen: MyVehicles},
        FineManagement: {screen: FineManagement},
        Logout: {screen: Logout}
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Home',
        contentOptions: {
            activeLabelStyle: {
                color: configs.theme
            }
        },
        contentComponent: customDrawerContent,
    }
);

const SwitchNavigator = createSwitchNavigator({
        Reload: {screen: Reload},
        SignIn: SignInScreen,
        PaymentGateway: PaymentGateway,
        App: DrawerNavigator,
        UserApp: DrawerNavigatorLoginUsers
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        },
        initialRouteName: 'Reload'
    }
);

const AppContainer = createAppContainer(SwitchNavigator)
