import * as React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  RefreshControl,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
  View,
  StyleSheet,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { withRepeat } from "react-native-reanimated";

function SendSnapScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [selectedDuration, setSelectedDuration] = React.useState(null);
  const [users, setUsers] = React.useState(null);
  const [userToken, setUserToken] = React.useState(null);

  useEffect(() => {
    const refresh = navigation.addListener("focus", getData);
    AsyncStorage.getItem("token").then((token) => {
      setUserToken(token);
    });
    getData();
    return refresh;
  }, [userToken, navigation]);

  const getData = async () => {
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
        });
    }
  };

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

  let displayUsers = [];

  if (users !== null) {
    displayUsers = users.map((e) => {
      return <Picker.Item label={e.email} value={e.email} key={e.email} />;
    });
  }

  return (
    <View style={{ marginTop: 55 }}>
      <Text>Send Snap</Text>
      <TextInput
        placeholder="Enter snap duration..."
        numeric
        style={{ borderWidth: 1, borderColor: "black", padding: 5, margin: 5 }}
        keyboardType={"numeric"}
        onChangeText={(itemValue, itemIndex) => {
          setSelectedDuration(itemValue);
        }}
        value={selectedDuration}
      />
      <Picker
        style={{ borderWidth: 1, borderColor: "black", padding: 5 }}
        selectedValue={selectedUser}
        onValueChange={(itemValue, itemIndex) => {
          setSelectedUser(itemValue);
        }}
      >
        {displayUsers}
      </Picker>
      <TouchableOpacity
        style={{ padding: 10, borderWidth: 1, margin: 5 }}
        onPress={openImagePickerAsync}
      >
        <Text>Pick a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ padding: 10, borderWidth: 1, margin: 5 }}
        onPress={openCameraAsync}
      >
        <Text>Use Camera</Text>
      </TouchableOpacity>
      <Button
        title="Send"
        onPress={async () => {
          let send = await FileSystem.uploadAsync(
            "http://149.91.89.133:6088/snap",
            selectedImage.uri,
            {
              httpMethod: "POST",
              headers: {
                "Content-type": "multipart/form-data",
                token: userToken,
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
          console.log("Status :", send.status);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default SendSnapScreen;
