import React, { useState } from "react";
import { View } from "react-native";
import { Button, Portal, Dialog, IconButton, Paragraph } from "react-native-paper";
import { useRegisterContext } from "../../../../context/RegisterContext";
import PrmFormBuilder from "../../../PrimumComponents/FormBuilder/PrmFormBuilder";
import PrmFormInputText from "../../../PrimumComponents/FormBuilder/PrmFormInputText";

function RegisterFormComponent({ navigation }) {

  const [errorDialogModal, setErrorDialogModal] = useState({
    hasError: false,
    hasSuccess: false,
    message: ""
  });
  const { registerNewUser } = useRegisterContext();

  const _patternValueForEmail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?: [\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
  const _patternValueForPassw = /(?=.{8,})(?=.*?[0-9])(?=.*?[A-Z]).*?[a-z].*/

  function onRegister(formValues) {
    console.log(formValues);
    registerNewUser(formValues, (msg, response) => {
      console.log(msg);
      console.log(response);

      if (!msg) {
        // Thats OK message.
        setErrorDialogModal({
          hasSuccess: true,
          message: "Registro iniciado! Confirmação de email encaminhada para " + formValues.email
        });
      }

      if (msg) {
        if (msg == "An account with the given email already exists.") {
          setErrorDialogModal({
            hasError: true,
            message: "Já existe um usuário cadastrado com esse e-mail!"
          });
        } else if (msg == "Password did not conform with policy: Password must have uppercase characters") {
          setErrorDialogModal({
            hasError: true,
            message: "Senha não permitida! Sua senha deve ter no minimo uma letra maiúscula!"
          });
        } else {
          setErrorDialogModal({
            hasError: true,
            message: "Ocorreu um problema ao fazer seu registro, por favor tente novamente!"
          });
        }
      }
    })
  }

  return (
    <View>
      <PrmFormBuilder
        defaultValues={{ name: "", nickname: "", email: "", password: "", confirm_password: "" }}
        onSubmit={onRegister}>
        <PrmFormInputText
          label="Nome"
          name="name"
          mode="outlined"
          rules={{ required: true }}
          keyboardType="default"
        />
        <PrmFormInputText
          label="Usuário"
          name="nickname"
          mode="outlined"
          rules={{ required: true }}
          keyboardType="email-address"
        />
        <PrmFormInputText
          label="Email"
          name="email"
          mode="outlined"
          rules={{ required: true, pattern: _patternValueForEmail }}
          messages={{ pattern: "Email informado não é valido!" }}
          keyboardType="email-address"
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
          Cadastrar!
        </Button>
      </PrmFormBuilder>
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
    </View>
  );
}
export default RegisterFormComponent;
