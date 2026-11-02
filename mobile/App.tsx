
import { useRef, useState } from 'react';

import HomeHeader from './components/HomeHeader';
import UniversalSearchBar from './components/UniversalSearchBar';
import UpdatesSection from './components/UpdatesSection';
import PagerView from 'react-native-pager-view';
import {
  House,
  Grid2X2,
  ShoppingCart,
  UserRound,
} from 'lucide-react-native';

import {
  Animated,
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
  const [tabBarWidth, setTabBarWidth] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const pagePosition = useRef(new Animated.Value(0)).current;
  const indicatorWidth = 22;
  const indicatorTranslateX = pagePosition.interpolate({
    inputRange: tabs.map((_, index) => index),
    outputRange: tabs.map(
      (_, index) =>
        (tabBarWidth * (index + 0.5)) / tabs.length - indicatorWidth / 2,
    ),
    extrapolate: 'clamp',
  });

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
          <PagerView
            ref={pagerRef}
            style={styles.pager}
            initialPage={0}
            onPageScroll={({ nativeEvent }) => {
              pagePosition.setValue(
                nativeEvent.position + nativeEvent.offset,
              );
            }}
            onPageSelected={({ nativeEvent }) => {
              const selectedTab = tabs[nativeEvent.position];
              if (selectedTab) {
                setActiveTab(selectedTab.name);
              }
            }}
          >
            {tabs.map((tab) => (
              <View
                key={tab.name}
                style={styles.page}
                collapsable={false}
              >
                {tab.name === 'Home' && <UpdatesSection />}
              </View>
            ))}
          </PagerView>
        </View>

        {/* Bottom Navigation */}
        <View
          style={styles.tabBar}
          onLayout={({ nativeEvent }) =>
            setTabBarWidth(nativeEvent.layout.width)
          }
        >
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
                onPress={() => {
                  const pageIndex = tabs.findIndex(
                    (item) => item.name === tab.name,
                  );
                  pagerRef.current?.setPage(pageIndex);
                }}
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
          <Animated.View
            pointerEvents="none"
            style={[
              styles.tabIndicator,
              {
                width: indicatorWidth,
                opacity: tabBarWidth > 0 ? 1 : 0,
                transform: [{ translateX: indicatorTranslateX }],
              },
            ]}
          />
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

  pager: {
    flex: 1,
  },

  page: {
    flex: 1,
  },

  tabBar: {
    height: 64,
    position: 'relative',
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

  tabIndicator: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    height: 3,
    borderRadius: 2,
    backgroundColor: '#FFFFFF',
  },
});
