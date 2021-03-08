import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useState } from "react";
import { ScrollView, ImageBackground, Dimensions, View } from "react-native";
import {
  Button,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "react-native-ui-kitten";
import { TOKEN } from "../../../common/keyStore";
import { Post } from "../../../library/networking/fetch";
import { ONBOARDING } from "../../../navigation/TypeScreen";
import { styles } from "./style";
const { height, width } = Dimensions.get("window");

interface RegisterProps {
  navigation: any;
  route: any;
}

export default function Register(props: RegisterProps) {
  const { navigation, route } = props;

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setConfirmPass] = useState("");

  const EmailIcon = (style: any) => <Icon {...style} name="email-outline" />;

  const PasswordIcon = (style: any) => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const LoadingIndicator = (props: any) => (
    <View>
      <Spinner size="small" status="danger" />
    </View>
  );

  const _onRegister = () => {
    setLoading(true);
    Post("/api/v1/auth/register", { email, password, password_confirmation })
      .then((response) => {
        response.json().then(async (data) => {
          if (data.message) {
            setLoading(false);
            setError(true);
          } else {
            let token = await JSON.stringify(data.access_token);
            await AsyncStorage.setItem(TOKEN, token);
            setEmail("");
            setPassword("");
            setConfirmPass("");
            setLoading(false);
            setError(false);
            navigation.navigate(ONBOARDING, { data });
          }
        });
      })
      .catch((e) => {
        console.log("_err: ", e);
      });
  };

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
              Vui lòng nhập các thông tin cơ bản để đăng ký tài khoản
            </Text>
          </Layout>
          <Layout style={styles.vForm}>
            <Input
              style={styles.vInput}
              size="large"
              status="primary"
              disabled={true}
              value={route.params.code}
            />
            <Input
              style={styles.vInput}
              size="large"
              // status={!error ? 'primary' : 'danger'}
              placeholder="Email ..."
              icon={EmailIcon}
              value={email}
              onChangeText={(email) => setEmail(email)}
            />
            <Input
              size="large"
              style={styles.vInput}
              status="primary"
              value={password}
              placeholder="Password ..."
              icon={PasswordIcon}
              secureTextEntry={secureTextEntry}
              onIconPress={onIconPress}
              onChangeText={(password) => setPassword(password)}
            />
            <Input
              size="large"
              style={styles.vInput}
              status="primary"
              value={password_confirmation}
              placeholder="Confirm Pass ..."
              icon={PasswordIcon}
              onIconPress={onIconPress}
              secureTextEntry={secureTextEntry}
              onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
            />
          </Layout>
          <Button
            size="large"
            icon={loading && LoadingIndicator}
            style={styles.vButton}
            onPress={_onRegister}
          >
            REGISTER
          </Button>
          <Text style={styles.content}>
            Bạn đã có tài khoản.{" "}
            <Text
              onPress={() => navigation.navigate("Login")}
              style={[styles.link, { fontSize: 16, color: "blue" }]}
            >
              Đăng nhập
            </Text>
          </Text>
        </Layout>
      </ImageBackground>
    </ScrollView>
  );
}
