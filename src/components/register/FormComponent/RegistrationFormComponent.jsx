import React, { useState } from "react";
import { useWatch } from "react-hook-form";
import { View } from "react-native";
import { Button } from "react-native-paper";
import PrmFormBuilder from "../../PrmComponents/FormBuilder/PrmFormBuilder";
import PrmFormInputText from "../../PrmComponents/FormBuilder/PrmFormInputText";

function RegisterFormComponent() {

  const _patternValue = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?: [\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

  // const [name, setName] = useState("");
  // const [user, setUser] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View>
      <PrmFormBuilder onSubmit={(resp) => {
        console.log(resp);
      }}>
        <PrmFormInputText
          label="Nome"
          name="name"
          mode="outlined"
          rules={{ required: true }}
          keyboardType="default"
        />
        <PrmFormInputText
          label="Usuário"
          name="user"
          mode="outlined"
          rules={{ required: true }}
          keyboardType="email-address"
        />
        <PrmFormInputText
          label="Email"
          name="email"
          mode="outlined"
          rules={{ required: true, pattern: _patternValue }}
          messages={{ pattern: "Email informado não é valido!" }}
          keyboardType="email-address"
        />
        <PrmFormInputText
          label="Senha"
          name="password"
          mode="outlined"
          rules={{ required: true, minLength: 8 }}
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
          Cadastrar!
        </Button>
      </PrmFormBuilder>
    </View>
  );
}
export default RegisterFormComponent;
