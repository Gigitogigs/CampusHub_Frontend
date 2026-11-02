import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import { Search, X } from 'lucide-react-native';
import AppTextInput from './AppTextInput';
import { useAppTheme } from './theme';

type UniversalSearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onSubmit?: () => void;
};

export default function UniversalSearchBar({
  value,
  onChangeText,
  placeholder = 'Search CampusHub',
  onSubmit,
}: UniversalSearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          borderColor: isFocused ? colors.accent : colors.border,
        },
      ]}
    >
      <Search size={20} color={colors.supportingAccent} strokeWidth={2} />

      <AppTextInput
        accessibilityLabel="Search"
        style={[styles.input, { color: colors.text }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.secondaryText}
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor={colors.accent}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSubmitEditing={onSubmit}
      />

      {value.length > 0 && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Clear search"
          onPress={() => onChangeText('')}
          hitSlop={8}
        >
          <X size={20} color={colors.secondaryText} strokeWidth={2} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 14,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
  },
});