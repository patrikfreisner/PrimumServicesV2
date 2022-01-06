//import liraries
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, Headline, Paragraph, Portal, Dialog, IconButton } from 'react-native-paper';
import { useLoginContext } from '../../../context/LoginContext';
import { useRegisterContext } from '../../../context/RegisterContext';

// create a component
function ConfirmAccount({ navigation }) {
    const { userData } = useLoginContext();
    const { resendConfirmationCode } = useRegisterContext();
    const [loadingModal, setLoadingModal] = useState({
        resend: false,
        emailText: ""
    });

    const resendCode = () => {
        resendConfirmationCode(userData.email, (msg, response) => {
            setLoadingModal({
                resend: true,
                emailText: response?.CodeDeliveryDetails?.Destination
            });
        })
    };

    return (
        <View>
            <View style={styles.container}>
                <Image style={styles.logoImage} source={require("../../../assets/img/LOGO_PRIMUM_BLACK.png")} />
                <Headline style={{ textAlign: 'center' }}>
                    Percebemos que sua conta ainda não foi confirmada :(
                </Headline>
                <Paragraph style={{ textAlign: 'justify', marginTop: 10 }}>
                    Para que você possa aproveitar os produtos da Primum é necessario confirmar seu email,
                    é rapido, simples e só precisa ser feito uma vez!
                </Paragraph>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <Button mode='contained' onPress={resendCode} style={{ marginBottom: 10 }}>
                    Reenviar e-mail de confirmação
                </Button>
            </View>
            <Portal>
                <Dialog visible={loadingModal.resend}>
                    <Dialog.Content style={{ alignItems: 'center' }}>
                        <IconButton icon={'check-all'} color="#00d620" size={80} />
                        <Paragraph>
                            Sucesso!
                        </Paragraph>
                        <Paragraph>
                            Um email de confirmação foi encaminhado para {loadingModal.emailText}.
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{ paddingRight: 20, paddingLeft: 20 }}>
                        <Button mode="contained" onPress={() => {
                            setLoadingModal({ resend: false });
                            navigation.navigate('login');
                        }}>Ok</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: "10%",
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: '#2c3e50',
    },
    logoImage: {
        width: '50%',
        height: '30vh',
        resizeMode: "contain",
    }
});

//make this component available to the app
export default ConfirmAccount;
