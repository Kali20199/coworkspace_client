import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Dimensions, PermissionsAndroid, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Button, Dialog, Portal, Provider, Paragraph, Card, Title } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/Feather'
const windowheight = Dimensions.get('window').height;
import ImagePicker from 'react-native-image-picker';
import { observer } from 'mobx-react-lite';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useStore } from '../../store/store';
// import { Tab, TabView } from 'react-native-';
function MyProfile() {
    const [visible, setVisible] = React.useState(false);
    const [imageDialog, setimageDialog] = React.useState(false);
    const showDialog = () => setVisible(true);
    const { UserStore } = useStore()
    const hideDialog = () => setVisible(false);
    const [ProfilePic, setProfilePic] = useState(require('../../assets/Mostafa.jpg'))


    const OpenCamera = async () => {

        await launchCamera({ mediaType: 'photo' }, ({ assets }) => {

      
            UserStore.ChangeImage(assets[0])
      
          
        });
    }

    const SelectFromLibarary = async () => {

        await launchImageLibrary({ mediaType: 'photo' }, ({ assets }) => {
        
            UserStore.ChangeImage(assets[0])
        })

    }






    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "App Camera Permission",
                    message: "App needs access to your camera ",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("Camera permission given");
                await OpenCamera()
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const UploadImage = () => {
        return (
            <Portal>
                <Dialog visible={imageDialog} onDismiss={hideDialog}>
                    <Dialog.Title>Change My Image</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Request Permission Access Local Storage</Paragraph>
                    </Dialog.Content>

                    <Button onPress={() => {
                        requestCameraPermission()
                        setimageDialog(false)

                    }}>Open Camera</Button>
                    <Button onPress={() => {
                        SelectFromLibarary()
                        setimageDialog(false)
                    }}>Select From Local Storage</Button>
             <Button onPress={()=>{  setimageDialog(false)}}> Cancel</Button>
                </Dialog>
            </Portal>
        )
    }


    const [index, setIndex] = React.useState(0);



    useEffect(() => {
        const getPic = async () => {
            UserStore.ProfilePic = await UserStore.GetImagPice()
        }
        getPic()



        const X = 3;
    }, [])



    return (


        <Provider>
            <ScrollView>
                <View style={{ padding: 20 }}>

                    <View style={styles.Images}>
                        <Avatar.Image size={74} source={UserStore.ProfilePic} />
                        <Button onPress={() => setimageDialog(!imageDialog)}>Change Image</Button>
                        <UploadImage />
                    </View >
                    <View style={{}}>
                        <Card style={styles.prsoninfo}>
                            <Title  >
                                <Text style={styles.info}>Name :  Mostafaihab</Text>
                            </Title>
                            <Card.Content>
                                <Button color={'red'} onPress={() => { }}>Edit</Button>
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
                    <Button color={'red'} onPress={showDialog}>Cancel All Reservations <Text>
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

export default observer(MyProfile)



const styles = StyleSheet.create({

    mainView: {

    },
    Images: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    info: {
        fontSize: 17,
        color: 'black',


    },
    prsoninfo: {
        marginTop: 50,
        padding: 5,
        backgroundColor: 'white'


    },
    delete: {

    },
})