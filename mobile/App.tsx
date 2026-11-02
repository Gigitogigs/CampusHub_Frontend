
import { useCallback, useRef, useState } from 'react';
import { useFonts } from 'expo-font';

import HomeHeader from './components/HomeHeader';
import UniversalSearchBar from './components/UniversalSearchBar';
import QuickActionsSection from './components/QuickActionsSection';
import UpdatesSection from './components/UpdatesSection';
import ProfileSettingsSection from './components/ProfileSettingsSection';
import MarketplaceSection from './components/MarketplaceSection';
import CartSection from './components/CartSection';
import type { CartItem } from './components/cartTypes';
import { ThemeProvider, useAppTheme } from './components/theme';
import { publicSansFonts } from './components/fonts';
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
  ScrollView,
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
  { name: 'Marketplace', icon: Grid2X2 },
  { name: 'Cart', icon: ShoppingCart },
  { name: 'Profile', icon: UserRound },
] as const;

type TabName = (typeof tabs)[number]['name'];

// Main application
export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

function AppContent() {
  const [fontsLoaded, fontError] = useFonts(publicSansFonts);
  const { colors, mode, isReady } = useAppTheme();
  const [activeTab, setActiveTab] = useState<TabName>('Home');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
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
  const addToCart = useCallback((item: Omit<CartItem, 'quantity'>) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (cartItem) => cartItem.id === item.id,
      );

      if (existingItem) {
        return currentItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem,
        );
      }

      return [...currentItems, { ...item, quantity: 1 }];
    });
  }, []);
  const changeCartQuantity = useCallback(
    (itemId: string, quantity: number) => {
      if (quantity <= 0) {
        setCartItems((currentItems) =>
          currentItems.filter((item) => item.id !== itemId),
        );
        return;
      }

      setCartItems((currentItems) =>
        currentItems.map((item) =>
          item.id === itemId ? { ...item, quantity } : item,
        ),
      );
    },
    [],
  );
  const removeCartItem = useCallback((itemId: string) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    );
  }, []);

  if (fontError) {
    throw fontError;
  }

  if (!fontsLoaded || !isReady) {
    return <View style={[styles.screen, { backgroundColor: colors.background }]} />;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={[styles.screen, { backgroundColor: colors.background }]}
        edges={['top', 'bottom']}
      >
        <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />

        {/* Main content */}
        <View style={[styles.content, { backgroundColor: colors.background }]}>
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
                {tab.name === 'Home' && (
                  <ScrollView
                    style={styles.homeScroll}
                    contentContainerStyle={styles.homeContent}
                    showsVerticalScrollIndicator={false}
                  >
                    <QuickActionsSection />
                    <UpdatesSection />
                  </ScrollView>
                )}
                {tab.name === 'Profile' && <ProfileSettingsSection />}
                {tab.name === 'Marketplace' && (
                  <MarketplaceSection
                    searchQuery={searchQuery}
                    onAddToCart={addToCart}
                  />
                )}
                {tab.name === 'Cart' && (
                  <CartSection
                    items={cartItems}
                    onChangeQuantity={changeCartQuantity}
                    onRemoveItem={removeCartItem}
                    onBrowseMarketplace={() => pagerRef.current?.setPage(1)}
                  />
                )}
              </View>
            ))}
          </PagerView>
        </View>

        {/* Bottom Navigation */}
        <View
          style={[
            styles.tabBar,
            {
              backgroundColor: colors.surface,
              borderTopColor: colors.divider,
            },
          ]}
          onLayout={({ nativeEvent }) =>
            setTabBarWidth(nativeEvent.layout.width)
          }
        >
          {tabs.map((tab) => {
            const isActive = tab.name === activeTab;
            const color = isActive ? colors.accent : colors.secondaryText;

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
  },

  pager: {
    flex: 1,
  },

  page: {
    flex: 1,
  },

  homeScroll: {
    flex: 1,
  },

  homeContent: {
    paddingBottom: 12,
  },

  tabBar: {
    height: 64,
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: StyleSheet.hairlineWidth,
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
