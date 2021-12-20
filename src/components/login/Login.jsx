import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Headline, Subheading, Text } from "react-native-paper";
import LoginFormComponent from "./FormComponent/LoginFormComponent";

// Set values for StyleComponent
var { width, height } = Dimensions.get("window");

function LoginComponent({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.mainViewContainer}>
        <View style={styles.greattingsAndLogoViewContainer}>
          <Image style={styles.logoImage} source={styles.logoImageUrl} />
          <Headline style={{ textAlign: "center" }}>
            Bem vindo ao Charles.
          </Headline>
          <Subheading> Vamos começar? </Subheading>
        </View>
        <LoginFormComponent navigation={navigation} />
        <Button
          mode="text"
          style={{ marginTop: 15 }}
          onPress={() => {
            navigation.push("register");
          }}
        >
          <Text style={{ fontSize: 12 }}>Não tem uma conta na Primum?</Text>
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

export default LoginComponent;