//import liraries
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Headline, Paragraph, Portal, Dialog, IconButton } from 'react-native-paper';
import { useLoginContext } from '../../../context/LoginContext';
import PrmFormBuilder from '../../PrimumComponents/FormBuilder/PrmFormBuilder';
import PrmFormInputText from '../../PrimumComponents/FormBuilder/PrmFormInputText';

// create a component
function ConfirmAccount({ navigation }) {
    const resendTimeout = 60;
    const _patternValueForEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?: [\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    const _patternValueForPassw = /(?=.{8,})(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/

    const { forgotPassword, confirmNewPassword } = useLoginContext();
    const [disableBtn, setDisableBtn] = useState(false);
    const [disabledBtnCounter, setDisabledBtnCounter] = useState(resendTimeout);
    const [showPasswWf2, setShowPassWf2] = useState("none");
    const [username, setUserName] = useState("");
    const [errorDialogModal, setErrorDialogModal] = useState({
        hasError: false,
        hasSuccess: false,
        message: ""
    });

    const forgotPasswordWorkflow = ({ email }) => {
        setUserName(email);
        setDisableBtn(true);

        forgotPassword(email, (msg, response) => {
            setShowPassWf2("flex");

            if (msg == 'Attempt limit exceeded, please try after some time.') setErrorDialogModal({
                hasError: true,
                message: "Houveram muitas tentativas para recuperar a senha nesta conta, por favor tente mais tarde!"
            });

            let _counter = resendTimeout;
            let _interval = setInterval(() => {
                setDisabledBtnCounter(_counter);
                if (_counter == 0) {
                    setDisableBtn(false);
                    clearInterval(_interval);
                }
                _counter--;
            }, 1000);
        });
    };

    const confirmNewPasswordWf = ({ password, confirm_password, verifyCode }) => {
        confirmNewPassword(username, password, verifyCode, (msg, response) => {
            console.log(msg);
            console.log(response);

            //[ERROR1]: Invalid verification code provided, please try again.
            //[success]: SUCCESS
            if (msg == "Invalid verification code provided, please try again.") {
                setErrorDialogModal({
                    hasError: true,
                    message: "Codigo de verificação informado não é valido!"
                });
            } else if (msg == "" && response == "SUCCESS") {
                setErrorDialogModal({
                    hasSuccess: true,
                    message: "Sua senha foi alterada com sucesso!"
                });
            } else {
                setErrorDialogModal({
                    hasError: true,
                    message: "Ocorreu um problema ao fazer seu registro, por favor tente novamente!"
                });
            }
        });
    };

    const RenderModalView = () => {
        return (
            <Portal>
                <Dialog visible={errorDialogModal.hasSuccess}>
                    <Dialog.Content style={{ alignItems: 'center' }}>
                        <IconButton icon={'check-all'} color="#00d620" size={80} />
                        <Paragraph style={{ textAlign: 'center' }}>
                            {errorDialogModal?.message}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{ paddingRight: 20, paddingLeft: 20 }}>
                        <Button mode="contained" onPress={() => {
                            setErrorDialogModal({ hasSuccess: false, message: "" });
                            navigation.navigate('login');
                        }}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
                <Dialog visible={errorDialogModal.hasError}>
                    <Dialog.Content style={{ alignItems: 'center' }}>
                        <IconButton icon={'alert-circle'} color="#ffbb00" size={80} />
                        <Paragraph>
                            {errorDialogModal?.message}
                        </Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions style={{ paddingRight: 20, paddingLeft: 20 }}>
                        <Button mode="contained" onPress={() => {
                            setErrorDialogModal({ hasError: false, message: "" });
                        }}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        )
    };

    return (
        <View>
            <View style={styles.container}>
                <Headline style={{ textAlign: 'center' }}>
                    Vamos iniciar o processo para recuperar sua senha!
                </Headline>
                <Paragraph style={{ textAlign: 'center', marginTop: 10 }}>
                    Vamos enviar no seu e-mail um codigo para redefinir sua senha.
                </Paragraph>
            </View>
            <View style={{ paddingLeft: 10, paddingRight: 10 }}>
                <PrmFormBuilder defaultValues={{ email: "" }} onSubmit={forgotPasswordWorkflow}>
                    <PrmFormInputText
                        label="Email"
                        name="email"
                        mode="outlined"
                        disabled={disableBtn}
                        rules={{ required: true, pattern: _patternValueForEmail }}
                        messages={{ pattern: "Email informado não é valido!" }}
                        keyboardType="email-address"
                    />
                    <Button type="submit" disabled={disableBtn} mode='contained' style={{ marginTop: 10 }}>
                        {!disableBtn ? 'Enviar codigo de verificação!' : 'Reenviar o codigo em ' + disabledBtnCounter + ' segundos'}
                    </Button>
                    {/* <Button mode='text' disabled={disableBtn} onPress={() => { setShowPassWf2(true) }}> <Caption style={{ color: "#0094e4" }}>Já recebi o codigo!</Caption> </Button> */}
                </PrmFormBuilder>
                <View style={{ display: showPasswWf2, marginTop: 20 }}>
                    <Paragraph style={{ textAlign: 'justify' }}> Digite o codigo enviado ao seu e-mail e confirme sua nova senha: </Paragraph>
                    <PrmFormBuilder defaultValues={{
                        password: "",
                        confirm_password: "",
                        verifyCode: ""
                    }} onSubmit={confirmNewPasswordWf}>
                        <PrmFormInputText
                            label="Codigo de verificação"
                            name="verifyCode"
                            mode="outlined"
                            rules={{ required: true }}
                        />
                        <PrmFormInputText
                            label="Senha"
                            name="password"
                            mode="outlined"
                            rules={{ required: true, minLength: 8, pattern: _patternValueForPassw }}
                            messages={{ pattern: "A senha deve conter no mínimo uma letra maiúscula, minúscula e número." }}
                            textContentType="password"
                            secureTextEntry={true}
                        />
                        <PrmFormInputText
                            label="Confirme a senha"
                            name="confirm_password"
                            mode="outlined"
                            rules={{
                                required: true, minLength: 8,
                                validate: {
                                    confirm_password: "password"
                                }
                            }}
                            messages={{ confirm_password: "Ambas as senhas devem ser identicas!" }}
                            textContentType="password"
                            secureTextEntry={true}
                        />
                        <Button type="submit" mode="contained" style={{ marginTop: 15 }}>
                            Cadastrar nova senha
                        </Button>
                    </PrmFormBuilder>
                </View>
            </View>
            <RenderModalView />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        padding: "10%",
        paddingBottom: 0,
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
