
import React from 'react'
import { View ,Text,StyleSheet, Alert} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button, Paragraph, Dialog, Portal, Provider,List ,ActivityIndicator,Colors } from 'react-native-paper';
function AppSettings() {

    const [visible, setVisible] = React.useState(false);
    const [expanded, setExpanded] = React.useState(true);
    const handlePress = () => setExpanded(!expanded);
   
    return (
        <List.Section title="Accordions">
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
    }
})