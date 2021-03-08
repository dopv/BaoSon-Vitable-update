import { StyleSheet, Dimensions, StatusBar } from "react-native";
import { FONT_14, FONT_32 } from "../../../themes/fontSize";
const { height: heightScr, width } = Dimensions.get("window");
const statusBarHeight =
  (StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight) ||
  0;
const height = heightScr + statusBarHeight;

export const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#F7F4EB",
  },
  vView: {
    height: heightScr * 0.65,
    width,
    top: heightScr * 0.35,
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
  vLink: {
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  link: {
    textDecorationLine: "underline",
    textDecorationColor: "#188AB3",
  },
  vButton: {
    marginTop: 20,
    width: width * 0.5,
    borderRadius: 60,
  },
  content: {
    marginTop: 20,
  },
});
