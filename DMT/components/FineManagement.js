import React from "react"
import {AsyncStorage, Image, ScrollView, Text, View, StyleSheet} from "react-native";
import AppHeader from "./commons/AppHeader";
import {Button, Card, Icon, Avatar} from "react-native-elements";
import configs from "../config";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Fine Management",
        drawerIcon: (
            <Image source={require('../assets/icons/fine_management.png')} style={{width: 24, height: 24}}/>
        )
    };

    state = {
        fineDetails: [],
        name: "Ranmal Dewage",
        licenseDetails: "B54356789",
        loading: false
    }

    componentDidMount() {
        const PUSH_ENDPOINT = configs.dmtUrl + "/fines/"
        fetch(PUSH_ENDPOINT).then(res => res.json()).then(res => {
            this.setState({
                fineDetails: res
            })
        });
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Fine Management'}/>
                <ScrollView>
                    <View style={{flex: 1, flexDirection: 'row', margin: 18}}>
                        <Avatar
                            rounded
                            style={{width: 80, height: 80}}
                            source={{uri: 'https://i.ibb.co/FBb2h5k/RAN-PRO-11.jpg'}}
                            showEditButton
                        />
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={styles.profileText1}>Name : <Text
                                style={styles.profileText2}>{this.state.name}</Text></Text>
                            <Text style={styles.profileText1}>License No : <Text
                                style={styles.profileText2}>{this.state.licenseDetails}</Text></Text>
                        </View>
                    </View>
                    {this.state.fineDetails.length != 0 && this.state.fineDetails.map((fine) => {
                        const ref = "REF : " + fine.ref
                        return <Card
                            key={fine._id}
                            title={ref}
                            titleStyle={{fontSize: 18}}>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Number</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {fine.vehicleNumber}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fined Date</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {fine.finedDate}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fined Place</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {fine.finedPlace}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fine Due Date</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {fine.fineDueDate}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Reason</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold"
                                    }}>: {fine.reason}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Amount</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold",
                                        color: fine.status === 'PAID' ? "#15B867" : "#E0494C"
                                    }}>: Rs.{fine.amount}</Text></View>
                            </View>
                            <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                                <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Status</Text></View>
                                <View style={{
                                    flex: 1,
                                    alignSelf: 'stretch'
                                }}><Text
                                    style={{
                                        fontWeight: "bold",
                                        color: fine.status === 'PAID' ? "#15B867" : "#E0494C"
                                    }}>: {fine.status}</Text></View>
                            </View>
                            <View>
                                {fine.status === "NOT PAID" && <Button
                                    icon={<Icon type='ionicon' name='ios-card' color='#FFFFFF'/>}
                                    buttonStyle={{
                                        backgroundColor: '#15B867',
                                        borderRadius: 15,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                        borderWidth: 0
                                    }}
                                    onPress={() => navigate('PaymentGateway', {
                                        name: this.state.name,
                                        licenseNumber: this.state.licenseDetails,
                                        ref: fine.ref,
                                        vno: fine.vehicleNumber,
                                        amount: fine.amount
                                    })}
                                    title=' PAY NOW'/>}
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
    profileText1: {
        margin: 8,
        fontSize: 20,
        textAlign: "left"
    },
    profileText2: {
        margin: 8,
        fontSize: 20,
        textAlign: "left",
        color: "rgb(0,102,102)"
    }
});