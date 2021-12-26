
import React from 'react'
import { View ,Text,StyleSheet, Alert,Image} from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {List ,ActivityIndicator,Colors,Switch  } from 'react-native-paper';
import Color from '../../constant/Color';
import DARK from '../../assets/darkmode.png';


function AppSettings() {

    const [visible, setVisible] = React.useState(false);
    const [expanded, setExpanded] = React.useState(true);
    const [isSwitchOn, setIsSwitchOn] = React.useState(false);
    const [darModeSwitch, setdarModeSwitch] = React.useState(false);
    const handlePress = () => setExpanded(!expanded);
   
    return (
        <List.Section title="Accordions">
            <View style={styles.notify}>             
            <Text style={styles.text}>Allow Notifications</Text>    
            <Switch style={styles.switch}  color={Color.primary}  value={isSwitchOn} onValueChange={()=>setIsSwitchOn(!isSwitchOn)} />
           
            </View>

            <View style={{  ...styles.notify}}>             
            <Text style={styles.text}>Dark Mode</Text>
            <Switch style={styles.switch} color={Color.primary}  value={darModeSwitch} onValueChange={()=>setdarModeSwitch(!darModeSwitch)} />
            <Image style={styles.icon} source={DARK} />
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
      
        alignItems:'center',
        justifyContent:'space-between'
      
        
    },
    switch:{
        position:'absolute',
        left:200
    },
    icon:{
        marginLeft: 100,
        height:20,
        width:20
    }
}) 