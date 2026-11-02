
import React from 'react';
import {
  View,
  StyleSheet,
  Pressable,
} from 'react-native';

import AppText from './AppText';
import { useAppTheme } from './theme';
import {
  Menu,
  Bell,
  UserRound,
} from 'lucide-react-native';

interface HomeHeaderProps {
  onMenuPress?: () => void;
  onNotificationsPress?: () => void;
  onProfilePress?: () => void;
  notificationCount?: number;
}

export default function HomeHeader({
  onMenuPress,
  onNotificationsPress,
  onProfilePress,
  notificationCount = 2,
}: HomeHeaderProps) {
  const { colors } = useAppTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>

      {/* Profile */}
      <Pressable
        onPress={onProfilePress}
        style={[
          styles.profileButton,
          {
            backgroundColor: colors.surface,
            borderColor: colors.accent,
          },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
      >
        <UserRound
          size={21}
          color={colors.supportingAccent}
          strokeWidth={2}
        />
      </Pressable>

      {/* App branding */}
      <View style={styles.brandContainer}>
        <AppText style={[styles.brandText, { color: colors.text }]}>
          Campus <AppText style={{ color: colors.accent }}>Hub</AppText>
        </AppText>
      </View>

      {/* Right side actions */}
      <View style={styles.actionsContainer}>

        {/* Notifications */}
        <Pressable
          onPress={onNotificationsPress}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel={`${notificationCount} notifications`}
        >
          <Bell size={23} color={colors.text} strokeWidth={2} />

          {notificationCount > 0 && (
            <View
              style={[
                styles.notificationBadge,
                { backgroundColor: colors.accent },
              ]}
            >
              <AppText
                style={[
                  styles.badgeText,
                  { color: colors.accentForeground },
                ]}
              >
                {notificationCount > 9 ? '9+' : notificationCount}
              </AppText>
            </View>
          )}
        </Pressable>

        {/* Menu button */}
        <Pressable
          onPress={onMenuPress}
          style={styles.iconButton}
          accessibilityRole="button"
          accessibilityLabel="Open menu"
        >
          <Menu size={25} color={colors.text} strokeWidth={2} />
        </Pressable>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 64,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
  },

  iconButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },

  brandContainer: {
    flex: 1,
    alignItems: 'center',
  },

  brandText: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },

  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  notificationBadge: {
    position: 'absolute',
    top: 2,
    right: 1,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '800',
  },

  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
