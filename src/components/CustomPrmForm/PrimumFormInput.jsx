import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";

const PrimumFormInput = ({
  setUseState,
  requiredField,
  maxLength,
  minLength,
  sameAs,
  ...props
}) => {
  const [value, setValue] = useState("");

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={(text) => {
          setValue(text);
        }}
        {...props}
      />
    </View>
  );
};

export default PrimumFormInput;
