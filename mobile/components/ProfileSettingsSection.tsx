import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Bell,
  ChevronRight,
  CreditCard,
  Flame,
  LifeBuoy,
  LogOut,
  Moon,
  Pencil,
  Sun,
  Trash2,
  UserRound,
  UsersRound,
} from 'lucide-react-native';
import { useEffect, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  View,
} from 'react-native';
import AppText from './AppText';
import DarkCardGradient from './DarkCardGradient';
import { useAppTheme } from './theme';

const NOTIFICATIONS_STORAGE_KEY = 'campushub-notifications-enabled';

type ProfileActionRowProps = {
  label: string;
  description?: string;
  icon: typeof CreditCard;
  destructive?: boolean;
  onPress: () => void;
};

function ProfileActionRow({
  label,
  description,
  icon: Icon,
  destructive = false,
  onPress,
}: ProfileActionRowProps) {
  const { colors } = useAppTheme();
  const iconColor = destructive ? colors.urgentText : colors.accent;
  const iconBackground = destructive
    ? colors.urgentSurface
    : colors.raisedSurface;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.settingRow,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
        pressed && styles.pressed,
      ]}
    >
      <DarkCardGradient borderRadius={14} />
      <View
        style={[
          styles.rowIcon,
          { backgroundColor: iconBackground },
        ]}
      >
        <Icon size={19} color={iconColor} strokeWidth={2} />
      </View>
      <View style={styles.rowCopy}>
        <AppText
          style={[
            styles.rowTitle,
            { color: destructive ? colors.urgentText : colors.text },
          ]}
        >
          {label}
        </AppText>
        {description && (
          <AppText style={[styles.rowDescription, { color: colors.secondaryText }]}>
            {description}
          </AppText>
        )}
      </View>
      <ChevronRight size={18} color={colors.secondaryText} strokeWidth={2} />
    </Pressable>
  );
}

export default function ProfileSettingsSection() {
  const { mode, colors, setMode } = useAppTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [notificationsReady, setNotificationsReady] = useState(false);
  const [notificationError, setNotificationError] = useState<Error | null>(null);
  const isLightMode = mode === 'light';

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(NOTIFICATIONS_STORAGE_KEY)
      .then((storedValue) => {
        if (isMounted && (storedValue === 'true' || storedValue === 'false')) {
          setNotificationsEnabled(storedValue === 'true');
        }
      })
      .catch((cause: unknown) => {
        if (isMounted) {
          setNotificationError(
            cause instanceof Error
              ? cause
              : new Error('Unable to load notification preferences.'),
          );
        }
      })
      .finally(() => {
        if (isMounted) {
          setNotificationsReady(true);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!notificationsReady || notificationError) {
      return;
    }

    AsyncStorage.setItem(
      NOTIFICATIONS_STORAGE_KEY,
      String(notificationsEnabled),
    ).catch((cause: unknown) => {
      setNotificationError(
        cause instanceof Error
          ? cause
          : new Error('Unable to save notification preferences.'),
      );
    });
  }, [notificationError, notificationsEnabled, notificationsReady]);

  if (notificationError) {
    throw notificationError;
  }

  const showNotConnectedMessage = (feature: string) => {
    Alert.alert(
      feature,
      'This feature will be available when CampusHub account services are connected.',
    );
  };

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.header}>
        <AppText style={[styles.heading, { color: colors.text }]}>
          Profile
        </AppText>
        <View
          style={[
            styles.streakBadge,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <DarkCardGradient borderRadius={20} />
          <Flame size={15} color={colors.accent} strokeWidth={2} />
          <AppText style={[styles.streakText, { color: colors.text }]}>
            15 days
          </AppText>
        </View>
      </View>

      <View
        style={[
          styles.profileCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <DarkCardGradient />
        <View
          style={[
            styles.avatar,
            { backgroundColor: colors.raisedSurface },
          ]}
        >
          <UserRound size={25} color={colors.accent} strokeWidth={2} />
        </View>
        <View style={styles.profileCopy}>
          <AppText style={[styles.name, { color: colors.text }]}>
            CampusHub Student
          </AppText>
          <AppText style={[styles.email, { color: colors.secondaryText }]}>
            student@campushub.edu
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Edit profile"
          onPress={() => showNotConnectedMessage('Edit profile')}
          style={[
            styles.editButton,
            { backgroundColor: colors.raisedSurface },
          ]}
        >
          <Pencil size={17} color={colors.accent} strokeWidth={2} />
        </Pressable>
      </View>

      <AppText style={[styles.sectionTitle, { color: colors.secondaryText }]}>
        SETTINGS
      </AppText>

      <View style={styles.settingsList}>
        <ProfileActionRow
          label="Payments"
          description="Manage your campus payments"
          icon={CreditCard}
          onPress={() => showNotConnectedMessage('Payments')}
        />
        <ProfileActionRow
          label="Referrals"
          description="Invite friends to CampusHub"
          icon={UsersRound}
          onPress={() => showNotConnectedMessage('Referrals')}
        />

        <View
          style={[
            styles.settingRow,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <DarkCardGradient />
          <View
            style={[
              styles.rowIcon,
              { backgroundColor: colors.raisedSurface },
            ]}
          >
            <Bell size={19} color={colors.accent} strokeWidth={2} />
          </View>
          <View style={styles.rowCopy}>
            <AppText style={[styles.rowTitle, { color: colors.text }]}>
              Notifications
            </AppText>
            <AppText style={[styles.rowDescription, { color: colors.secondaryText }]}>
              School and campus alerts
            </AppText>
          </View>
          <Switch
            accessibilityLabel="Notifications"
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            trackColor={{
              false: colors.border,
              true: colors.accent,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View
          style={[
            styles.settingRow,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <DarkCardGradient />
          <View
            style={[
              styles.rowIcon,
              { backgroundColor: colors.raisedSurface },
            ]}
          >
            {isLightMode ? (
              <Sun size={19} color={colors.accent} strokeWidth={2} />
            ) : (
              <Moon size={19} color={colors.accent} strokeWidth={2} />
            )}
          </View>
          <View style={styles.rowCopy}>
            <AppText style={[styles.rowTitle, { color: colors.text }]}>
              Light mode
            </AppText>
            <AppText style={[styles.rowDescription, { color: colors.secondaryText }]}>
              Change the app appearance
            </AppText>
          </View>
          <Switch
            accessibilityLabel="Light mode"
            value={isLightMode}
            onValueChange={(enabled) => setMode(enabled ? 'light' : 'dark')}
            trackColor={{
              false: colors.border,
              true: colors.accent,
            }}
            thumbColor="#FFFFFF"
          />
        </View>

        <ProfileActionRow
          label="Support"
          description="Get help with CampusHub"
          icon={LifeBuoy}
          onPress={() => showNotConnectedMessage('Support')}
        />
        <ProfileActionRow
          label="Delete account"
          icon={Trash2}
          destructive
          onPress={() => {
            Alert.alert(
              'Delete account',
              'Account deletion is not available until CampusHub account services are connected.',
              [{ text: 'OK' }],
            );
          }}
        />
        <ProfileActionRow
          label="Log out"
          icon={LogOut}
          onPress={() => {
            Alert.alert(
              'Log out',
              'You are not currently signed in to a CampusHub account.',
              [{ text: 'OK' }],
            );
          }}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 18,
    paddingTop: 24,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  heading: {
    fontSize: 24,
    fontWeight: '700',
  },
  streakBadge: {
    position: 'relative',
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderWidth: 1,
    borderRadius: 20,
  },
  streakText: {
    fontSize: 12,
    fontWeight: '600',
  },
  profileCard: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 84,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderWidth: 1,
    borderRadius: 16,
  },
  avatar: {
    width: 48,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 24,
  },
  profileCopy: {
    flex: 1,
    gap: 4,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
  },
  email: {
    fontSize: 11,
  },
  editButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 18,
  },
  sectionTitle: {
    marginTop: 26,
    marginBottom: 12,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
  },
  settingsList: {
    gap: 9,
  },
  settingRow: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 14,
  },
  rowIcon: {
    width: 38,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  rowCopy: {
    flex: 1,
    gap: 3,
  },
  rowTitle: {
    fontSize: 13,
    fontWeight: '600',
  },
  rowDescription: {
    fontSize: 11,
    lineHeight: 15,
  },
  pressed: {
    opacity: 0.7,
  },
});
