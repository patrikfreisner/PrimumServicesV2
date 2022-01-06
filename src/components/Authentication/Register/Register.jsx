import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Headline, Text } from "react-native-paper";
import RegisterFormComponent from "./FormComponent/RegistrationFormComponent";

function RegistrationComponent({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.mainViewContainer}>
        <View style={styles.greattingsAndLogoViewContainer}>
          <Image style={styles.logoImage} source={require("../../../assets/img/jenkins_temp_logo.png")} />
          <Headline style={{ textAlign: "center" }}>
            Primeiro umas informações ;)
          </Headline>
        </View>
        <RegisterFormComponent navigation={navigation} />
        <Button
          mode="text"
          style={{ marginTop: 15 }}
          onPress={() => {
            navigation.push("login");
          }}
        >
          <Text style={{ fontSize: 12 }}>Já tem uma conta na Primum?</Text>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainViewContainer: {
    padding: 15,
    flex: 1,
    justifyContent: "center"
  },
  greattingsAndLogoViewContainer: {
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  logoImage: {
    width: '50%',
    height: '30vh',
    resizeMode: "contain",
  }
});

export default RegistrationComponent;
