import { ChevronRight } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';
import AppText from './AppText';

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
  return (
    <View style={styles.container}>
      <View style={styles.sectionHeader}>
        <AppText style={styles.sectionTitle}>School updates</AppText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="See all school updates"
          onPress={onPressSeeAll}
          style={({ pressed }) => [
            styles.seeAllButton,
            pressed && styles.pressed,
          ]}
        >
          <AppText style={styles.seeAllText}>See all</AppText>
          <ChevronRight size={16} color="#A5F52A" strokeWidth={2.5} />
        </Pressable>
      </View>

      {updates.length === 0 ? (
        <View style={styles.emptyCard}>
          <AppText style={styles.emptyTitle}>You’re all caught up</AppText>
          <AppText style={styles.emptyText}>
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
                  isUrgent && styles.urgentCard,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.cardTopRow}>
                  <View
                    style={[
                      styles.categoryPill,
                      isUrgent && styles.urgentPill,
                    ]}
                  >
                    {isUrgent && <View style={styles.urgentDot} />}
                    <AppText
                      style={[
                        styles.categoryText,
                        isUrgent && styles.urgentText,
                      ]}
                    >
                      {isUrgent ? 'Urgent' : update.category}
                    </AppText>
                  </View>
                  <AppText style={styles.timeText}>{update.timeLabel}</AppText>
                </View>

                <AppText style={styles.updateTitle}>{update.title}</AppText>
                <AppText style={styles.summary} numberOfLines={2}>
                  {update.summary}
                </AppText>

                <View style={styles.cardFooter}>
                  <AppText style={styles.sourceText}>{update.source}</AppText>
                  <ChevronRight size={18} color="#A6A6A6" strokeWidth={2} />
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
    color: '#FFFFFF',
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
    color: '#A5F52A',
    fontSize: 13,
    fontWeight: '600',
  },
  updateList: {
    gap: 10,
  },
  updateCard: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#484848',
    borderRadius: 14,
    backgroundColor: '#000000',
  },
  urgentCard: {
    borderColor: '#755047',
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
    backgroundColor: '#000000',
  },
  urgentPill: {
    backgroundColor: '#4B3533',
  },
  urgentDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF8A78',
  },
  categoryText: {
    color: '#D1D1D1',
    fontSize: 11,
    fontWeight: '600',
  },
  urgentText: {
    color: '#FFAA9C',
  },
  timeText: {
    color: '#A6A6A6',
    fontSize: 11,
  },
  updateTitle: {
    marginBottom: 5,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  summary: {
    color: '#C0C0C0',
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
    borderTopColor: '#505050',
  },
  sourceText: {
    color: '#A6A6A6',
    fontSize: 12,
    fontWeight: '500',
  },
  emptyCard: {
    padding: 18,
    borderWidth: 1,
    borderColor: '#484848',
    borderRadius: 14,
    backgroundColor: '#000000',
  },
  emptyTitle: {
    marginBottom: 4,
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  emptyText: {
    color: '#A6A6A6',
    fontSize: 13,
    lineHeight: 19,
  },
  pressed: {
    opacity: 0.75,
  },
});