import {
  StyleSheet,
  TextInput as NativeTextInput,
  type TextInputProps,
} from 'react-native';
import { getPublicSansFamily } from './fonts';

export default function AppTextInput({ style, ...props }: TextInputProps) {
  const fontWeight = StyleSheet.flatten(style)?.fontWeight;

  return (
    <NativeTextInput
      {...props}
      allowFontScaling={false}
      style={[
        style,
        { fontFamily: getPublicSansFamily(fontWeight) },
      ]}
    />
  );
}
