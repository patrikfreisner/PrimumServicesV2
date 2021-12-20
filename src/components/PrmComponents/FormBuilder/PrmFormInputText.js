import React from "react";
import { Controller } from "react-hook-form";
import { HelperText } from "react-native-paper";
import { TextInput } from "react-native";

function PrmFormInputText({ control, errors, name, rules }) {
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

  return (
    <>
      <Controller
        control={control}
        name={name}
        rules={{ ...rules }}
        render={({ field: { onChange, onBlur, value, name } }) => (
          <TextInput
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
      ></_ErrorHandler>
    </>
  );
}

const _ErrorHandler = ({ control, type }) => {
  if (type == "required") {
    return (
      <HelperText type="error" visible={!!type}>
        Este campo é obrigatorio!
      </HelperText>
    );
  } else if (type == "minLength") {
    return (
      <HelperText type="error" visible={!!type}>
        Campo não pode ser menor que {control?.minLength} (atual{" "}
        {control?.value?.length})
      </HelperText>
    );
  } else if (type == "maxLength") {
    return (
      <HelperText type="error" visible={!!type}>
        Campo não pode ser maior que {control?.maxLength} (atual{" "}
        {control?.value?.length})
      </HelperText>
    );
  } else {
    return <></>;
  }
};

export default PrmFormInputText;
