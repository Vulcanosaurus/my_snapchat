import AsyncStorage from "@react-native-async-storage/async-storage";

export default function logout(navigation) {
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem("token");
      const email = await AsyncStorage.getItem("email");
      if (value !== null) {
        // value previously stored
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("email");
        navigation.navigate("Home");
      }
    } catch (e) {
      // error reading value
    }
  };
  getData();
}
