import React from 'react';
import {Image, Text, FlatList, Dimensions, View, StyleSheet} from 'react-native';
import AppHeader from "./commons/AppHeader";
import configs from "../config";

const data = [
    {key: 'CAR', img: require('../assets/OngoingNumberIcons/carIcon.png'), licNo: 'LW-2006'},
    {key: 'LORRY TRAILER BOWSER', img: require('../assets/OngoingNumberIcons/bigTruckIcon.png'), licNo: 'CBI-2956'},
    {key: 'LAND VEHICLE (SMALL)', img: require('../assets/OngoingNumberIcons/buldozerIcon.png'), licNo: 'LW-2006'},
    {key: 'DUAL PURPOSE (COMMERCIAL)', img: require('../assets/OngoingNumberIcons/busIcon.png'), licNo: 'ND-9377'},
    {key: 'NON AGRICULTURAL LAND', img: require('../assets/OngoingNumberIcons/cementIcon.png'), licNo: 'LW-2006'},
    {key: 'COMMERCIAL', img: require('../assets/OngoingNumberIcons/commercialIcon.png'), licNo: 'PJ-8138'},
    {key: 'LAND VEHICLE', img: require('../assets/OngoingNumberIcons/excavatorIcon.png'), licNo: 'LV-0345'},
    {key: 'FORK LIFT', img: require('../assets/OngoingNumberIcons/forkLiftIcon.png'), licNo: 'PZ-0541'},
    {key: 'MOTOR LORRY (COMMERCIAL)', img: require('../assets/OngoingNumberIcons/lorryIcon.png'), licNo: 'RG-1187'},
    {key: 'SPECIAL PURPOSE', img: require('../assets/OngoingNumberIcons/panzerIcon.png'), licNo: 'LZ-0219'},
    {key: 'PRIME MOVER', img: require('../assets/OngoingNumberIcons/primeMoverIcon.png'), licNo: 'LO-2345'},
    {key: 'SINGLE CAB', img: require('../assets/OngoingNumberIcons/singleCabIcon.png'), licNo: 'DAH-1876'},
    {key: 'TRACTOR TRAILER BOWSER', img: require('../assets/OngoingNumberIcons/tractorTrailerIcon.png'), licNo: 'ZB-0886'},
    {key: 'OTHER', img: require('../assets/OngoingNumberIcons/trailerIcon.png'), licNo: 'RY-5467'}

];

const formatData = (data, numOfColumns) => {
    const numberOfFullRows = Math.floor(data.length / numOfColumns);

    let numOfElementsInLastRow = data.length - (numberOfFullRows * numOfColumns);
    while (numOfElementsInLastRow !== numOfColumns && numOfElementsInLastRow !== 0) {
        data.push({key: `blank-${numOfElementsInLastRow}`, empty: true});
        numOfElementsInLastRow = numOfElementsInLastRow + 1;
    }
    return data;
};

export default class OngoingNumbers extends React.Component {
    static navigationOptions = {
        title: 'Ongoing Numbers',
        drawerIcon: (
            <Image source={require('../assets/icons/ongoing_numbers.png')} style={{width: 24, height: 24}}/>
        )
    };

    renderItem = ({item, index}) => {
        if (item.empty === true) {
            return <View style={[styles.item, styles.itemInvisible]}/>
        }
        return (
            <View style={styles.item}>
                <Image source={item.img} style={styles.itemImage}/>
                <Text style={styles.itemText}>{item.key}</Text>
                {/*<Text>The next ongoing number is:</Text>*/}
                <Text style={styles.itemLicenceNo}>{item.licNo}</Text>
            </View>
        )
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Ongoing numbers'}/>
                <FlatList
                    contentContainerStyle={{paddingBottom: 0}}
                    data={formatData(data, 2)}
                    style={styles.container}
                    renderItem={this.renderItem}
                    numColumns={2}
                />
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginVertical: 0,
    },
    item: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        borderWidth: 1,
        borderColor: configs.theme,
        height: Dimensions.get('window').width / 2,
    },
    itemImage: {
        width: Dimensions.get('window').width / 2 - 60,
        height: Dimensions.get('window').width / 2 - 150,
        marginBottom: 10,
        resizeMode: 'contain'
    },
    itemInvisible: {
        backgroundColor: 'transparent'
    },
    itemText: {
        color: '#000',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10
    },
    itemLicenceNo: {
        color: configs.theme,
        fontWeight: 'bold',
        fontSize: 20
    }
});