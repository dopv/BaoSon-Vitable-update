import React from "react";
import {
  ImageBackground,
  Dimensions,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button, Icon, Input, Layout, Text } from "react-native-ui-kitten";
const { height, width } = Dimensions.get("window");

interface LoginProps {
  navigation: any;
}

export default function Protector(props: LoginProps) {
  const [protectedCode, setProtectedCode] = React.useState("");

  const LockIcon = (style: any) => <Icon {...style} name="lock-outline" />;

  return (
    <ScrollView style={styles.fullScreen}>
      <ImageBackground
        source={require("../../../../assets/images/login-bg.jpg")}
        style={{ width: width, height: height }}
        resizeMode="stretch"
      >
        <Layout style={styles.vView}>
          <Layout style={styles.vHeader}>
            <Text style={styles.vTitle}>Đăng ký</Text>
            <Text style={styles.vContent}>
              Nhập mã của người bảo trợ để đăng ký tài khoản
            </Text>
          </Layout>
          <Input
            placeholder="Code..."
            style={styles.vInput}
            size="large"
            icon={LockIcon}
            value={protectedCode}
            onChangeText={(nextText) => setProtectedCode(nextText)}
          />
          <Button
            style={styles.vButton}
            onPress={() =>
              props.navigation.navigate("Register", { code: protectedCode })
            }
            size="large"
          >
            Tiếp tục
          </Button>
        </Layout>
      </ImageBackground>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fullScreen: {
    flex: 1,
    backgroundColor: "#F7F4EB",
  },
  vView: {
    height: height * 0.4,
    width,
    top: height * 0.6,
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
  vInput: {
    width: width - 40,
    color: "#000",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 40,
    borderColor: "#000",
    marginTop: 20,
  },
  vButton: {
    marginTop: 20,
    width: width * 0.5,
    borderRadius: 60,
  },
});
