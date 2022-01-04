import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TheTestPage from "../components/CustomPrmForm/TheTestPage";

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
import LoginComponent from "../components/login/Login";
import RegistrationComponent from "../components/register/Register";

function MainRoutes() {
  const Stack = createNativeStackNavigator();
  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="register">
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
            name="test"
            component={TheTestPage}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainRoutes;
