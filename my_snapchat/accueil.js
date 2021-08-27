import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import setItem from "./setItem.js";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Icon from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import * as FileSystem from "expo-file-system";

import {
  View,
  TextInput,
  Text,
  StyleSheet,
  Button,
  Alert,
  AppState,
  Image,
  TouchableOpacity,
  Dimensions,
  BackHandler,
  // ViewStyle,
  // TextStyle,
  // TextInputProps,
} from "react-native";
// import { TouchableOpacity } from "react-native-gesture-handler";

import logout from "./logout.js";
import styles from "./Styles.js";

export default function Accueil({ navigation }) {
  const [user, setUser] = React.useState(null);
  const [selectedImage, setSelectedImage] = React.useState(false);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedDuration, setSelectedDuration] = React.useState(null);
  const [displayUsers, setDisplayUsers] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [userToken, setUserToken] = React.useState(null);
  const [rememberMe, setRememberMe] = React.useState(false);

  const backAction = () => {
    if (navigation.isFocused()) {
      if (!selectedImage) {
        Alert.alert("Hold on!", "Are you sure you want to exit the app?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel",
          },
          {
            text: "YES",
            onPress: async () => {
              console.log("rem", rememberMe);
              if (rememberMe === "false") {
                await AsyncStorage.removeItem("token");
                await AsyncStorage.removeItem("email");
                navigation.navigate("Home");
                BackHandler.exitApp();
              }
              if (rememberMe === "true") {
                BackHandler.exitApp();
              }
            },
          },
        ]);
        return true;
      }
      if (selectedImage) {
        setSelectedImage(false);
      }
      console.log("shoot");
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    AsyncStorage.getItem("token").then((token) => {
      setUserToken(token);
    });
    AsyncStorage.getItem("remember").then((rememberMe) => {
      setRememberMe(rememberMe);
    });
    if (userToken) {
      fetch("http://149.91.89.133:6088/all", {
        method: "GET",
        headers: {
          token: userToken,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data);
        })
        .then(() => {
          if (users) {
            setDisplayUsers(
              users.map((e) => {
                return (
                  <Picker.Item label={e.email} value={e.email} key={e.email} />
                );
              })
            );
          }
        });
      return () => backHandler.remove();
    }
  }, [userToken, selectedImage, rememberMe]);

  // AppState.addEventListener("change", () => {
  //   console.log("userToken is ", userToken !== false);
  // });
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("email");
      if (value !== null) {
        // value previously stored
        setUser(value);
      }
    } catch (e) {
      // error reading value
    }
  };
  getData();
  let openCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();

    if (pickerResult.cancelled === true) {
      return;
    }

    var filename = pickerResult.uri.replace(/^.*[\\\/]/, "");

    setSelectedImage({
      uri: pickerResult.uri,
      name: filename,
      type: "image/" + filename.split(".").pop(),
    });
  };

  let openImagePickerAsync = async () => {
    let permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
    });

    if (pickerResult.cancelled === true) {
      return;
    }

    var filename = pickerResult.uri.replace(/^.*[\\\/]/, "");
    setSelectedImage({
      uri: pickerResult.uri,
      name: filename,
      type: "image/" + filename.split(".").pop(),
    });
  };
  if (selectedImage) {
    return (
      <View style={styles.send}>
        <Picker
          style={{
            borderWidth: 1,
            borderColor: "black",
            padding: 5,
            marginTop: 100,
            color: "white",
          }}
          selectedValue={selectedUser}
          onValueChange={(itemValue, itemIndex) => {
            console.log(itemValue);
            setSelectedUser(itemValue);
          }}
        >
          {displayUsers}
        </Picker>
        <TextInput
          placeholder="Enter snap duration..."
          placeholderTextColor= "#fff"
          numeric
          style={{
            borderWidth: 1,
            borderColor: "#f28600",
            padding: 5,
            margin: 5,
            color: "#fff",
          }}
          keyboardType={"numeric"}
          onChangeText={(itemValue, itemIndex) => {
            setSelectedDuration(itemValue);
          }}
        />
        <TouchableOpacity style={styles.boutton}
       onPress={async () => {
        let send = await FileSystem.uploadAsync(
          "http://149.91.89.133:6088/snap",
          selectedImage.uri,
          {
            httpMethod: "POST",
            headers: {
              "Content-type": "multipart/form-data",
              token: userToken
            },
            fieldName: "image",
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            parameters: {
              duration: selectedDuration,
              to: selectedUser,
            },
          }

        );
        setSelectedUser("");
        setSelectedDuration("");
        setSelectedImage("");
        console.log(send.status);
      }}
      >
        <Text style={styles.bouttonText}>Send</Text>
       
      </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SNAPSHOT</Text>
      {/* <View style={styles.welcome}>
        <Text style={styles.WelcomeText}>Welcome {user}</Text>
      </View> */}
      <View style={styles.buttonsView}>
        <View style={styles.messagerieView}>
          <TouchableOpacity
            style={styles.messagerie}
            onPress={() => {
              navigation.navigate("Get Snap");
            }}
          >
            <Image
              source={require("./messagerie.png")}
              style={styles.messagerie}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.messagerieView}>
          <TouchableOpacity
            style={styles.dossier}
            onPress={openImagePickerAsync}
          >
            <Image source={require("./dossier.png")} style={styles.dossier} />
          </TouchableOpacity>
        </View>
        <View style={styles.messagerieView}>
          <TouchableOpacity style={styles.photo} onPress={openCameraAsync}>
            <Image source={require("./photo.png")} style={styles.photo} />
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => logout(navigation)}
        style={styles.button}
      >
        <Text style={styles.ButtonText}>logout</Text>
      </TouchableOpacity>
    </View>
  );
}

// let imageWidth = (Dimensions.get("window").width * 3) / 8;
// let imageHeight = Dimensions.get("window").height / 5;

// const styles = StyleSheet.create({
//   button: {
//     borderRadius: 10,
//   },
//   welcome: {
//     flex: 1,
//     marginTop: Dimensions.get("window").height / 40,
//     fontSize: 50,
//   },
//   text: {
//     fontSize: 50,
//   },
//   dossier: {
//     width: imageWidth,
//     height: imageHeight,
//     marginBottom: 70,
//   },

//   messagerie: {
//     width: imageWidth,
//     height: imageHeight,
//     marginBottom: 60,
//   },
//   photo: {
//     width: imageWidth,
//     height: imageHeight,
//     marginBottom: 40,
//   },
//   input: {
//     marginTop: 5,
//     marginBottom: 5,
//     textAlign: "center",
//     borderWidth: 1,
//     borderColor: "#838383",
//     backgroundColor: "#fff5f0",
//     height: 40,
//     width: 150,
//     borderRadius: 10,
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#ffbc85",
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   send: {
//     backgroundColor: "#ffbc85",
//     flex: 1,
//     color: "white",
//   },
// });
