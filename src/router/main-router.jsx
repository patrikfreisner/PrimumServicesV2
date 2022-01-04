import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// React Native Paper
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
const theme = {
  ...DefaultTheme,
  roundness: 5,
  colors: {
    ...DefaultTheme.colors,
    primary: "#0094e4",
    accent: "#ab1400",
    background: "#f2f2f2",
    text: "#000000",
  },
};

// Components import
import LoginComponent from "../components/Authentication/Login/Login";
import RegistrationComponent from "../components/Authentication/Register/Register";
import HomePage from "../components/HomePage/HomePage";

function MainRoutes() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="home">
          <Stack.Screen
            name="login"
            component={LoginComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="register"
            component={RegistrationComponent}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="home"
            component={HomePage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainRoutes;
