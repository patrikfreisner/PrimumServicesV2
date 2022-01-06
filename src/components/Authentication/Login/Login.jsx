import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Button, Headline, Subheading, Text } from "react-native-paper";
import LoginFormComponent from "./FormComponent/LoginFormComponent";

function LoginComponent({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.mainViewContainer}>
        <View style={styles.greattingsAndLogoViewContainer}>
          <Image style={styles.logoImage} source={require("../../../assets/img/jenkins_temp_logo.png")} />
          <Headline style={{ textAlign: "center" }}>
            Bem vindo ao Charles.
          </Headline>
          <Subheading> Vamos começar? </Subheading>
        </View>
        <LoginFormComponent navigation={navigation} />
        <Button mode="text" style={{ marginTop: 15 }}
          onPress={() => {
            navigation.push("register");
          }}
        >
          <Text style={{ fontSize: 12 }}>Não tem uma conta na Primum?</Text>
        </Button>
        <Button mode="text" style={{ marginTop: 15 }}
          onPress={() => {
            navigation.push("forgot_password");
          }}
        >
          <Text style={{ fontSize: 12 }}>Esqueceu sua senha?</Text>
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
    marginTop: '7vh',
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

export default LoginComponent;
