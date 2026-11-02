
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from 'react-native';

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
  return (
    <View style={styles.container}>

      {/* Profile */}
      <Pressable
        onPress={onProfilePress}
        style={styles.profileButton}
        accessibilityRole="button"
        accessibilityLabel="Open profile"
      >
        <UserRound size={21} color="#A5F52A" strokeWidth={2} />
      </Pressable>

      {/* App branding */}
      <View style={styles.brandContainer}>
        <Text style={styles.brandText}>
          Campus <Text style={styles.brandAccent}>Hub</Text>
        </Text>
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
          <Bell size={23} color="#FFFFFF" strokeWidth={2} />

          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </Text>
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
          <Menu size={25} color="#FFFFFF" strokeWidth={2} />
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
    backgroundColor: '#000000',
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
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },

  brandAccent: {
    color: '#A5F52A',
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
    backgroundColor: '#A5F52A',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },

  badgeText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#242424',
  },

  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1.5,
    borderColor: '#A5F52A',
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
