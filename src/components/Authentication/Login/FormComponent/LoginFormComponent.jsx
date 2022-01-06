import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import {
  Paragraph,
  Button,
  Portal,
  Modal,
  ActivityIndicator,
  Headline,
  IconButton,
  Dialog
} from "react-native-paper";
import { useLoginContext } from "../../../../context/LoginContext";

import PrmFormBuilder from "../../../PrimumComponents/FormBuilder/PrmFormBuilder";
import PrmFormInputText from "../../../PrimumComponents/FormBuilder/PrmFormInputText";

export default function LoginFormComponent({ navigation }) {
  const [errorDialogModal, setErrorDialogModal] = useState({
    hasError: false,
    message: ""
  });
  const [loadingModal, setLoadingModal] = useState(false);
  const { authenticate, setUserData } = useLoginContext();

  function onSubmit(formValues) {
    setLoadingModal(true);
    authenticate(formValues?.user, formValues?.password, (msg, response) => {
      setUserData({
        email: formValues.user
      });
      if (response) {
        navigation.navigate('home');
      }

      if (msg) {
        setLoadingModal(false);
        if (msg == "Incorrect username or password.") {
          setErrorDialogModal({
            hasError: true,
            message: "Usuário ou senha incorreto!"
          });
        } else if (msg == "User is not confirmed.") {
          navigation.navigate("confirm_account");
        } else if (message == "User is disabled.") {
          setErrorDialogModal({
            hasError: true,
            message: "Seu usuário foi desabilitado temporariamente pelo sistema, para solucionar o problema entre em contato com a equipe da Primum.\nNúmero (47) 99919-6385."
          });
        } else {
          setErrorDialogModal({
            hasError: true,
            message: "Ocorreu um problema ao fazer login, por favor tente novamente!"
          });
        }
      }
    });
  }

  return (
    <View>
      <PrmFormBuilder defaultValues={{ user: "", password: "" }} onSubmit={onSubmit}>
        <PrmFormInputText
          label="Usuário"
          name="user"
          rules={{ required: true }}
          mode="outlined"
          keyboardType="email-address"
        />
        <PrmFormInputText
          label="Senha"
          name="password"
          rules={{ required: true, minLength: 8 }}
          mode="outlined"
          textContentType="password"
          secureTextEntry={true}
        />
        <Button type="submit" style={{ marginTop: 15 }} mode="contained">
          Entrar
        </Button>
      </PrmFormBuilder>
      <Portal>
        <Modal
          visible={loadingModal}
          dismissable={false}
          contentContainerStyle={styles.modalView}
        >
          <ActivityIndicator animating={true} size="large" />
          <Headline style={{ textAlign: "center" }}> Carregando... </Headline>
        </Modal>

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
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: "white",
    padding: 30,
    margin: 30,
    borderRadius: 25,
  },
});
