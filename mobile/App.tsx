
import { useState } from 'react';

import HomeHeader from './components/HomeHeader';
import UniversalSearchBar from './components/UniversalSearchBar';
import UpdatesSection from './components/UpdatesSection';
import {
  House,
  Grid2X2,
  ShoppingCart,
  UserRound,
} from 'lucide-react-native';

import {
  Pressable,
  StyleSheet,
  View,
} from 'react-native';

import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';

import { StatusBar } from 'expo-status-bar';

// Navigation tabs
const tabs = [
  { name: 'Home', icon: House },
  { name: 'Categories', icon: Grid2X2 },
  { name: 'Cart', icon: ShoppingCart },
  { name: 'Profile', icon: UserRound },
] as const;

type TabName = (typeof tabs)[number]['name'];

// Main application
export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.screen}
        edges={['top', 'bottom']}
      >
        <StatusBar style="light" />

        {/* Main content */}
         <View style={styles.content}>
  <HomeHeader
    notificationCount={2}
    onMenuPress={() => console.log('Menu pressed')}
    onNotificationsPress={() => console.log('Notifications pressed')}
    onProfilePress={() => console.log('Profile pressed')}
  />
          <UniversalSearchBar
  value={searchQuery}
  onChangeText={setSearchQuery}
/>
          {activeTab !== 'Home' && (
            <View style={styles.emptyContent} />
          )}
       {activeTab === 'Home' ? (
  <UpdatesSection />
) : (
  <View style={styles.emptyContent} />
)}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const isActive = tab.name === activeTab;
            const color = isActive ? '#A5F52A' : '#A6A6A6';

            const Icon = tab.icon;

            return (
              <Pressable
                key={tab.name}
                accessibilityRole="tab"
                accessibilityLabel={tab.name}
                accessibilityState={{ selected: isActive }}
                onPress={() => setActiveTab(tab.name)}
                style={({ pressed }) => [
                  styles.tab,
                  pressed && styles.pressedTab,
                ]}
              >
                <Icon
                  size={25}
                  color={color}
                  strokeWidth={isActive ? 2.5 : 2}
                />
              </Pressable>
            );
          })}
        </View>

      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Styles
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#000000',
  },

  content: {
    flex: 1,
    backgroundColor: '#000000',
  },

  emptyContent: {
    flex: 1,
  },

  tabBar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#505050',
  },

  tab: {
    flex: 1,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  pressedTab: {
    opacity: 0.65,
  },
});
