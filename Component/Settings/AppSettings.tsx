
import React from 'react'
import { View ,Text,StyleSheet, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Paragraph, Dialog, Portal, Provider,List ,ActivityIndicator,Colors,Switch  } from 'react-native-paper';
import Color from '../../constant/Color';
function AppSettings() {

    const [visible, setVisible] = React.useState(false);
    const [expanded, setExpanded] = React.useState(true);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
   
    return (
        <List.Section title="Accordions">
            <View style={styles.notify}>
            <Text>Allow Notifications</Text>
            <Switch color={Color.primary}  value={isSwitchOn} onValueChange={()=>setIsSwitchOn(!isSwitchOn)} />
            </View>
       <ActivityIndicator animating={true} color={Colors.red800} />
      </List.Section>
    )
}

export default AppSettings



const styles= StyleSheet.create({
    mainView:{
        height:300,
        border:'1px solid red'
    },
    text:{
        color:'black'
    },
    notify:{
        flexDirection:'row',
        padding:20,
        width:'70%',
        alignItems:'center',
        justifyContent:'space-between',
        
    }
})