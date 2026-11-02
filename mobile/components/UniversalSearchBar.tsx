import { useState } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import { Search, X } from 'lucide-react-native';

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

  return (
    <View style={[styles.container, isFocused && styles.focusedContainer]}>
      <Search size={20} color="#A6A6A6" strokeWidth={2} />

      <TextInput
        accessibilityLabel="Search"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#A6A6A6"
        returnKeyType="search"
        autoCapitalize="none"
        autoCorrect={false}
        selectionColor="#A5F52A"
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
          <X size={20} color="#A6A6A6" strokeWidth={2} />
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
    borderColor: '#505050',
    borderRadius: 14,
    backgroundColor: '#000000',
  },
  focusedContainer: {
    borderColor: '#A5F52A',
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: '#FFFFFF',
    fontSize: 16,
  },
});