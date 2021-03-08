import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#F7F4EB",
  },
  vView: {
    height: height * 0.75,
    width,
    top: height * 0.3,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: "center",
  },
  vHeader: {
    alignItems: "center",
  },
  vTitle: {
    fontSize: 32,
    fontWeight: "bold",
  },
  vContent: {
    fontSize: 18,
    textAlign: "center",
  },
  vButton: {
    marginTop: 20,
    width: width * 0.5,
    borderRadius: 60,
  },
  vForm: {
    marginTop: 20,
  },
  vInput: {
    width: width - 40,
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 40,
    borderColor: "#000",
  },
  link: {
    textDecorationLine: "underline",
    textDecorationColor: "#188AB3",
  },
  content: {
    marginTop: 20,
  },
});
