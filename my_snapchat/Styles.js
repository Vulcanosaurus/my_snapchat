import { StyleSheet, Dimensions } from "react-native";

let screenW = Dimensions.get("window").width;
let screenH = Dimensions.get("window").height;

const styles = StyleSheet.create({
  checkbox: {
    color: "white",
  },
  send: {
    backgroundColor: "#ffbc85",
    flex: 1,
    color: "white",
  },
  checkboxContainer: {
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 50,
    marginTop: 20,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textDecorationLine: "underline",
  },

  WelcomeText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginBottom: 15,
    textDecorationLine: "underline",
  },
  buttonLogin: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f28600",
    height: 55,
    width: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f28600",
    height: 55,
    width: 177,
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: {
    flex: 1,
    fontSize: 100,
  },
  text: {
    fontSize: 100,
  },
  buttonChange: {
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "white",
    width: 220,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  ButtonTextChange: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#f28600",
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  input: {
    marginTop: 5,
    marginBottom: 5,
    textAlign: "center",
    borderWidth: 1,
    borderColor: "white",
    backgroundColor: "#fff",
    height: 40,
    width: 220,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffbc85",
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
    height: null,
  },
  login: {
    alignItems: "center",
    justifyContent: "center",
  },
  register: {
    alignItems: "center",
    justifyContent: "center",
  },
  or: {
    fontWeight: "bold",
    fontSize: 15,
    color: "white",
  },
  head: {
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  buttonsView: {
    justifyContent: "flex-start",
  },
  messagerieView: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 7,
    backgroundColor: "#f28600",
    padding: 7,
    width: screenW / 3,
    height: screenW / 3,
  },
  dossierView: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 7,
    backgroundColor: "#f28600",
    padding: 7,
    width: screenW / 3,
    height: screenW / 3,
  },
  messagerieView: {
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 20,
    borderColor: "white",
    borderWidth: 7,
    backgroundColor: "#f28600",
    padding: 7,
    width: screenW / 3,
    height: screenW / 3,
  },
  dossier: {
    width: screenW / 4,
    height: screenW / 4,
  },
  messagerie: {
    width: screenW / 4,
    height: screenW / 4,
  },
  photo: {
    width: screenW / 4,
    height: screenW / 4,
  },
  boutton: {
    elevation: 8,
    backgroundColor: "#f28600",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 10,
  },
  bouttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
  },
});
export default styles;
