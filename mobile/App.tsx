import { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

const tabs = [
  { name: 'Home', icon: 'home' },
  { name: 'Categories', icon: 'categories' },
  { name: 'Cart', icon: 'cart' },
  { name: 'Profile', icon: 'profile' },
] as const;

type TabName = (typeof tabs)[number]['name'];
type IconName = (typeof tabs)[number]['icon'];

function TabIcon({ name, color }: { name: IconName; color: string }) {
  if (name === 'home') {
    return (
      <View style={styles.icon}>
        <View style={[styles.roofLeft, { backgroundColor: color }]} />
        <View style={[styles.roofRight, { backgroundColor: color }]} />
        <View style={[styles.house, { borderColor: color }]} />
        <View style={[styles.door, { backgroundColor: color }]} />
      </View>
    );
  }

  if (name === 'categories') {
    return (
      <View style={[styles.icon, styles.gridIcon]}>
        {[0, 1, 2, 3].map((square) => (
          <View
            key={square}
            style={[styles.gridSquare, { borderColor: color }]}
          />
        ))}
      </View>
    );
  }

  if (name === 'cart') {
    return (
      <View style={styles.icon}>
        <View style={[styles.cartHandle, { backgroundColor: color }]} />
        <View style={[styles.cartBasket, { borderColor: color }]} />
        <View style={[styles.cartWheel, styles.leftWheel, { backgroundColor: color }]} />
        <View style={[styles.cartWheel, styles.rightWheel, { backgroundColor: color }]} />
      </View>
    );
  }

  return (
    <View style={styles.icon}>
      <View style={[styles.profileHead, { borderColor: color }]} />
      <View style={[styles.profileShoulders, { borderColor: color }]} />
    </View>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('Home');

  return (
    <SafeAreaView style={styles.screen}>
      <StatusBar style="light" />
      <View style={styles.emptySurface} />
      <View style={styles.tabBar}>
        {tabs.map((tab) => {
          const isActive = tab.name === activeTab;
          const color = isActive ? '#A5F52A' : '#A6A6A6';

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
              <TabIcon name={tab.icon} color={color} />
            </Pressable>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#303030',
  },
  emptySurface: {
    flex: 1,
  },
  tabBar: {
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242424',
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
  icon: {
    width: 24,
    height: 24,
    position: 'relative',
  },
  roofLeft: {
    position: 'absolute',
    left: 3,
    top: 8,
    width: 12,
    height: 2,
    transform: [{ rotate: '-45deg' }],
  },
  roofRight: {
    position: 'absolute',
    right: 2,
    top: 8,
    width: 12,
    height: 2,
    transform: [{ rotate: '45deg' }],
  },
  house: {
    position: 'absolute',
    left: 5,
    top: 10,
    width: 14,
    height: 11,
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  door: {
    position: 'absolute',
    left: 10,
    top: 15,
    width: 4,
    height: 6,
  },
  gridIcon: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  gridSquare: {
    width: 8,
    height: 8,
    borderWidth: 2,
    borderRadius: 2,
  },
  cartHandle: {
    position: 'absolute',
    left: 3,
    top: 4,
    width: 2,
    height: 4,
    transform: [{ rotate: '-15deg' }],
  },
  cartBasket: {
    position: 'absolute',
    left: 7,
    top: 7,
    width: 14,
    height: 10,
    borderWidth: 2,
    borderTopWidth: 1,
    transform: [{ skewX: '-10deg' }],
  },
  cartWheel: {
    position: 'absolute',
    top: 19,
    width: 3,
    height: 3,
    borderRadius: 2,
  },
  leftWheel: {
    left: 9,
  },
  rightWheel: {
    right: 3,
  },
  profileHead: {
    position: 'absolute',
    left: 8,
    top: 2,
    width: 8,
    height: 8,
    borderWidth: 2,
    borderRadius: 4,
  },
  profileShoulders: {
    position: 'absolute',
    left: 3,
    top: 13,
    width: 18,
    height: 9,
    borderWidth: 2,
    borderBottomWidth: 0,
    borderTopLeftRadius: 9,
    borderTopRightRadius: 9,
  },
});
