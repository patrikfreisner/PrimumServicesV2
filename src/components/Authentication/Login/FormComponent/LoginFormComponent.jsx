import React, { useState } from "react";
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
  const { authenticate } = useLoginContext();

  function onSubmit(formValues) {
    setLoadingModal(true);
    authenticate(formValues?.user, formValues?.password, (msg, response) => {
      console.log(msg);
      console.log(response);
      setLoadingModal(false);
      if (response) navigation.navigate('home');

      if (msg == "Incorrect username or password.") setErrorDialogModal({
        hasError: true,
        message: "Usuário ou senha incorreto!"
      });
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
