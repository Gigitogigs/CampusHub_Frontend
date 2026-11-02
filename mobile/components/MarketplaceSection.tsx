import {
  ArrowRight,
  Check,
  Filter,
  Heart,
  Laptop,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  Smartphone,
  Headphones,
  Watch,
  Zap,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import AppText from './AppText';
import DarkCardGradient from './DarkCardGradient';
import type { CartItem } from './cartTypes';
import { useAppTheme } from './theme';

const categories = [
  'All',
  'Electronics',
  'Books',
  'Fashion',
  'Services',
] as const;

type MarketplaceCategory = (typeof categories)[number];

const products = [
  {
    id: 'laptop',
    title: 'MacBook Air M1',
    description: '8GB RAM · 256GB SSD',
    price: 520,
    category: 'Electronics',
    label: 'Popular',
    emoji: '💻',
    background: '#18223B',
    lightBackground: '#DDF3F7',
  },
  {
    id: 'headphones',
    title: 'Wireless headphones',
    description: 'Noise cancelling',
    price: 48,
    category: 'Electronics',
    label: 'New',
    emoji: '🎧',
    background: '#32243B',
    lightBackground: '#E9F5F7',
  },
  {
    id: 'textbook',
    title: 'Biology textbook',
    description: 'Good condition · 4th ed.',
    price: 24,
    category: 'Books',
    label: '',
    emoji: '📚',
    background: '#23372F',
    lightBackground: '#E3F3F4',
  },
  {
    id: 'backpack',
    title: 'Everyday backpack',
    description: 'Water-resistant',
    price: 32,
    category: 'Fashion',
    label: 'Good deal',
    emoji: '🎒',
    background: '#3A3023',
    lightBackground: '#FFF3D4',
  },
  {
    id: 'tutoring',
    title: 'Calculus tutoring',
    description: 'Student service · 1 hour',
    price: 15,
    category: 'Services',
    label: '',
    emoji: '✏️',
    background: '#243843',
    lightBackground: '#DDF2F7',
  },
  {
    id: 'watch',
    title: 'Fitness smartwatch',
    description: 'Great condition',
    price: 42,
    category: 'Electronics',
    label: '',
    emoji: '⌚',
    background: '#332A3D',
    lightBackground: '#E7F3F7',
  },
] as const;

const categoryIcons = [
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Zap,
];

type MarketplaceSectionProps = {
  searchQuery?: string;
  onAddToCart: (item: Omit<CartItem, 'quantity'>) => void;
};

export default function MarketplaceSection({
  searchQuery = '',
  onAddToCart,
}: MarketplaceSectionProps) {
  const { colors, mode } = useAppTheme();
  const [selectedCategory, setSelectedCategory] =
    useState<MarketplaceCategory>('All');
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        product.category === selectedCategory;
      const matchesQuery =
        !query ||
        `${product.title} ${product.description} ${product.category}`
          .toLowerCase()
          .includes(query);

      return matchesCategory && matchesQuery;
    });
  }, [searchQuery, selectedCategory]);

  const toggleFavorite = (productId: string) => {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  return (
    <ScrollView
      style={[styles.scroll, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headingRow}>
        <View style={styles.headingCopy}>
          <AppText style={[styles.eyebrow, { color: colors.accent }]}>
            CAMPUS FINDS
          </AppText>
          <AppText style={[styles.heading, { color: colors.text }]}>
            Marketplace
          </AppText>
          <AppText style={[styles.subtitle, { color: colors.secondaryText }]}>
            Good finds, right around campus.
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Create a listing"
          onPress={() =>
            Alert.alert(
              'Sell on CampusHub',
              'Listing creation will be available when marketplace services are connected.',
            )
          }
          style={[
            styles.sellButton,
            { backgroundColor: colors.accent },
          ]}
        >
          <ShoppingBag
            size={17}
            color={colors.accentForeground}
            strokeWidth={2}
          />
          <AppText
            style={[styles.sellButtonText, { color: colors.accentForeground }]}
          >
            Sell
          </AppText>
        </Pressable>
      </View>

      <View
        style={[
          styles.heroCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        {mode === 'dark' && (
          <DarkCardGradient borderRadius={18} />
        )}
        <View style={styles.heroCopy}>
          <View
            style={[
              styles.heroPill,
              { backgroundColor: colors.raisedSurface },
            ]}
          >
            <Check size={12} color={colors.accent} strokeWidth={2.5} />
            <AppText style={[styles.heroPillText, { color: colors.text }]}>
              STUDENT-TO-STUDENT
            </AppText>
          </View>
          <AppText style={[styles.heroTitle, { color: colors.text }]}>
            Find your next
            {'\n'}campus essential.
          </AppText>
          <AppText style={[styles.heroSubtitle, { color: colors.secondaryText }]}>
            Shop trusted listings from students nearby.
          </AppText>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Explore marketplace listings"
            onPress={() => setSelectedCategory('All')}
            style={styles.exploreButton}
          >
            <AppText style={[styles.exploreText, { color: colors.accent }]}>
              Explore finds
            </AppText>
            <ArrowRight size={16} color={colors.accent} strokeWidth={2} />
          </Pressable>
        </View>
        <View
          style={[
            styles.heroArtwork,
            { backgroundColor: colors.raisedSurface },
          ]}
        >
          <Laptop
            size={74}
          color={colors.supportingAccent}
            strokeWidth={1.15}
          />
          <View
            style={[
              styles.artworkBadge,
              { backgroundColor: colors.accent },
            ]}
          >
            <AppText
              style={[
                styles.artworkBadgeText,
                { color: colors.accentForeground },
              ]}
            >
              STUDENT DEALS
            </AppText>
          </View>
        </View>
      </View>

      <View
        style={[
          styles.benefitsRow,
          {
            backgroundColor: colors.surface,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.benefit}>
          <Check size={16} color={colors.accent} strokeWidth={2.3} />
          <AppText style={[styles.benefitText, { color: colors.text }]}>
            Campus community
          </AppText>
        </View>
        <View style={[styles.benefitDivider, { backgroundColor: colors.divider }]} />
        <View style={styles.benefit}>
          <Zap size={16} color={colors.accent} strokeWidth={2} />
          <AppText style={[styles.benefitText, { color: colors.text }]}>
            Student prices
          </AppText>
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <View>
          <AppText style={[styles.sectionTitle, { color: colors.text }]}>
            Shop by category
          </AppText>
          <AppText style={[styles.sectionSubtitle, { color: colors.secondaryText }]}>
            Browse what students are sharing
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Filter marketplace categories"
          onPress={() => setSelectedCategory('All')}
          style={[
            styles.filterButton,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Filter size={17} color={colors.secondaryText} strokeWidth={2} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
      >
        {categories.map((category, index) => {
          const isSelected = selectedCategory === category;
          const CategoryIcon = categoryIcons[index];

          return (
            <Pressable
              key={category}
              accessibilityRole="button"
              accessibilityState={{ selected: isSelected }}
              onPress={() => setSelectedCategory(category)}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: isSelected
                    ? colors.accent
                    : colors.surface,
                  borderColor: isSelected ? colors.accent : colors.border,
                },
              ]}
            >
              <CategoryIcon
                size={15}
                color={
                  isSelected
                    ? colors.accentForeground
                    : colors.supportingAccent
                }
                strokeWidth={2}
              />
              <AppText
                style={[
                  styles.categoryLabel,
                  {
                    color: isSelected
                      ? colors.accentForeground
                      : colors.secondaryText,
                  },
                ]}
              >
                {category}
              </AppText>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.sectionHeader}>
        <View>
          <AppText style={[styles.sectionTitle, { color: colors.text }]}>
            Featured finds
          </AppText>
          <AppText style={[styles.sectionSubtitle, { color: colors.secondaryText }]}>
            Curated for campus life
          </AppText>
        </View>
        <AppText style={[styles.resultCount, { color: colors.secondaryText }]}>
          {filteredProducts.length} items
        </AppText>
      </View>

      {filteredProducts.length > 0 ? (
        <View style={styles.productGrid}>
          {filteredProducts.map((product) => {
            const isFavorite = favorites.includes(product.id);

            return (
              <View
                key={product.id}
                style={[
                  styles.productCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {mode === 'dark' && <DarkCardGradient />}
                <View
                  style={[
                    styles.productArtwork,
                    {
                      backgroundColor:
                        mode === 'light'
                          ? product.lightBackground
                          : product.background,
                    },
                  ]}
                >
                  <AppText style={styles.productEmoji}>{product.emoji}</AppText>
                  {product.label !== '' && (
                    <View
                      style={[
                        styles.productTag,
                        { backgroundColor: colors.accent },
                      ]}
                    >
                      <AppText
                        style={[
                          styles.productTagText,
                          { color: colors.accentForeground },
                        ]}
                      >
                        {product.label}
                      </AppText>
                    </View>
                  )}
                  <Pressable
                    accessibilityRole="button"
                    accessibilityLabel={
                      isFavorite ? 'Remove from saved items' : 'Save item'
                    }
                    onPress={() => toggleFavorite(product.id)}
                    style={[
                      styles.favoriteButton,
                      { backgroundColor: colors.surface },
                    ]}
                  >
                    <Heart
                      size={16}
                      color={isFavorite ? colors.urgentDot : colors.text}
                      fill={isFavorite ? colors.urgentDot : 'transparent'}
                      strokeWidth={2}
                    />
                  </Pressable>
                </View>
                <View style={styles.productInfo}>
                  <AppText
                    style={[styles.productTitle, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {product.title}
                  </AppText>
                  <AppText
                    style={[
                      styles.productDescription,
                      { color: colors.secondaryText },
                    ]}
                    numberOfLines={1}
                  >
                    {product.description}
                  </AppText>
                  <View style={styles.productFooter}>
                    <AppText style={[styles.productPrice, { color: colors.text }]}>
                      ${product.price}
                    </AppText>
                    <Pressable
                      accessibilityRole="button"
                      accessibilityLabel={`Add ${product.title} to cart`}
                      onPress={() =>
                        onAddToCart({
                          id: product.id,
                          title: product.title,
                          description: product.description,
                          price: product.price,
                          emoji: product.emoji,
                        })
                      }
                      style={[
                        styles.addButton,
                        { backgroundColor: colors.accent },
                      ]}
                    >
                      <Plus size={13} color={colors.accentForeground} strokeWidth={2.5} />
                      <ShoppingCart
                        size={13}
                        color={colors.accentForeground}
                        strokeWidth={2}
                      />
                      <AppText
                        style={[
                          styles.addButtonText,
                          { color: colors.accentForeground },
                        ]}
                      >
                        Add
                      </AppText>
                    </Pressable>
                  </View>
                </View>
              </View>
            );
          })}
        </View>
      ) : (
        <View
          style={[
            styles.emptyState,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Search size={22} color={colors.secondaryText} strokeWidth={2} />
          <AppText style={[styles.emptyTitle, { color: colors.text }]}>
            No listings found
          </AppText>
          <AppText style={[styles.emptyMessage, { color: colors.secondaryText }]}>
            Try another search or category.
          </AppText>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 28,
  },
  headingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 18,
  },
  headingCopy: {
    flex: 1,
  },
  eyebrow: {
    marginBottom: 5,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  heading: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  subtitle: {
    marginTop: 4,
    fontSize: 12,
  },
  sellButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginLeft: 8,
    paddingHorizontal: 13,
    borderRadius: 12,
  },
  sellButtonText: {
    fontSize: 13,
    fontWeight: '700',
  },
  heroCard: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 220,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 17,
    borderWidth: 1,
    borderRadius: 18,
  },
  heroCopy: {
    zIndex: 1,
    flex: 1.15,
    alignItems: 'flex-start',
  },
  heroPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginBottom: 13,
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 20,
  },
  heroPillText: {
    fontSize: 8,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  heroTitle: {
    fontSize: 21,
    fontWeight: '800',
    lineHeight: 26,
  },
  heroSubtitle: {
    marginTop: 8,
    fontSize: 11,
    lineHeight: 16,
  },
  exploreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    marginTop: 12,
  },
  exploreText: {
    fontSize: 12,
    fontWeight: '700',
  },
  heroArtwork: {
    width: 116,
    height: 145,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -2,
    borderRadius: 18,
    transform: [{ rotate: '4deg' }],
  },
  artworkBadge: {
    position: 'absolute',
    right: -5,
    bottom: 8,
    paddingHorizontal: 7,
    paddingVertical: 5,
    borderRadius: 10,
    transform: [{ rotate: '-4deg' }],
  },
  artworkBadgeText: {
    fontSize: 7,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  benefitsRow: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 12,
    borderWidth: 1,
    borderRadius: 14,
  },
  benefit: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  benefitText: {
    fontSize: 10,
    fontWeight: '600',
  },
  benefitDivider: {
    width: StyleSheet.hairlineWidth,
    height: 25,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 13,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  sectionSubtitle: {
    marginTop: 3,
    fontSize: 11,
  },
  filterButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 11,
  },
  categoryList: {
    gap: 8,
    paddingRight: 18,
  },
  categoryChip: {
    minHeight: 36,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderRadius: 18,
  },
  categoryLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  resultCount: {
    fontSize: 11,
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: 12,
  },
  productCard: {
    position: 'relative',
    overflow: 'hidden',
    width: '48.5%',
    borderWidth: 1,
    borderRadius: 15,
  },
  productArtwork: {
    height: 142,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 7,
    borderRadius: 11,
  },
  productEmoji: {
    fontSize: 64,
    includeFontPadding: false,
  },
  productTag: {
    position: 'absolute',
    left: 7,
    top: 7,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
  },
  productTagText: {
    fontSize: 8,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    right: 7,
    top: 7,
    width: 29,
    height: 29,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
  productInfo: {
    paddingHorizontal: 11,
    paddingTop: 2,
    paddingBottom: 12,
  },
  productTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  productDescription: {
    marginTop: 3,
    fontSize: 10,
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 9,
    fontWeight: '700',
  },
  emptyState: {
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderRadius: 15,
  },
  emptyTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyMessage: {
    fontSize: 11,
  },
});
