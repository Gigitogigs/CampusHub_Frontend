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
import { useAppTheme } from './theme';
import DarkCardGradient from './DarkCardGradient';

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
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <AppText style={[styles.sectionTitle, { color: colors.text }]}>
          Quick actions
        </AppText>
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
                {
                  backgroundColor: colors.surface,
                  borderColor: isFeatured ? colors.accent : colors.border,
                },
                pressed && styles.pressed,
              ]}
            >
              <DarkCardGradient />
              <View
                style={[
                  styles.iconContainer,
                  {
                    backgroundColor: isFeatured
                      ? colors.accent
                      : colors.raisedSurface,
                  },
                ]}
              >
                <Icon
                  size={21}
                  color={isFeatured ? colors.accentForeground : colors.accent}
                  strokeWidth={2}
                />
              </View>
              <AppText style={[styles.actionLabel, { color: colors.text }]}>
                {label}
              </AppText>
              <ChevronRight
                size={16}
                color={isFeatured ? colors.accent : colors.secondaryText}
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
    fontSize: 19,
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  actionTile: {
    position: 'relative',
    overflow: 'hidden',
    width: '48%',
    minHeight: 104,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
    paddingHorizontal: 12,
    paddingVertical: 13,
    borderWidth: 1,
    borderRadius: 14,
  },
  iconContainer: {
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  actionLabel: {
    flex: 1,
    fontSize: 13,
    fontWeight: '600',
    lineHeight: 18,
  },
  pressed: {
    opacity: 0.7,
  },
});
