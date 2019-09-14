import React from "react"
import {AsyncStorage, Image, ScrollView, Text, View, StyleSheet} from "react-native";
import AppHeader from "./commons/AppHeader";
import {Button, Card, Icon, Avatar} from "react-native-elements";


export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Fine Management",
        drawerIcon: (
            <Image source={require('../assets/icons/fine_management.png')} style={{width: 24, height: 24}}/>
        )
    };

    componentDidMount() {

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
                            <Text style={styles.profileText1}>Name : <Text style={styles.profileText2}>Ranmal
                                Dewage</Text></Text>
                            <Text style={styles.profileText1}>License No : <Text
                                style={styles.profileText2}>LK262622</Text></Text>
                        </View>
                    </View>

                    <Card
                        title='REF : 123457544'
                        titleStyle={{fontSize: 18}}>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Number</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: DCF-7890</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fined Date</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: 2019/02/16</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fined Place</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Colombo 04</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fine Due Date</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: 2019/03/09</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Reason</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Not Wearing Seat Belt</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Status</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold",
                                    color: "#CF4143"
                                }}>: NOT PAID</Text></View>
                        </View>
                        <Button
                            icon={<Icon type='ionicon' name='ios-card' color='#FFFFFF'/>}
                            buttonStyle={{
                                backgroundColor: '#15B867',
                                borderRadius: 15,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                borderWidth: 0
                            }}
                            onPress={() => navigate('PaymentGateway')}
                            title=' PAY NOW'/>
                    </Card>

                    <Card
                        title='REF : 175647544'
                        titleStyle={{fontSize: 18}}>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Vehicle Number</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: DCF-7890</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fined Date</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: 2018/05/16</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fined Place</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Colombo 10</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Fine Due Date</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: 2018/06/14</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Reason</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold"
                                }}>: Parking Near Pedestrian Crossing</Text></View>
                        </View>
                        <View style={{flex: 1, alignSelf: 'stretch', flexDirection: 'row', marginBottom: 25}}>
                            <View style={{flex: 1, alignSelf: 'stretch'}}><Text>Status</Text></View>
                            <View style={{
                                flex: 1,
                                alignSelf: 'stretch'
                            }}><Text
                                style={{
                                    fontWeight: "bold",
                                    color: "#15B867"
                                }}>: PAID</Text></View>
                        </View>
                    </Card>

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