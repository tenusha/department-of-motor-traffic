import React from 'react'
import { Header, Icon} from "react-native-elements"
import configs from "../../config"

export default class AppHeader extends React.Component {

    render() {
        return (
            <Header
                containerStyle={{
                    backgroundColor: 'white',
                    borderBottomColor: 'white'
                }}
            //     leftComponent={<Button
            //         type="clear"
            //         icon={<Image source={require('../../assets/icons/left_arrow.png')} style={{width: 24, height: 24}}/>}
            //         buttonStyle={{
            //             borderRadius: 0,
            //             marginLeft: 0,
            //             marginRight: 0,
            //             marginBottom: 0
            //         }}
            //         onPress={() => this.props.navigation.navigate("Home")}/>}
                leftComponent={<Icon
                name={'arrow-back'}
                color={configs.theme}
                onPress={() => this.props.navigation.navigate("Home")}
                />}
            />
        );
    }
}

