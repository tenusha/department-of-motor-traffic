import React from "react"
import {AsyncStorage, Image, ScrollView, Text, View, StyleSheet} from "react-native";
import AppHeader from "./commons/AppHeader";
import {Button, Card, Icon, Avatar} from "react-native-elements";



export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: "Fine Management",
        drawerIcon: (
            <Image source={require('../assets/icons/home.png')} style={{width: 24, height: 24}}/>
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
                    <View style={{flex: 1, flexDirection: 'row', margin:18}} >
                        <Avatar
                            rounded
                            style={{width: 80, height: 80}}
                            source={{uri:'https://i.ibb.co/FBb2h5k/RAN-PRO-11.jpg'}}
                            showEditButton
                        />
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <Text style={styles.profileText1}>Name : <Text style={styles.profileText2}>Ranmal Dewage</Text></Text>
                            <Text style={styles.profileText1}>License No : <Text style={styles.profileText2}>LK262622</Text></Text>
                        </View>
                    </View>

                    <Card
                        title='REF : 123457544'
                        titleStyle={{fontSize: 18}}>
                        <Text style={{marginBottom: 25}}>Fined Date : <Text
                            style={{color: "rgb(0,102,102)"}}>2019/1
                        02/12</Text></Text>
                        <Text style={{marginBottom: 25}}>Fined Place : <Text
                            style={{color: "rgb(0,102,102)"}}>Colombo 04</Text></Text>
                        <Text style={{marginBottom: 25}}>Fine Due Date : <Text
                            style={{color: "rgb(0,102,102)"}}>2019/05/09</Text></Text>
                        <Text style={{marginBottom: 25}}>Reason : <Text
                            style={{color: "rgb(0,102,102)"}}>Not wearing Seat Belt</Text></Text>
                        <Text style={{marginBottom: 25}}>Status : <Text
                            style={{color: "rgb(255,0,0)"}}>NOT PAID</Text></Text>
                        <Button
                            icon={<Icon type='ionicon' name='ios-card' color='#FFFFFF'/>}
                            buttonStyle={{
                                backgroundColor:'#20CE56',
                                borderRadius: 15,
                                marginLeft: 0,
                                marginRight: 0,
                                marginBottom: 0,
                                borderWidth: 0
                            }}
                            onPress={() => navigate('OngoingNumbers')}
                            title=' PAY NOW'/>
                    </Card>
                </ScrollView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    profileText1:{
        margin: 8,
        fontSize: 20,
        textAlign: "left"
    },
    profileText2:{
        margin: 8,
        fontSize: 20,
        textAlign: "left",
        color:"rgb(0,102,102)"
    }
});