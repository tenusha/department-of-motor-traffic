import React from 'react';
import {Image, Text, FlatList, Dimensions, View, StyleSheet} from 'react-native';
import AppHeader from "./commons/AppHeader";

const data = [
    {key: 'A', image: ''}, {key: 'B',  image: ''}, {key: 'B',  image: ''}, {key: 'C',  image: ''}, {key: 'D',  image: ''}, {key: 'E',  image: ''}, {key: 'F',  image: ''}, {key: 'G',  image: ''}, {key: 'H',  image: ''}, {key: 'I',  image: ''}
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
                <Image source={require('../assets/OngoingNumberIcons/carIcon.png')} style={styles.itemImage}/>
                <Text style={styles.itemText}>{item.key}</Text>
                <Text>The current number is:</Text>
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
       margin: 1,
       height: Dimensions.get('window').width / 2,
   },
   itemImage: {
       width:  Dimensions.get('window').width / 2 - 50,
       height:  Dimensions.get('window').width / 2 - 95
   },
   itemInvisible: {
        backgroundColor: 'transparent'
   },
   itemText: {
       color: '#000',
       fontWeight: 'bold',
       fontSize: 20
   },
   itemLicenceNo: {
       color: '#E24244',
       fontWeight: 'bold',
       fontSize: 20
   }
});