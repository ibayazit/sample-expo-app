import { useContext } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { StockCard } from "../components/StockCard";
import { SearchableStock } from "../data";
import { StoreContext } from "./_layout";

export default function SearchScreen() {
  const { searchQuery, searchedStocks } = useContext(StoreContext);

  if (!searchQuery && searchedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          Search stocks
        </Text>
      </View>
    );
  }

  if (searchQuery && searchedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          No stocks found
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={searchedStocks}
      keyExtractor={(item: SearchableStock) => item.ticker}
      renderItem={({ item }) => (
        <StockCard
          ticker={item.ticker}
          image={item.image}
          companyName={item.companyName}
          price={item.price}
          priceChange={item.priceChange}
          priceChangePercentage={item.priceChangePercentage}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
