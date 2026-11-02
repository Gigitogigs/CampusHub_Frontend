import { ChevronRight } from 'lucide-react-native';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
        <Text style={styles.sectionTitle}>School updates</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="See all school updates"
          onPress={onPressSeeAll}
          style={({ pressed }) => [
            styles.seeAllButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.seeAllText}>See all</Text>
          <ChevronRight size={16} color="#A5F52A" strokeWidth={2.5} />
        </Pressable>
      </View>

      {updates.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>You’re all caught up</Text>
          <Text style={styles.emptyText}>
            New school announcements will appear here.
          </Text>
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
                    <Text
                      style={[
                        styles.categoryText,
                        isUrgent && styles.urgentText,
                      ]}
                    >
                      {isUrgent ? 'Urgent' : update.category}
                    </Text>
                  </View>
                  <Text style={styles.timeText}>{update.timeLabel}</Text>
                </View>

                <Text style={styles.updateTitle}>{update.title}</Text>
                <Text style={styles.summary} numberOfLines={2}>
                  {update.summary}
                </Text>

                <View style={styles.cardFooter}>
                  <Text style={styles.sourceText}>{update.source}</Text>
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