import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  CheckBox,
  View,
  TextInput,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import styles from "./Styles.js";

export default function LoginRegister({ navigation }) {
  const [swapForm, setSwapForm] = useState(0);

  function checkRegister() {
    if (!emailRegister || !confirmRegister || !passwordRegister) {
      Alert.alert("Champ(s) vide(s)");
    } else {
      if (passwordRegister.length >= 6) {
        if (confirmRegister === passwordRegister) {
          fetch("http://149.91.89.133:6088/Inscription", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: emailRegister,
              password: passwordRegister,
            }),
          })
            .then((res) => res.json())
            .then(async (message) => {
              if (message.status == 200) {
                setSwapForm(0);
                setEmailLogin(emailRegister);
              } else {
                Alert.alert("erreur : " + message.message);
              }
            });
        } else {
          Alert.alert("Password doesn't match");
        }
      } else {
        Alert.alert("Password is too short");
      }
    }
  }
  function checkLogin() {
    if (!emailLogin || !passwordLogin) {
      Alert.alert("champ(s) vide(s)");
    } else {
      fetch("http://149.91.89.133:6088/connection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailLogin,
          password: passwordLogin,
        }),
      })
        .then((res) => res.json())
        .then(async (message) => {
          if (message.status == 200) {
            await AsyncStorage.setItem("remember", rememberMe).then(
              async () => {
                await AsyncStorage.setItem("token", message.data.token).then(
                  async () => {
                    await AsyncStorage.setItem("email", emailLogin).then(
                      async () => {
                        navigation.navigate("Accueil");
                      }
                    );
                  }
                );
              }
            );
          } else {
            Alert.alert("erreur : " + message.message);
          }
        });
    }
  }

  const [emailRegister, setEmailRegister] = React.useState("");
  const [passwordRegister, setPasswordRegister] = React.useState("");
  const [confirmRegister, setConfirmRegister] = React.useState("");
  const [emailLogin, setEmailLogin] = React.useState("");
  const [passwordLogin, setPasswordLogin] = React.useState("");
  const [selected, setSelected] = React.useState(true);
  const [rememberMe, setRememberMe] = React.useState("true");

  function changeRemember() {
    if (selected === true) {
      setSelected(false);
      setRememberMe("false");
    } else {
      setSelected(true);
      setRememberMe("true");
    }
  }
  if (swapForm == 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SNAPSHOT</Text>
        <View style={styles.login}>
          <Text style={styles.head}>-CONNEXION-</Text>
          <TextInput
            value={emailLogin}
            onChangeText={(emailLogin) => setEmailLogin(emailLogin)}
            name="email"
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#ffbc85"
          />
          <TextInput
            value={passwordLogin}
            onChangeText={(passwordLogin) => setPasswordLogin(passwordLogin)}
            name="password"
            style={styles.input}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="#ffbc85"
          />
          <View style={styles.checkboxContainer}>
            <CheckBox
              style={styles.checkbox}
              value={selected}
              onValueChange={changeRemember}
            />
            <Text style={styles.or}>Remember Me</Text>
          </View>
          <TouchableOpacity onPress={checkLogin} style={styles.buttonLogin}>
            <Text style={styles.ButtonText}>Login</Text>
          </TouchableOpacity>
          <Text style={styles.or}>or</Text>
          <TouchableOpacity
            onPress={() => setSwapForm(1)}
            style={styles.buttonChange}
          >
            <Text style={styles.ButtonTextChange}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SNAPSHOT</Text>
        <View style={styles.register}>
          <Text style={styles.head}>-INSCRIPTION-</Text>
          <StatusBar style="auto" />
          <TextInput
            value={emailRegister}
            onChangeText={(emailRegister) => setEmailRegister(emailRegister)}
            name="email"
            style={styles.input}
            placeholder="email"
            placeholderTextColor="#ffbc85"
          />
          <TextInput
            value={passwordRegister}
            onChangeText={(passwordRegister) =>
              setPasswordRegister(passwordRegister)
            }
            name="password"
            style={styles.input}
            secureTextEntry={true}
            placeholder="password"
            placeholderTextColor="#ffbc85"
          />
          <TextInput
            value={confirmRegister}
            onChangeText={(confirmRegister) =>
              setConfirmRegister(confirmRegister)
            }
            name="confirm"
            style={styles.input}
            secureTextEntry={true}
            placeholder="confirm"
            placeholderTextColor="#ffbc85"
          />
          <TouchableOpacity
            color="#f28600"
            onPress={checkRegister}
            style={styles.button}
          >
            <Text style={styles.ButtonText}>Register</Text>
          </TouchableOpacity>
          <Text style={styles.or}>or</Text>
          <TouchableOpacity
            color="#f28600"
            onPress={() => setSwapForm(0)}
            style={styles.buttonChange}
          >
            <Text style={styles.ButtonTextChange}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
