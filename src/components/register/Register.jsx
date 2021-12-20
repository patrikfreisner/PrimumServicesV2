import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Headline, Text } from "react-native-paper";
import RegisterFormComponent from "./FormComponent/RegistrationFormComponent";

// Set values for StyleComponent
var { width, height } = Dimensions.get("window");

function RegistrationComponent({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.mainViewContainer}>
        <View style={styles.greattingsAndLogoViewContainer}>
          <Image style={styles.logoImage} source={styles.logoImageUrl} />
          <Headline style={{ textAlign: "center" }}>
            Primeiro umas informações ;)
          </Headline>
        </View>
        <RegisterFormComponent />
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
    justifyContent: "center",
    marginTop: height * 0.11,
  },
  greattingsAndLogoViewContainer: {
    alignItems: "center",
    padding: 15,
    marginBottom: 10,
  },
  logoImage: {
    width: width * 0.5,
    height: height * 0.3,
    resizeMode: "contain",
  },
  logoImageUrl: require("../../assets/img/kisspng-jenkins-docker-continuous-delivery-installation-so-5afa799e532611.4457665715263645743406.png"),
});

export default RegistrationComponent;
