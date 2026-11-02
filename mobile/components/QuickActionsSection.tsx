import {
  CalendarDays,
  ChevronRight,
  Plus,
  ShoppingBag,
  Wrench,
} from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import AppText from './AppText';

const actions = [
  { label: 'Browse marketplace', Icon: ShoppingBag },
  { label: 'Find a service', Icon: Wrench },
  { label: 'Sell an item', Icon: Plus, featured: true },
  { label: 'Campus events', Icon: CalendarDays },
] as const;

type QuickActionsSectionProps = {
  onPressAction?: (action: (typeof actions)[number]['label']) => void;
};

export default function QuickActionsSection({
  onPressAction,
}: QuickActionsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <AppText style={styles.sectionTitle}>Quick actions</AppText>
      </View>

      <View style={styles.grid}>
        {actions.map(({ label, Icon, ...action }) => {
          const isFeatured = 'featured' in action && action.featured;

          return (
            <Pressable
              key={label}
              accessibilityRole="button"
              accessibilityLabel={label}
              onPress={() => onPressAction?.(label)}
              style={({ pressed }) => [
                styles.actionTile,
                isFeatured && styles.featuredTile,
                pressed && styles.pressed,
              ]}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFeatured && styles.featuredIconContainer,
                ]}
              >
                <Icon
                  size={21}
                  color={isFeatured ? '#000000' : '#A5F52A'}
                  strokeWidth={2}
                />
              </View>
              <AppText style={styles.actionLabel}>{label}</AppText>
              <ChevronRight
                size={16}
                color={isFeatured ? '#A5F52A' : '#A6A6A6'}
                strokeWidth={2}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 22,
  },
  sectionHeader: {
    marginBottom: 13,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 19,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionTile: {
    width: '48%',
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderWidth: 1,
    borderColor: '#383838',
    borderRadius: 14,
    backgroundColor: '#000000',
  },
  featuredTile: {
    borderColor: '#A5F52A',
  },
  iconContainer: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    backgroundColor: '#181818',
  },
  featuredIconContainer: {
    backgroundColor: '#A5F52A',
  },
  actionLabel: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.7,
  },
});
