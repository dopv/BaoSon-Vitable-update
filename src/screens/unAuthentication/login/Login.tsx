import React, { useEffect, useState } from "react";
import {
  TextInput,
  View,
  TouchableOpacity,
  ScrollView,
  ImageBackground,
  Dimensions,
  StatusBar,
  Linking,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import { Screen } from "../../../library/components/screen/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Get, Post } from "../../../library/networking/fetch";
import { validateEmail } from "../../../library/utils/validate";
import { TOKEN, IS_ONBOARDING } from "../../../common/keyStore";
import { styles } from "./BSstyle";
import { translate } from "../../../library/utils/i18n/translate";
import { ProcessDialog } from "../../../library/components/processDialog";
import {
  trackEvent,
  trackCurrentScreen,
} from "../../../library/analytics-tracking";
import { ONBOARDING } from "../../../navigation/TypeScreen";
import DropDownHolder from "../../../library/utils/dropDownHolder";
import Constants from "expo-constants";
import { useContainer } from "../../../store/store";
import {
  Layout,
  Text,
  Button,
  Input,
  Radio,
  Icon,
  Spinner,
} from "react-native-ui-kitten";
const {
  manifest: {
    extra: { boarding },
  },
} = Constants;

const { height: heightScr, width } = Dimensions.get("window");
const statusBarHeight =
  (StatusBar.currentHeight &&
    StatusBar.currentHeight >= 38 &&
    StatusBar.currentHeight) ||
  0;
const height = heightScr + statusBarHeight;

interface LoginProps {
  navigation: any;
}

export const Login = (props: LoginProps) => {
  const { navigation } = props;

  const [checked, setChecked] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [dataLogin, setDataLogin] = useState({ email: "", password: "" });
  // const [validateInputEmail, setValidateInputEmail] = useState("");
  // const [validateInputPassword, setValidateInputPassword] = useState("");
  const [isLogin, setLogin] = useState(false);
  const [loginState, setLoginState] = useState("");
  const setUserInfo = useContainer((container) => container.getUserInfoAction);

  useEffect(() => {
    trackCurrentScreen("ForgotPassword");
  }, []);

  const onChange = (key: string, value: string) => {
    // if (key === "email" && value !== "") {
    //   setValidateInputEmail("");
    // }
    // if (key === "password" && value !== "") {
    //   setValidateInputPassword("");
    // }
    setLoginState("");
    setDataLogin({
      ...dataLogin,
      [key]: value,
    });
  };

  const onPressToLogin = () => {
    setLoading(true);
    if (isLogin) return;
    trackEvent("CLICKED_LOGIN", "clicked login", "login", "login action");
    setLoginState("");
    // if (!dataLogin.email || !validateEmail(dataLogin.email)) {
    //   setValidateInputEmail(`${translate("UNAUTHENTIC:INVALID_EMAIL")}`);
    //   return;
    // }
    // setValidateInputEmail("");
    // if (!dataLogin.password) {
    //   setValidateInputPassword(`${translate("UNAUTHENTIC:INVALID_PASSWORD")}`);
    //   return;
    // }
    // setValidateInputPassword("");
    setLogin(true);
    Post("/api/v1/auth/login", dataLogin)
      .then((response) => {
        response.json().then(async (data) => {
          if (data.message) {
            setLoginState(data.message);
            trackEvent("LOGIN_FAILURE", "login_failure", "login");
            setLoading(false);
            setError(true);
          } else {
            // if (boarding) {
            //     navigation && navigation.navigate(ONBOARDING, { data: data })
            // } else {
            // AsyncStorage.getItem(IS_ONBOARDING).then((checkBoarding: any) => {
            //     if (checkBoarding) {
            //         AsyncStorage.setItem(TOKEN, JSON.stringify(data.access_token));
            //         actionLogin && actionLogin(data || null);
            //     } else {
            navigation && navigation.navigate(ONBOARDING, { data: data });
            // }
            // })
            // }

            trackEvent(
              "LOGIN_SUCCESS",
              "login_success",
              "login",
              "go to home screen"
            );
            setDataLogin({ email: "", password: "" });
            setLoading(false);
            setError(false);
          }
          setLogin(false);
        });
      })
      .catch((err) => {
        trackEvent("LOGIN_EXCEPTION", "login_exception", "login");
        setLogin(false);
        DropDownHolder.showError("", err);
        console.log("err", err);
      });
  };

  const getUserInfo = (token: string) => {
    Get(`/api/v1/me/profile`)
      .then((response) => {
        response.json().then((data) => {
          setUserInfo(data.data, token);
        });
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const onPressToForgot = () => {
    navigation && navigation.navigate("ForgotPassword");
  };

  const onPressGoToWeb = () => {
    Linking.openURL("https://www.vitable.com.au/");
  };

  const onIconPress = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const EmailIcon = (style: any) => <Icon {...style} name="email-outline" />;

  const PasswordIcon = (style: any) => (
    <Icon {...style} name={secureTextEntry ? "eye-off" : "eye"} />
  );

  const LoadingIndicator = (props: any) => (
    <View>
      <Spinner size="small" status="danger" />
    </View>
  );

  return (
    <ScrollView style={styles.fullScreen}>
      <ImageBackground
        source={require("../../../../assets/images/login-bg.jpg")}
        style={{ width: width, height: height }}
        resizeMode="stretch"
      >
        <Layout style={styles.vView}>
          <Layout style={styles.vHeader}>
            <Text style={styles.vTitle}>Đăng nhập</Text>
            {!error ? (
              <Text style={styles.vContent}>
                Để sử dụng App, vui lòng đăng nhập tài khoản đã đăng ký với hệ
                thống
              </Text>
            ) : (
              <Text style={[styles.vContent, { color: "red" }]}>
                {loginState}
              </Text>
            )}
          </Layout>
          <Layout style={styles.vForm}>
            <Input
              style={styles.vInput}
              size="large"
              status={!error ? "primary" : "danger"}
              placeholder={`${translate("UNAUTHENTIC:EMAIL")}...`}
              icon={EmailIcon}
              value={dataLogin.email}
              onChangeText={(email) =>
                onChange ? onChange("email", email) : null
              }
            />
            <Input
              size="large"
              style={styles.vInput}
              status={!error ? "primary" : "danger"}
              value={dataLogin.password}
              placeholder={`${translate("UNAUTHENTIC:PASSWORD")}...`}
              icon={PasswordIcon}
              onIconPress={onIconPress}
              secureTextEntry={secureTextEntry}
              onChangeText={(password) =>
                onChange ? onChange("password", password) : null
              }
            />
            <Layout style={styles.vLink}>
              <Radio
                text="Save"
                checked={checked}
                onChange={(nextChecked) => setChecked(nextChecked)}
              />
              <Text style={styles.link}>{`${translate(
                "UNAUTHENTIC:FORGOT_PASSWORD"
              )}`}</Text>
            </Layout>
          </Layout>
          <Button
            onPress={onPressToLogin}
            icon={loading && LoadingIndicator}
            size="large"
            style={styles.vButton}
          >
            LOGIN
          </Button>
          <Text style={styles.content}>
            Bạn chưa có tài khoản.{" "}
            <Text
              onPress={() => navigation.navigate("Protector")}
              style={[styles.link, { fontSize: 16, color: "blue" }]}
            >
              Đăng ký
            </Text>
          </Text>
        </Layout>
      </ImageBackground>
    </ScrollView>

    // <Screen
    //     isScroll={false}
    //     hidden={false}
    //     backgroundColor={'#fff'}
    //     forceInset={{ bottom: 'never', top: 'never' }}
    // >
    //     <ScrollView style={styles.fullScreen}>
    //         <ImageBackground
    //             source={require('../../../../assets/images/login-bg.png')}
    //             style={{
    //                 width: width,
    //                 height: height
    //             }}
    //             resizeMode="stretch"
    //         >
    //             <ProcessDialog visible={isLogin} />
    //             <Image
    //                 source={require('../../../../assets/images/Logo-black.png')}
    //                 style={styles.sImgLogo}
    //             />
    //             <View
    //                 style={styles.vHeader}
    //             >
    //                 <Text
    //                     allowFontScaling={false}
    //                     style={styles.sTextTopHeader}
    //                 >
    //                     {translate('UNAUTHENTIC:FIRST_SIGNIN')}
    //                 </Text>
    //                 <View style={styles.vContent}>
    //                     <Text
    //                         allowFontScaling={false}
    //                         style={styles.sTextContentHeader}
    //                     >
    //                         {translate('UNAUTHENTIC:FOR_THE_MOMENT')}
    //                         {translate('UNAUTHENTIC:NEW_LINE')}
    //                         {translate('UNAUTHENTIC:TO_DISCOVER_OUR_OFFER')}
    //                         {translate('UNAUTHENTIC:SPACE')}
    //                         <TouchableWithoutFeedback
    //                             onPress={onPressGoToWeb}
    //                             style={{ zIndex: 2 }}
    //                         >
    //                             <Text
    //                                 allowFontScaling={false} style={styles.sTextLink}>{translate('UNAUTHENTIC:LINK')}
    //                             </Text>
    //                         </TouchableWithoutFeedback>
    //                     </Text>
    //                 </View>
    //             </View>
    //             <View
    //                 style={styles.vFormInput}
    //             >
    //                 <View
    //                     style={styles.vInputEmail}
    //                 >
    //                     <Text
    //                         allowFontScaling={false} style={[styles.sTextLabel, validateInputEmail !== ''
    //                             && { color: '#F5785A' }]}
    //                     >
    //                         {translate('UNAUTHENTIC:EMAIL')}
    //                     </Text>
    //                     <View>
    //                         <TextInput
    //                             allowFontScaling={false}
    //                             value={dataLogin.email}
    //                             onChangeText={(email) => onChange ? onChange('email', email) : null}
    //                             style={[styles.sInput, validateInputEmail !== '' && { color: '#F5785A' }]}
    //                             placeholder={`${translate('UNAUTHENTIC:ENTER_MAIL_HERE')}`}
    //                         />
    //                     </View>
    //                     {validateInputEmail !== '' && <Text
    //                         allowFontScaling={false}
    //                         style={styles.sTextInvalid}
    //                     >
    //                         {validateInputEmail}
    //                     </Text>}
    //                 </View>
    //                 <View
    //                     style={[styles.vInputEmail, { marginTop: height * 0.028169 }]}
    //                 >
    //                     <Text
    //                         allowFontScaling={false} style={[styles.sTextLabel, validateInputPassword !== ''
    //                             && { color: '#F5785A' }]}>
    //                         {translate('UNAUTHENTIC:PASSWORD')}
    //                     </Text>
    //                     <View>
    //                         <TextInput
    //                             allowFontScaling={false}
    //                             value={dataLogin.password}
    //                             onChangeText={(password) => onChange ? onChange('password', password) : null}
    //                             style={styles.sInput}
    //                             secureTextEntry={true}
    //                             placeholder={`${translate('UNAUTHENTIC:ENTER_PASSWORD_HERE')}`}
    //                         />
    //                     </View>
    //                     {validateInputPassword !== '' && <Text
    //                         allowFontScaling={false}
    //                         style={styles.sTextInvalid}
    //                     >
    //                         {validateInputPassword}
    //                     </Text>}
    //                 </View>
    //             </View>
    //             {loginState !== '' && <Text
    //                 allowFontScaling={false}
    //                 style={styles.sTextLoginFailed}
    //             >
    //                 {translate('UNAUTHENTIC:INCORRECT_LOGIN')}
    //             </Text>}
    //             <View
    //                 style={styles.vFormAction}
    //             >
    //                 <TouchableOpacity
    //                     style={styles.vButton}
    //                     onPress={onPressToLogin}
    //                 >
    //                     <Text
    //                         allowFontScaling={false}
    //                         style={styles.sTextSingIn}
    //                     >
    //                         {translate('UNAUTHENTIC:SIGNIN')}
    //                     </Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity
    //                     style={{ zIndex: 2 }}
    //                     onPress={onPressToForgot}
    //                 >
    //                     <Text
    //                         allowFontScaling={false}
    //                         style={styles.sTextForgot}
    //                     >
    //                         {translate('UNAUTHENTIC:FORGOT_PASSWORD')}
    //                     </Text>
    //                 </TouchableOpacity>
    //             </View>
    //         </ImageBackground>
    //     </ScrollView>
    // </Screen>
  );
};
