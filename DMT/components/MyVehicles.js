import React from 'react';
import {AsyncStorage, ScrollView, Text} from 'react-native';
import AppHeader from "./commons/AppHeader";
import {Button, Icon} from "react-native-elements";

export default class MyVehicles extends React.Component {
    static navigationOptions = {
        title: 'My Vehicles',
        drawerIcon:(
            <Icon name='person'/>
        )
    };

    state = {
        vehicles: ["asasas", "asasas", "asasas", "asasas", "asasas", "asasas", "asasas", "asasas", "asasas", "asasas"]
    }

    componentDidMount() {
        AsyncStorage.getItem("dmt_user").then(user => {
            console.log(user)
            this.setState({user})
        })
    }

    updateData = vehicle => {
        this.setState({vehicles: [...this.state.vehicles, vehicle]})
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <ScrollView>
                <AppHeader {...this.props} title={'My Vehicles'}/>
                <Text>My Vehicles</Text>
                {this.state.vehicles.map((vehicle, i) => {
                    return <Text key={i}>{vehicle}</Text>
                })}
                <Button
                    icon={<Icon name='code' color='#ffffff'/>}
                    onPress={() => this.updateData("64-8693")}
                    title='Add now'/>
            </ScrollView>
        );
    }
}