import React from 'react';
import {Image, Text, FlatList, Dimensions, View, StyleSheet} from 'react-native';
import AppHeader from "./commons/AppHeader";

const data = [
    {key: 'A', img: require('../assets/OngoingNumberIcons/carIcon.png')},
    {key: 'B',  img: require('../assets/OngoingNumberIcons/bigTruckIcon.png')},
    {key: 'B',  img: require('../assets/OngoingNumberIcons/buldozerIcon.png')},
    {key: 'C', img: require('../assets/OngoingNumberIcons/busIcon.png')},
    {key: 'D', img: require('../assets/OngoingNumberIcons/cementIcon.png')},
    {key: 'E',  img: require('../assets/OngoingNumberIcons/commercialIcon.png')},
    {key: 'F',  img: require('../assets/OngoingNumberIcons/excavatorIcon.png')},
    {key: 'G',  img: require('../assets/OngoingNumberIcons/forkLiftIcon.png')},
    {key: 'H',  img: require('../assets/OngoingNumberIcons/lorryIcon.png')},
    {key: 'I',  img: require('../assets/OngoingNumberIcons/panzerIcon.png')},
    {key: 'I',  img: require('../assets/OngoingNumberIcons/primeMoverIcon.png')},
    {key: 'I',  img: require('../assets/OngoingNumberIcons/singleCabIcon.png')},
    {key: 'I',  img: require('../assets/OngoingNumberIcons/tractorTrailerIcon.png')},
    {key: 'I',  img: require('../assets/OngoingNumberIcons/trailerIcon.png')}

];

const formatData = (data, numOfColumns) => {
    const numberOfFullRows = Math.floor(data.length / numOfColumns);

    let numOfElementsInLastRow = data.length - (numberOfFullRows * numOfColumns);
    while(numOfElementsInLastRow !== numOfColumns && numOfElementsInLastRow !== 0) {
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
      if(item.empty === true){
          return <View style={[styles.item, styles.itemInvisible]}/>
      }
      return (
          <>
            <View style={styles.item}>
                <Image source={item.img} style={styles.itemImage}/>
                <Text style={styles.itemText}>{item.key}</Text>
                <Text>The next ongoing number is:</Text>
                <Text style={styles.itemLicenceNo}>{"XC-345543"}</Text>
            </View>
          </>
      )
    };

    render() {
        const {navigate} = this.props.navigation;
        return (
            <>
                <AppHeader {...this.props} title={'Ongoing numbers'}/>
                <FlatList
                    contentContainerStyle={{paddingBottom:30}}
                    data={formatData(data,2)}
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
       borderColor: '#E24244',
       height: Dimensions.get('window').width / 2,
   },
   itemImage: {
       width:  Dimensions.get('window').width / 2 - 50,
       height:  Dimensions.get('window').width / 2 - 115,
       resizeMode: 'contain'
   },
   itemInvisible: {
        backgroundColor: 'transparent'
   },
   itemText: {
       color: '#000',
       fontWeight: 'bold',
       fontSize: 25
   },
   itemLicenceNo: {
       color: '#E24244',
       fontWeight: 'bold',
       fontSize: 20
   }
});