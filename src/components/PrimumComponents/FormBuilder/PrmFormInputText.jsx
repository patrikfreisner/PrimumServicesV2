import React from "react";
import { Controller, useWatch } from "react-hook-form";
import { HelperText, TextInput } from "react-native-paper";

function PrmFormInputText({ control, errors, name, watch, rules: { validate, ...rules }, messages, ...props }) {

  const typoHandler = (_var, field) => {
    if (!_var) return {};

    let varFields = Object.keys(_var);
    let hasValue = varFields.some((item) => {
      return item == field;
    });
    if (hasValue) {
      return _var[field];
    } else {
      return {};
    }
  };

  const validateConfirmPassword = () => {
    let _passw = watch("password");
    let _conf_passw = watch("confirm_password");
    return _passw == _conf_passw;
  };

  if (validate) {
    if (!!validate['confirm_password']) {
      validate['confirm_password'] = () => {
        return validateConfirmPassword();
      };
    }
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ validate, ...rules }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextInput
            {...props}
            key={name}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      <_ErrorHandler
        control={typoHandler(control?._fields, name)?._f}
        type={typoHandler(errors, name)?.type}
        messages={messages}
      ></_ErrorHandler>
    </>
  );
}

const _ErrorHandler = ({ control, type, messages }) => {
  if (type == "required") {
    return (
      <HelperText type="error" visible={!!type}>
        Este campo é obrigatorio!
      </HelperText>
    );
  } else if (type == "minLength") {
    return (
      <HelperText type="error" visible={!!type}>
        Campo não pode ser menor que {control?.minLength} caracteres! {/* (atual{" "} {control?.value?.length}) */}
      </HelperText>
    );
  } else if (type == "maxLength") {
    return (
      <HelperText type="error" visible={!!type}>
        Campo não pode ser maior que {control?.maxLength} caracteres! {/* (atual{" "} {control?.value?.length}) */}
      </HelperText>
    );
  } else if (type == "pattern") {
    if (!messages) {
      return (<HelperText type="error" visible={!!type}>
        Por favor verifique o valor informado!
      </HelperText>);
    } else if (!Object.keys(messages).some((key) => { return key == type })) {
      return (<HelperText type="error" visible={!!type}>
        Por favor verifique o valor informado!
      </HelperText>);
    }

    return (
      <HelperText type="error" visible={!!type}>
        {messages[type]}
      </HelperText>
    );
  } else if (!!type) {
    if (!messages) {
      return (<HelperText type="error" visible={!!type}>
        Por favor verifique o valor informado!
      </HelperText>);
    } else if (!Object.keys(messages).some((key) => { return key == type })) {
      return (<HelperText type="error" visible={!!type}>
        Por favor verifique o valor informado!
      </HelperText>);
    }

    return (
      <HelperText type="error" visible={!!type}>
        {messages[type]}
      </HelperText>
    );
  } else {
    return <></>;
  }
};

export default PrmFormInputText;
