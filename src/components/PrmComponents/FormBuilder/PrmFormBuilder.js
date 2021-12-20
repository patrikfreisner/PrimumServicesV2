import React from "react";
import { useForm } from "react-hook-form";
import { View, Text } from "react-native";

function PrmFormBuilder({ onSubmit, defaultValues, children }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  return (
    <View>
      <Text> PrmFormBuilder </Text>

      {React.Children.map(children, (child) => {
        if (!child.props.name && child.type.name === "PrmFormInputText") {
          throw "Can't accept 'PrmFormInputText' field type without 'name' attribute!";
        }

        if (child.props.type === "submit") {
          return React.createElement(child.type, {
            ...child.props,
            onPress: handleSubmit(onSubmit),
            // NEW PROPS HERE
          });
        } else {
          return React.createElement(child.type, {
            ...child.props,
            control: control,
            errors: errors,
          });
        }
      })}
    </View>
  );
}

export default PrmFormBuilder;
