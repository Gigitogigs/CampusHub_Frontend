import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useAppTheme } from './theme';

type DarkCardGradientProps = {
  borderRadius?: number;
};

export default function DarkCardGradient({
  borderRadius = 14,
}: DarkCardGradientProps) {
  const { mode } = useAppTheme();

  if (mode !== 'dark') {
    return null;
  }

  return (
    <LinearGradient
      colors={['#171717', '#292929', '#3A3A3A']}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { borderRadius }]}
    />
  );
}
