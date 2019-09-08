import React from 'react'
import {Modal, StyleSheet, View, Image} from 'react-native'

export default class LoadingScreen extends React.Component {

    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.loading}
                onRequestClose={() => {
                    this.props.handleClose()
                }}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <Image
                            source={require('../../assets/loading.gif')}
                            style={{width: 50, height: 50}}
                        />
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
    }
});