import {
  PublicSans_100Thin,
  PublicSans_200ExtraLight,
  PublicSans_300Light,
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  PublicSans_800ExtraBold,
  PublicSans_900Black,
} from '@expo-google-fonts/public-sans';

export const publicSansFonts = {
  PublicSans_100Thin,
  PublicSans_200ExtraLight,
  PublicSans_300Light,
  PublicSans_400Regular,
  PublicSans_500Medium,
  PublicSans_600SemiBold,
  PublicSans_700Bold,
  PublicSans_800ExtraBold,
  PublicSans_900Black,
};

const publicSansFamilyByWeight: Record<string, string> = {
  '100': 'PublicSans_100Thin',
  '200': 'PublicSans_200ExtraLight',
  '300': 'PublicSans_300Light',
  '400': 'PublicSans_400Regular',
  '500': 'PublicSans_500Medium',
  '600': 'PublicSans_600SemiBold',
  '700': 'PublicSans_700Bold',
  '800': 'PublicSans_800ExtraBold',
  '900': 'PublicSans_900Black',
  normal: 'PublicSans_400Regular',
  bold: 'PublicSans_700Bold',
};

export function getPublicSansFamily(fontWeight?: string | number) {
  return publicSansFamilyByWeight[String(fontWeight ?? '400')]
    ?? 'PublicSans_400Regular';
}
