import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const fontConfig = {
  default: {
    regular: {
      fontFamily: "OpenSans-Regular",
      fontWeight: 'normal',
    },
  },
};

// React Native Paper
import { configureFonts, DefaultTheme, Provider as PaperProvider } from "react-native-paper";
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
  fontConfig: configureFonts(fontConfig),
};

// Components import
import LoginComponent from "../components/Authentication/Login/Login";
import RegistrationComponent from "../components/Authentication/Register/Register";
import HomePage from "../components/HomePage/HomePage";

// Context
import { useLoginContext } from '../context/LoginContext';
import { RegisterProvider } from '../context/RegisterContext';
import ConfirmAccount from "../components/Authentication/Login/ConfirmAccount";
import ForgotPassword from "../components/Authentication/Login/ForgotPassword";

function MainRoutes() {
  const Stack = createNativeStackNavigator();
  const { isAuthenticated, checkIsAuthenticated } = useLoginContext();

  useEffect(() => {
    checkIsAuthenticated();
  }, [isAuthenticated]);

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="login">
          {!isAuthenticated ? (
            <>
              <Stack.Screen
                name="login"
                component={LoginComponent}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="register"
                options={{ headerShown: false }}
                children={(props) => (
                  <RegisterProvider>
                    <RegistrationComponent {...props} />
                  </RegisterProvider>
                )}
              />
              <Stack.Screen
                name="confirm_account"
                options={{ presentation: 'modal', headerTitle: "Confirme sua conta Primum!", headerTitleAlign: 'center' }}
                children={(props) => (
                  <RegisterProvider>
                    <ConfirmAccount {...props} />
                  </RegisterProvider>
                )}
              />
              <Stack.Screen
                name="forgot_password"
                options={{ presentation: 'modal', headerTitle: "Esqueceu sua senha?", headerTitleAlign: 'center' }}
                component={ForgotPassword}
              />
            </>
          ) : (
            <>
              <Stack.Screen
                name="home"
                component={HomePage}
                options={{ headerShown: false }}
              />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

export default MainRoutes;
