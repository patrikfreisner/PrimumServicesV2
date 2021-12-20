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

export default function LoginFormComponent({ navigation }) {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  function onSubmit() {
    showModal();
    console.log("Submitted!");
  }

  return (
    <View>
      <TextInput
        label="Usuário"
        mode="outlined"
        value={user}
        keyboardType="email-address"
        onChangeText={(user) => setUser(user)}
      />
      <TextInput
        label="Senha"
        mode="outlined"
        value={password}
        textContentType="password"
        secureTextEntry={true}
        onChangeText={(passw) => setPassword(passw)}
      />
      <Button style={{ marginTop: 15 }} mode="contained" onPress={onSubmit}>
        Entrar
      </Button>

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
