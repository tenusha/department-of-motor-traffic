import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import AppHeader from "./commons/AppHeader";
import CustomTextField from "./commons/CustomTextField";
import {Button} from "react-native-elements";
import CustomTextField2 from "./commons/CustomTextField"
import configs from "../config";

export default class VehicleDetails extends React.Component {
    static navigationOptions = {
        title: 'Vehicle Details',
        drawerIcon: (
            <Image source={require('../assets/icons/vehicle_info.png')} style={{width: 24, height: 24}}/>
        )
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Vehicle Details'}/>
                {/*<CustomTextField2 style={styles.materialMessageTextbox}*/}
                {/*                 placeholder={'e.g: KA-1010, 15-3456'}*/}
                {/*                 label={'Vehicle Number :'}*/}
                {/*                 value=''*/}
                {/*                />*/}
                <View style={{alignItems: 'flex-end'}}>
                    <Button
                        title="Add new vehicle"
                        type="outline"
                        containerStyle={{width: 150, height: 36, marginTop: 20, marginRight: 10}}
                        buttonStyle={{borderColor: configs.theme}}
                        titleStyle={{
                            color: configs.theme
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