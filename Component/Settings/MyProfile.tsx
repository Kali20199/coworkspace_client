import React from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Dialog, Portal, Provider, Paragraph, Card, Title } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
const windowheight = Dimensions.get('window').height;
import { Tab,TabView } from 'react-native-elements';
function MyProfile() {
    const [visible, setVisible] = React.useState(false);
    const [imageDialog, setimageDialog] = React.useState(false);
    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

   const UploadImage=()=>{
       return(
        <Portal>
        <Dialog visible={imageDialog} onDismiss={hideDialog}>
            <Dialog.Title>Change My Image</Dialog.Title>
            <Dialog.Content>
                <Paragraph>Request Permission Access Local Storage</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
                <Button onPress={()=>setimageDialog(false)}>Yes</Button>
                <Button onPress={()=>setimageDialog(false)}>No</Button>
            </Dialog.Actions>
        </Dialog>
    </Portal>
       )
   }

 
  const [index, setIndex] = React.useState(0);

    return (
    
    
        <Provider>
            <ScrollView>
                <View style={{ padding: 20 }}>

                    <View style={styles.Images}>
                        <Avatar.Image size={74} source={require('../../assets/Mostafa.jpg')} />
                        <Button onPress={()=>setimageDialog(!imageDialog)}>Change Image</Button>
                        <UploadImage/>
                    </View >
                    <View style={{ ...styles.info, ...styles.mainView }}>
                        <Card  style={styles.prsoninfo}>
                            <Title  >
                                <Text style={styles.info}>Name :  Mostafaihab</Text>
                            </Title>
                            <Card.Content>
                                <Button color={'red'} onPress={hideDialog}>Edit</Button>
                            </Card.Content>
                        </Card>
                        <Card style={styles.prsoninfo}>
                         
                            <Title  >
                                <Text style={styles.info}>Email : mostafaihab2019@gmail.com</Text>
                            </Title>
                            <Card.Content>
                           
                            </Card.Content>
                        </Card>
                        <Card style={styles.prsoninfo}>
                      

                            <Title  >
                                <Text style={styles.info} >City :  Alexandria</Text>
                            </Title>
                            <Card.Content>
                                <Button color={'red'} onPress={hideDialog}>Edit</Button>
                            </Card.Content>
                        </Card>
                    </View>


                    <View>
                    </View>
                    <Button color={'red'} onPress={showDialog}>Dlete My Account <Text>
                        <MaterialCommunityIcons name={'trash'} size={20} color='red' />
                    </Text>
                    </Button>
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            <Dialog.Title>Alert</Dialog.Title>
                            <Dialog.Content>
                                <Paragraph>Are you Sure you Want To Delete This Accout Premently</Paragraph>
                            </Dialog.Content>
                            <Dialog.Actions>
                                <Button color={'red'} onPress={hideDialog}>Yes</Button>
                                <Button onPress={hideDialog}>No</Button>
                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
                </View>
            </ScrollView>

        </Provider>
    )
}

export default MyProfile



const styles = StyleSheet.create({
    
    mainView: {

    },
    Images:{
        flexDirection:'row',
        alignItems:'center'
    },
    info: {
        fontSize:17,
        color:'black',


    },
    prsoninfo: {
        marginTop: 50,
        padding:5,
        backgroundColor:'white'
       

    },
    delete: {

    },
})