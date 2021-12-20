import React, { Component } from "react";
import { View, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";

function Common() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    firstName: "Bla bla",
  });

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

  return (
    <View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            mode="flat"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="firstName"
      />
      <_ErrorHandler
        control={control?._fields?.firstName?._f}
        type={errors.firstName}
      ></_ErrorHandler>
      <Button
        mode="outlined"
        onPress={handleSubmit(() => {
          console.log("Submitted");
        })}
      >
        Submit
      </Button>
    </View>
  );
}

export default Common;
