import * as React from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Text,
  Button,
  View,
  Linking,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  BackHandler,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dimensions } from "react-native";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

function GetSnapScreen({ navigation }) {
  const [userToken, setUserToken] = React.useState(null);
  const [requests, setRequests] = React.useState(null);
  const [image, setImage] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    const refresh = navigation.addListener("focus", getData);
    AsyncStorage.getItem("token").then((token) => {
      setUserToken(token);
    });
    getData();
    return refresh;
  }, [image, userToken, navigation]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getData();
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getData = async () => {
    let buttonWidth = (Dimensions.get("window").width * 3) / 4;
    if (userToken) {
      fetch("http://149.91.89.133:6088/snaps", {
        method: "GET",
        headers: {
          token: userToken,
        },
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setRequests(
            data.data.map((element, index) => {
              let date =
                element.createdAt.slice(0, 10) +
                " " +
                element.createdAt.slice(12, 19);
              return (
                <TouchableOpacity
                  key={element._id}
                  id={index}
                  style={{
                    margin: "auto",
                    textAlign: "center",
                    borderWidth: 7,
                    borderRadius: 15,
                    padding: 10,
                    paddingLeft: 15,
                    width: buttonWidth,
                    margin: 1,
                    backgroundColor:"#f28600",
                    borderColor: "white",
                  }}
                  onPress={async () => {
                    await fetch(
                      "http://149.91.89.133:6088/snap/" + element._id,
                      {
                        method: "get",
                        headers: {
                          token: userToken,
                        },
                      }
                    )
                      .then(async (res) => await res.json())
                      .then(async (data) => {
                        setTimeout(async () => {
                          setImage(false);
                          await fetch("http://149.91.89.133:6088/seen", {
                            method: "POST",
                            headers: {
                              "Content-type": "application/json",
                              token: userToken,
                            },
                            body: JSON.stringify({
                              id: element._id,
                            }),
                          })
                            .then((res) => res.text())
                            .then((data) => {});
                        }, element.duration * 1000);
                        setImage(
                          "http://149.91.89.133:6088/" + data.data.image.link
                        );
                      });
                  }}
                >
                  <Text style={styles.text}>From: {element.from}</Text>
                  <Text style={styles.text}>Sent: {date}</Text>
                  <Text style={styles.text}>Duration: {element.duration}s</Text>
                </TouchableOpacity>
              );
            })
          );
        });
    }
  };

  // var height = Dimensions.get("window").height;
  // var width = Dimensions.get("window").width;

  if (image) {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View
          style={{
            marginTop: 40,
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {requests}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
  },
  welcome: {
    flex: 1,
    marginTop: Dimensions.get("window").height / 40,
    fontSize: 50,
  },
  text: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#838383",
    backgroundColor: "#fff5f0",
    height: 40,
    width: 150,
    // borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffbc85",
    alignItems: "center",
    justifyContent: "center",
  },
  send: {
    backgroundColor: "#ffbc85",
    flex: 1,
    color: "white",
  },
});

export default GetSnapScreen;
