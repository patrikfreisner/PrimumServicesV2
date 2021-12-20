import React, { useEffect, useState, useMemo } from "react";
import { View } from "react-native";
import { TextInput, HelperText } from "react-native-paper";

function PrmTextInput({
  setUseState,
  requiredField,
  maxLength,
  minLength,
  sameAs,
  ...props
}) {
  // Use state
  const [value, setValue] = setUseState;
  const [errorHandler, setErrorHandler] = useState({
    hasError: false,
    errorMsg: "",
  });

  useEffect(() => {
    if (sameAs) {
      if (sameAs != value) {
        setErrorHandler({
          hasError: true,
          errorMsg: "Campo de confirmação não é igual!",
        });
        return;
      }
    }
    setErrorHandler({});
  }, [sameAs]);

  return (
    <View>
      <TextInput
        {...props}
        value={value}
        error={errorHandler.hasError}
        onBlur={() => {
          if (requiredField) {
            if (value.trim() === "") {
              setErrorHandler({
                hasError: true,
                errorMsg: "Campo é obrigatorio!",
              });
            }
          }
          if (sameAs) {
            if (sameAs != value) {
              setErrorHandler({
                hasError: true,
                errorMsg: "Campo de confirmação não é igual!",
              });
              return;
            }
          }
        }}
        onChangeText={(valueText) => {
          setValue(valueText);
          if (minLength) {
            if (valueText.length < minLength) {
              setErrorHandler({
                hasError: true,
                errorMsg:
                  "Senha deve ter mais que " + minLength + " caracteres!",
              });
              return;
            }
          }

          if (maxLength) {
            if (valueText.length > maxLength) {
              setErrorHandler({
                hasError: true,
                errorMsg:
                  "Senha deve ter menos que " + maxLength + " caracteres!",
              });
              return;
            }
          }

          setErrorHandler({
            hasError: false,
            errorMsg: "",
          });
        }}
      />
      <ErrorHint errorConfig={errorHandler} />
    </View>
  );
}

function ErrorHint({ errorConfig }) {
  if (errorConfig.hasError) {
    return (
      <HelperText type="error" visible={errorConfig.hasError}>
        {errorConfig.errorMsg}
      </HelperText>
    );
  } else {
    return <></>;
  }
}

export default PrmTextInput;
