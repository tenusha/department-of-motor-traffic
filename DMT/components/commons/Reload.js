import React from 'react';

export default class Logout extends React.Component {
    static navigationOptions = {
        title: 'Reload'
    };

    componentDidMount() {
        this.props.navigation.navigate("App")
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
            </>
        );
    }
}