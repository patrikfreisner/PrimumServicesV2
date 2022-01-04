import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Portal,
  Modal,
  ActivityIndicator,
  Headline,
} from "react-native-paper";

import PrmFormBuilder from '../../PrmComponents/FormBuilder/PrmFormBuilder'
import PrmFormInputText from '../../PrmComponents/FormBuilder/PrmFormInputText'

export default function LoginFormComponent({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function onSubmit() {
    showModal();
  }

  return (
    <View>
      <PrmFormBuilder onSubmit={onSubmit}>
        <PrmFormInputText
          label="Usuário"
          name="user"
          rules={{ required: true }}
          mode="outlined"
          value={user}
          keyboardType="email-address"
        />
        <PrmFormInputText
          label="Senha"
          name="password"
          rules={{ required: true, minLength: 8 }}
          mode="outlined"
          value={password}
          textContentType="password"
          secureTextEntry={true}
        />
        <Button type="submit" style={{ marginTop: 15 }} mode="contained">
          Entrar
        </Button>
      </PrmFormBuilder>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          dismissable={true}
          contentContainerStyle={styles.modalView}
        >
          <ActivityIndicator animating={true} size="large" />
          <Headline style={{ textAlign: "center" }}> Carregando... </Headline>
        </Modal>
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
