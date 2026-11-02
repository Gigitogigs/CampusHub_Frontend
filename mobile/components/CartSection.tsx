import {
  ArrowRight,
  Check,
  Clock3,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
} from 'lucide-react-native';
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import AppText from './AppText';
import DarkCardGradient from './DarkCardGradient';
import type { CartItem } from './cartTypes';
import { useAppTheme } from './theme';

type CartSectionProps = {
  items: CartItem[];
  onChangeQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  onBrowseMarketplace: () => void;
};

export default function CartSection({
  items,
  onChangeQuantity,
  onRemoveItem,
  onBrowseMarketplace,
}: CartSectionProps) {
  const { colors, mode } = useAppTheme();
  const itemCount = items.reduce((count, item) => count + item.quantity, 0);
  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const showCheckoutMessage = () => {
    Alert.alert(
      'Checkout',
      'Checkout will be available when CampusHub marketplace services are connected.',
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heading}>
          <View>
            <AppText style={[styles.eyebrow, { color: colors.accent }]}>
              CAMPUS MARKETPLACE
            </AppText>
            <AppText style={[styles.title, { color: colors.text }]}>
              Your cart
            </AppText>
          </View>
          <View
            style={[
              styles.countBadge,
              { backgroundColor: colors.raisedSurface },
            ]}
          >
            <ShoppingBag size={15} color={colors.accent} strokeWidth={2} />
            <AppText style={[styles.countText, { color: colors.text }]}>
              {itemCount}
            </AppText>
          </View>
        </View>

        <View
          style={[
            styles.notice,
            {
              backgroundColor: colors.urgentSurface,
              borderColor: colors.urgentBorder,
            },
          ]}
        >
          <View
            style={[
              styles.noticeIcon,
              { backgroundColor: colors.surface },
            ]}
          >
            <Clock3 size={17} color={colors.urgentText} strokeWidth={2} />
          </View>
          <View style={styles.noticeCopy}>
            <AppText style={[styles.noticeTitle, { color: colors.urgentText }]}>
              Coordinate pickup with your seller
            </AppText>
            <AppText
              style={[styles.noticeSubtitle, { color: colors.secondaryText }]}
            >
              Agree on a safe campus meetup after checkout.
            </AppText>
          </View>
          <ArrowRight size={17} color={colors.urgentText} strokeWidth={2} />
        </View>

        <View style={styles.selectionHeader}>
          <View>
            <AppText style={[styles.sectionTitle, { color: colors.text }]}>
              Your selection
            </AppText>
            <AppText
              style={[styles.sectionSubtitle, { color: colors.secondaryText }]}
            >
              {itemCount} {itemCount === 1 ? 'item' : 'items'} from student sellers
            </AppText>
          </View>
          {items.length > 0 && (
            <Pressable
              accessibilityRole="button"
              onPress={() =>
                Alert.alert(
                  'Clear cart?',
                  'Remove all items from your cart?',
                  [
                    { text: 'Keep items', style: 'cancel' },
                    {
                      text: 'Clear cart',
                      style: 'destructive',
                      onPress: () => items.forEach((item) => onRemoveItem(item.id)),
                    },
                  ],
                )
              }
              hitSlop={8}
            >
              <AppText style={[styles.clearText, { color: colors.secondaryText }]}>
                Clear
              </AppText>
            </Pressable>
          )}
        </View>

        {items.length > 0 ? (
          <View style={styles.itemList}>
            {items.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.itemCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                {mode === 'dark' && <DarkCardGradient borderRadius={16} />}
                <View
                  style={[
                    styles.itemArtwork,
                    { backgroundColor: colors.raisedSurface },
                  ]}
                >
                  <AppText style={styles.itemEmoji}>{item.emoji}</AppText>
                </View>
                <View style={styles.itemDetails}>
                  <AppText
                    style={[styles.itemTitle, { color: colors.text }]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </AppText>
                  <AppText
                    style={[
                      styles.itemDescription,
                      { color: colors.secondaryText },
                    ]}
                    numberOfLines={1}
                  >
                    {item.description}
                  </AppText>
                  <View style={styles.itemBottomRow}>
                    <AppText style={[styles.itemPrice, { color: colors.text }]}>
                      ${item.price}
                    </AppText>
                    <View
                      style={[
                        styles.quantityControl,
                        { backgroundColor: colors.raisedSurface },
                      ]}
                    >
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Decrease ${item.title} quantity`}
                        onPress={() =>
                          onChangeQuantity(item.id, item.quantity - 1)
                        }
                        style={styles.quantityButton}
                      >
                        <Minus
                          size={14}
                          color={colors.secondaryText}
                          strokeWidth={2.5}
                        />
                      </Pressable>
                      <AppText
                        style={[styles.quantityText, { color: colors.text }]}
                      >
                        {item.quantity}
                      </AppText>
                      <Pressable
                        accessibilityRole="button"
                        accessibilityLabel={`Increase ${item.title} quantity`}
                        onPress={() =>
                          onChangeQuantity(item.id, item.quantity + 1)
                        }
                        style={styles.quantityButton}
                      >
                        <Plus size={14} color={colors.accent} strokeWidth={2.5} />
                      </Pressable>
                    </View>
                  </View>
                </View>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${item.title} from cart`}
                  onPress={() => onRemoveItem(item.id)}
                  style={styles.removeButton}
                  hitSlop={8}
                >
                  <Trash2 size={15} color={colors.secondaryText} strokeWidth={2} />
                </Pressable>
              </View>
            ))}
          </View>
        ) : (
          <View
            style={[
              styles.emptyCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            {mode === 'dark' && <DarkCardGradient borderRadius={18} />}
            <View
              style={[
                styles.emptyIcon,
                { backgroundColor: colors.raisedSurface },
              ]}
            >
              <ShoppingBag size={27} color={colors.accent} strokeWidth={1.8} />
            </View>
            <AppText style={[styles.emptyTitle, { color: colors.text }]}>
              Your cart is waiting
            </AppText>
            <AppText
              style={[styles.emptyDescription, { color: colors.secondaryText }]}
            >
              Find something useful from a student near you.
            </AppText>
            <Pressable
              accessibilityRole="button"
              onPress={onBrowseMarketplace}
              style={[
                styles.browseButton,
                { backgroundColor: colors.accent },
              ]}
            >
              <AppText style={[styles.browseText, { color: colors.accentForeground }]}>
                Browse marketplace
              </AppText>
              <ArrowRight size={15} color={colors.accentForeground} strokeWidth={2} />
            </Pressable>
          </View>
        )}

        <View
          style={[
            styles.trustNote,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <ShieldCheck
            size={18}
            color={colors.supportingAccent}
            strokeWidth={2}
          />
          <View style={styles.trustCopy}>
            <AppText style={[styles.trustTitle, { color: colors.text }]}>
              Shop within your campus community
            </AppText>
            <AppText
              style={[styles.trustSubtitle, { color: colors.secondaryText }]}
            >
              Confirm item details and meetup plans with each seller.
            </AppText>
          </View>
          <Check size={15} color={colors.accent} strokeWidth={2.5} />
        </View>
      </ScrollView>

      <View
        style={[
          styles.checkoutPanel,
          {
            backgroundColor: colors.surface,
            borderTopColor: colors.divider,
          },
        ]}
      >
        <View style={styles.subtotalRow}>
          <AppText style={[styles.subtotalLabel, { color: colors.secondaryText }]}>
            Subtotal
          </AppText>
          <AppText style={[styles.subtotalValue, { color: colors.text }]}>
            ${subtotal.toFixed(2)}
          </AppText>
        </View>
        <View style={styles.checkoutRow}>
          <View style={styles.checkoutTotal}>
            <AppText style={[styles.totalLabel, { color: colors.text }]}>
              Total
            </AppText>
            <AppText style={[styles.totalHint, { color: colors.secondaryText }]}>
              Pickup details arranged with seller
            </AppText>
          </View>
          <AppText style={[styles.totalValue, { color: colors.text }]}>
            ${subtotal.toFixed(2)}
          </AppText>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityState={{ disabled: items.length === 0 }}
          disabled={items.length === 0}
          onPress={showCheckoutMessage}
          style={[
            styles.checkoutButton,
            {
              backgroundColor:
                items.length > 0 ? colors.accent : colors.raisedSurface,
            },
          ]}
        >
          <AppText
            style={[
              styles.checkoutText,
              {
                color:
                  items.length > 0
                    ? colors.accentForeground
                    : colors.secondaryText,
              },
            ]}
          >
            Proceed to checkout
          </AppText>
          <ArrowRight
            size={18}
            color={items.length > 0 ? colors.accentForeground : colors.secondaryText}
            strokeWidth={2.3}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 18,
  },
  heading: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  eyebrow: {
    marginBottom: 5,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 25,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  countBadge: {
    minWidth: 42,
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
    borderRadius: 13,
  },
  countText: {
    fontSize: 14,
    fontWeight: '700',
  },
  notice: {
    minHeight: 75,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderWidth: 1,
    borderRadius: 16,
  },
  noticeIcon: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 11,
  },
  noticeCopy: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  noticeSubtitle: {
    marginTop: 4,
    fontSize: 10,
    lineHeight: 14,
  },
  selectionHeader: {
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
    fontSize: 10,
  },
  clearText: {
    fontSize: 11,
    fontWeight: '600',
  },
  itemList: {
    gap: 11,
  },
  itemCard: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 108,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderRadius: 16,
  },
  itemArtwork: {
    width: 76,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  itemEmoji: {
    fontSize: 39,
    includeFontPadding: false,
  },
  itemDetails: {
    flex: 1,
    minWidth: 0,
    justifyContent: 'center',
    marginLeft: 11,
  },
  itemTitle: {
    fontSize: 12,
    fontWeight: '700',
  },
  itemDescription: {
    marginTop: 4,
    fontSize: 10,
  },
  itemBottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 4,
    marginTop: 12,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  quantityControl: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 4,
    borderRadius: 10,
  },
  quantityButton: {
    width: 27,
    height: 27,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityText: {
    minWidth: 19,
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '700',
  },
  removeButton: {
    width: 24,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
  },
  emptyCard: {
    position: 'relative',
    overflow: 'hidden',
    minHeight: 230,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 22,
    borderWidth: 1,
    borderRadius: 18,
  },
  emptyIcon: {
    width: 58,
    height: 58,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
    borderRadius: 18,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '700',
  },
  emptyDescription: {
    marginTop: 6,
    textAlign: 'center',
    fontSize: 11,
  },
  browseButton: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 17,
    paddingHorizontal: 15,
    borderRadius: 12,
  },
  browseText: {
    fontSize: 11,
    fontWeight: '700',
  },
  trustNote: {
    minHeight: 65,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 13,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderRadius: 14,
  },
  trustCopy: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 10,
    fontWeight: '700',
  },
  trustSubtitle: {
    marginTop: 3,
    fontSize: 9,
    lineHeight: 13,
  },
  checkoutPanel: {
    paddingHorizontal: 18,
    paddingTop: 12,
    paddingBottom: 10,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  subtotalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  subtotalLabel: {
    fontSize: 11,
    fontWeight: '600',
  },
  subtotalValue: {
    fontSize: 11,
    fontWeight: '600',
  },
  checkoutRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  checkoutTotal: {
    flex: 1,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  totalHint: {
    marginTop: 2,
    fontSize: 9,
  },
  totalValue: {
    fontSize: 19,
    fontWeight: '800',
  },
  checkoutButton: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 14,
  },
  checkoutText: {
    fontSize: 13,
    fontWeight: '800',
  },
});
