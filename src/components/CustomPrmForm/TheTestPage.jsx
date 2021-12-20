import React from "react";
import { View, Button, TextInput, Text } from "react-native";
import { useForm, Controller } from "react-hook-form";
import PrmFormBuilder from "../PrmComponents/FormBuilder/PrmFormBuilder";
import PrmFormInputText from "../PrmComponents/FormBuilder/PrmFormInputText";

const TheTestPage = () => {
  const submitted = () => {
    console.log("Submitted!!!! >>>>>");
  };
  // const {
  //   control,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   defaultValues: {
  //     firstName: "",
  //     lastName: "",
  //   },
  // });
  // const onSubmit = (data) => console.log(data);

  return (
    <View style={{ padding: 30 }}>
      {/* <Controller
        control={control}
        rules={{
          required: true,
          minLength: 6,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="firstName"
      />
      {errors.firstName && <Text>This is required.</Text>}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput onBlur={onBlur} onChangeText={onChange} value={value} />
        )}
        name="lastName"
      />

      <Button title="Submit" onPress={handleSubmit(onSubmit)} /> */}
      <PrmFormBuilder
        defaultValues={{
          firstName: "",
          lastName: ""
        }}
        onSubmit={submitted}
      >
        <PrmFormInputText
          name="firstName"
          rules={{ required: true, minLength: 8 }}
        />
        <PrmFormInputText
          name="lastName"
          rules={{ required: true, minLength: 8 }}
        />

        <Button type="submit" mode="outlined" title="Enviar!" />
      </PrmFormBuilder>
    </View>
  );
};

export default TheTestPage;
