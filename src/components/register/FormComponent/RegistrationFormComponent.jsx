import React, { useState } from "react";
import { View, Text } from "react-native";
import { Button, TextInput, HelperText } from "react-native-paper";
import PrmTextInput from "./PrmText";

function RegisterFormComponent() {
  const [formController, setFormController] = useState([]);

  const [name, setName] = useState("");
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View>
      <TextInput
        label="Nome"
        mode="outlined"
        value={name}
        keyboardType="default"
        onChangeText={(nameText) => {
          setName(nameText);
        }}
      />
      <TextInput
        label="Usuário"
        mode="outlined"
        value={user}
        keyboardType="email-address"
        onChangeText={(userText) => {
          setUser(userText);
        }}
      />
      <TextInput
        label="Email"
        mode="outlined"
        value={email}
        keyboardType="email-address"
        onChangeText={(emailText) => {
          setEmail(emailText);
        }}
      />
      <PrmTextInput
        label="Senha"
        mode="outlined"
        textContentType="password"
        secureTextEntry={true}
        requiredField
        minLength={8}
        setUseState={[password, setPassword]}
      />
      <PrmTextInput
        label="Confirme a senha"
        mode="outlined"
        textContentType="password"
        secureTextEntry={true}
        sameAs={password}
        requiredField
        setUseState={[confirmPassword, setConfirmPassword]}
      />
      <Button mode="contained" style={{ marginTop: 15 }}>
        Cadastrar!
      </Button>
    </View>
  );
}
export default RegisterFormComponent;
