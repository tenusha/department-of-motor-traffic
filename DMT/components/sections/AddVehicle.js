import React from 'react';
import {Modal, ScrollView, StyleSheet, View} from 'react-native';
import {Image} from "react-native-elements";
import CustomButton from "../commons/CustomButton"
import CustomTextField from "../commons/CustomTextField"

export default class AddVehicle extends React.Component {

    state={
        vehicleNo: '',
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.showAddVehicle}
                onRequestClose={() => {
                    this.props.handleClose()
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <CustomTextField style={styles.materialMessageTextbox}
                                         placeholder={'e.g: KA-1010, 15-3456'}
                                         label={'Vehicle Number :'}
                                         handleChange={(value) => this.handleChange('vehicleNo', value)}/>
                        <CustomButton style={styles.materialButtonPrimary} title={'Get Status'}
                                      handleClick={this.handleSubmit}/>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000080'
    },
    activityIndicatorWrapper: {
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    materialMessageTextbox: {
        top: 90,
        left: 12.58,
        width: 340,
        height: 90,
        position: "absolute"
    },
    materialButtonPrimary: {
        top: 220,
        left: 220,
        width: 130,
        height: 36,
        position: "absolute"
    }
});