import React, { useState } from "react";
import { View, Text } from "react-native";
import { TextInput } from "react-native-paper";

const PrimumFormHandler = ({ children, onSubmit }) => {
  const [value, setValue] = useState("");

  const _children = React.Children.map(children, (child) => {
    console.log(child.$$typeof);
    return child;
  });

  return (
    <View>
      <Text></Text>
      {_children}
    </View>
  );
};

export default PrimumFormHandler;
