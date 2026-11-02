import {
  Text as NativeText,
  StyleSheet,
  type TextProps,
} from 'react-native';
import { getPublicSansFamily } from './fonts';

export default function AppText({ style, ...props }: TextProps) {
  const fontWeight = StyleSheet.flatten(style)?.fontWeight;

  return (
    <NativeText
      {...props}
      allowFontScaling={false}
      style={[
        style,
        { fontFamily: getPublicSansFamily(fontWeight) },
      ]}
    />
  );
}
