import * as React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  View,
  SafeAreaView
} from 'react-native';
// import { SafeAreaView } from 'react-navigation';
/**
 * All screen keyboard offsets.
 */
export const offsets = {
  none: 0,
};

/**
 * The variations of keyboard offsets.
 */

/**
 * All the variations of screens.
 */
export const presets = {
  /**
   * No scrolling. Suitable for full-screen carousels and components
   * which have built-in scrolling like FlatList.
   */
  fixed: {
    outer: {
      backgroundColor: "#FF0200",
      flex: 1,
      height: '100%',
    },
    outer0: {
      flex: 0,
    },
    inner: {
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      flex: 1,
    },
  },

  /**
   * Scrolls. Suitable for forms or other things requiring a keyboard.
   *
   * Pick this one if you don't know which one you want yet.
   */
  scroll: {
    outer: {
      backgroundColor: "#FF0200",
      flex: 1,
      height: '100%',
    },
    inner: { justifyContent: 'flex-start', alignItems: 'stretch' },
  },
};

const isIos = Platform.OS === 'ios';

function ScreenWithoutScrolling(props: any) {
  const preset = presets['fixed'];
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const Wrapper = props.unsafe ? View : View;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      behavior={isIos ? 'padding' : undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        hidden={props.hidden === true ? true : false}
        backgroundColor={props.statusColor || "transparent"}
        translucent={true}
        barStyle={props.statusBar || 'dark-content'}
      />
      {props.draw === false && (
        <SafeAreaView
          style={[
            preset.outer0,
            { backgroundColor: props.statusColor || "transparent" },
          ]}
        />
      )}
      <Wrapper style={[preset.inner, style, backgroundStyle]}>
        {props.children}
      </Wrapper>
      {/*{props.draw === false && (*/}
      {/*  <SafeAreaView*/}
      {/*    style={[*/}
      {/*      preset.outer0,*/}
      {/*      {backgroundColor: props.bottomIPX || '#0057b6'},*/}
      {/*    ]}*/}
      {/*  />*/}
      {/*)}*/}
    </KeyboardAvoidingView>
  );
}

function ScreenWithScrolling(props: any) {
  const preset = presets['scroll'];
  const style = props.style || {};
  const backgroundStyle = props.backgroundColor
    ? { backgroundColor: props.backgroundColor }
    : {};
  const Wrapper = props.unsafe ? View : SafeAreaView;

  return (
    <KeyboardAvoidingView
      style={[preset.outer, backgroundStyle]}
      // behavior={isIos ? 'padding' : null}
      behavior={undefined}
      keyboardVerticalOffset={0}>
      <StatusBar
        hidden={props.hidden === true ? true : false}
        backgroundColor={props.statusColor || "#eb3323"}
        translucent={props.draw ? true : false}
        barStyle={props.statusBar || 'dark-content'}
      />
      {props.draw === false && (
        <SafeAreaView
          style={[
            { backgroundColor: props.statusColor || "#eb3323" },
          ]}
        />
      )}
      <Wrapper style={[preset.outer, backgroundStyle]}>
        <ScrollView
          showsVerticalScrollIndicator={props.showVertical}
          showsHorizontalScrollIndicator={props.showHorizontal}
          keyboardShouldPersistTaps="handled"
          style={[preset.outer, backgroundStyle]}
          contentContainerStyle={[preset.inner, style]}>
          {props.children}
        </ScrollView>
      </Wrapper>
      {props.draw === false && (
        <SafeAreaView
          style={[
            { backgroundColor: props.bottomIPX || "#eb3323" },
          ]}
        />
      )}
    </KeyboardAvoidingView>
  );
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export const Screen =(props: any) => {
  if (props.isScroll) {
    return <ScreenWithScrolling {...props} />;
  } else {
    return <ScreenWithoutScrolling {...props} />;
  }
}
