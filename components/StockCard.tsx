import { Image } from "expo-image";
import { router } from "expo-router";
import { Pressable, StyleSheet, View, useWindowDimensions } from "react-native";
import { Text } from "react-native-paper";
import { formatCurrency } from "../utils/formatCurrency";

export const StockCard = ({
  ticker,
  image,
  companyName,
  price,
  priceChange,
  priceChangePercentage,
}: {
  ticker: string;
  image: string;
  companyName: string;
  price: number;
  priceChange: number;
  priceChangePercentage: number;
}) => {
  const { width } = useWindowDimensions();

  return (
    <Pressable
      style={styles.listContainer}
      onPress={() => router.push(`/${ticker}`)}
    >
      <Image source={image} style={styles.listImage} contentFit="contain" />
      <View style={[styles.listRow, { width: width - 75 }]}>
        <View>
          <Text variant="titleMedium" style={styles.listTitle}>
            {ticker}
          </Text>
          <Text variant="labelMedium">{companyName}</Text>
        </View>
        <View style={styles.listPrices}>
          <Text variant="titleMedium" style={styles.listTitle}>
            {formatCurrency(price)}
          </Text>
          <Text
            variant="labelMedium"
            style={{
              color:
                priceChange < 0
                  ? "red"
                  : priceChange > 0
                  ? "lightgreen"
                  : "auto",
            }}
          >
            {formatCurrency(priceChange)} {priceChangePercentage.toFixed(2)}%
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: "row",
    marginVertical: 10,
    paddingHorizontal: 10,
    height: 60,
  },
  listRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 15,
  },
  listTitle: {
    fontWeight: "bold",
  },
  listPrices: {
    alignItems: "flex-end",
  },
  listImage: {
    width: 50,
    height: 50,
  },
});
