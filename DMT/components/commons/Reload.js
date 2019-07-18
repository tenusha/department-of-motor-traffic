import React from 'react';
import {AsyncStorage} from "react-native";

export default class Logout extends React.Component {
    static navigationOptions = {
        title: 'Reload'
    };

    componentDidMount() {
        try {
            AsyncStorage.getItem("dmt_user").then(user => {
                if (user) {
                    this.props.navigation.navigate("UserApp")
                } else {
                    this.props.navigation.navigate("App")
                }
            })
        }catch(err){
            this.props.navigation.navigate("App")
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
            </>
        );
    }
}