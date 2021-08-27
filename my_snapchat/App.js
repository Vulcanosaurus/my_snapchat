import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import {
  View,
  Text,
  // ViewStyle,
  // TextStyle,
  // TextInputProps,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SendSnapScreen from "./PostSnap";
import GetSnapScreen from "./GetSnap";
// import PostTest from "./PostTest";
import Accueil from "./accueil.js";
// import Profile from "./profile.js";
import LoginRegister from "./LoginRegister.js";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App({ navigation }) {
  function Screen() {
    const [log, setLog] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(true);
    const [token, setToken] = React.useState(false);

    useEffect(() => {
      AsyncStorage.getItem("token").then((token) => {
        setToken(token);
        setIsLoading(false);
      });
      if (token) {
        setLog(true);
      }
    }, [token, isLoading]);

    if (isLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={log ? "Accueil" : "Home"}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Home" component={LoginRegister} />
          <Stack.Screen name="Accueil" component={Accueil} />
          <Stack.Screen name="Send Snap" component={SendSnapScreen} />
          <Stack.Screen name="Get Snap" component={GetSnapScreen} />
          {/* <Stack.Screen name="Post Test" component={PostTest} /> */}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return <Screen />;
}
