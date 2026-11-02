import { ChevronRight } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import AppText from './AppText';
import { useAppTheme } from './theme';
import DarkCardGradient from './DarkCardGradient';

export type SchoolUpdate = {
  id: string;
  title: string;
  summary: string;
  source: string;
  timeLabel: string;
  category: string;
  priority?: 'normal' | 'urgent';
};

type UpdatesSectionProps = {
  updates?: SchoolUpdate[];
  onPressUpdate?: (update: SchoolUpdate) => void;
  onPressSeeAll?: () => void;
};

const sampleUpdates: SchoolUpdate[] = [
  {
    id: 'registration-deadline',
    title: 'Course registration closes Friday',
    summary: 'Review your selected courses and submit any changes before the deadline.',
    source: 'Academic Affairs',
    timeLabel: '2 hours ago',
    category: 'Academic',
    priority: 'urgent',
  },
  {
    id: 'library-hours',
    title: 'Updated library hours this week',
    summary: 'The main library will stay open later during the exam period.',
    source: 'Campus Library',
    timeLabel: 'Yesterday',
    category: 'Campus',
  },
  {
    id: 'student-forum',
    title: 'Student forum next Wednesday',
    summary: 'Meet school representatives and share feedback about campus life.',
    source: 'Student Affairs',
    timeLabel: 'Yesterday',
    category: 'Events',
  },
];

export default function UpdatesSection({
  updates = sampleUpdates,
  onPressUpdate,
  onPressSeeAll,
}: UpdatesSectionProps) {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <AppText style={[styles.sectionTitle, { color: colors.text }]}>
          School updates
        </AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="See all school updates"
          onPress={onPressSeeAll}
          style={({ pressed }) => [
            styles.seeAllButton,
            pressed && styles.pressed,
          ]}
        >
          <AppText
            style={[styles.seeAllText, { color: colors.supportingAccent }]}
          >
            See all
          </AppText>
          <ChevronRight
            size={16}
            color={colors.supportingAccent}
            strokeWidth={2.5}
          />
        </Pressable>
      </View>

      {updates.length === 0 ? (
        <View
          style={[
            styles.emptyCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <DarkCardGradient />
          <AppText style={[styles.emptyTitle, { color: colors.text }]}>
            You’re all caught up
          </AppText>
          <AppText style={[styles.emptyText, { color: colors.secondaryText }]}>
            New school announcements will appear here.
          </AppText>
        </View>
      ) : (
        <View style={styles.updateList}>
          {updates.map((update) => {
            const isUrgent = update.priority === 'urgent';

            return (
              <Pressable
                key={update.id}
                accessibilityRole="button"
                accessibilityLabel={`${isUrgent ? 'Urgent update. ' : ''}${update.title}`}
                onPress={() => onPressUpdate?.(update)}
                style={({ pressed }) => [
                  styles.updateCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: isUrgent ? colors.urgentBorder : colors.border,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <DarkCardGradient />
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.categoryPill,
                      {
                        backgroundColor: isUrgent
                          ? colors.urgentSurface
                          : colors.raisedSurface,
                      },
                    ]}
                  >
                    {isUrgent && (
                      <View
                        style={[
                          styles.urgentDot,
                          { backgroundColor: colors.urgentDot },
                        ]}
                      />
                    )}
                    <AppText
                      style={[
                        styles.categoryText,
                        {
                          color: isUrgent
                            ? colors.urgentText
                            : colors.categoryText,
                        },
                      ]}
                    >
                      {isUrgent ? 'Urgent' : update.category}
                    </AppText>
                  </View>
                  <AppText
                    style={[styles.timeText, { color: colors.secondaryText }]}
                  >
                    {update.timeLabel}
                  </AppText>
                </View>

                <AppText style={[styles.updateTitle, { color: colors.text }]}>
                  {update.title}
                </AppText>
                <AppText
                  style={[styles.summary, { color: colors.mutedText }]}
                  numberOfLines={2}
                >
                  {update.summary}
                </AppText>

                <View
                  style={[
                    styles.cardFooter,
                    { borderTopColor: colors.divider },
                  ]}
                >
                  <AppText
                    style={[
                      styles.sourceText,
                      { color: colors.secondaryText },
                    ]}
                  >
                    {update.source}
                  </AppText>
                  <ChevronRight
                    size={18}
                    color={colors.secondaryText}
                    strokeWidth={2}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '700',
  },
  seeAllButton: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '600',
  },
  updateList: {
    gap: 10,
  },
  updateCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: 14,
    borderWidth: 1,
    borderRadius: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryPill: {
    minHeight: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 9,
    borderRadius: 12,
  },
  urgentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  categoryText: {
    fontSize: 11,
    fontWeight: '600',
  },
  timeText: {
    fontSize: 11,
  },
  updateTitle: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  summary: {
    fontSize: 13,
    lineHeight: 19,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  sourceText: {
    fontSize: 12,
    fontWeight: '500',
  },
  emptyCard: {
    position: 'relative',
    overflow: 'hidden',
    padding: 18,
    borderWidth: 1,
    borderRadius: 14,
  },
  emptyTitle: {
    marginBottom: 4,
    fontSize: 15,
    fontWeight: '700',
  },
  emptyText: {
    fontSize: 13,
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.75,
  },
});