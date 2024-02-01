import { FlatList, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { StockCard } from "../../components/StockCard";
import { stocks } from "../../data";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text variant="titleLarge" style={styles.title}>
        Available Stocks
      </Text>
      <FlatList
        keyExtractor={(item) => item.ticker}
        data={stocks}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  title: {
    fontWeight: "bold",
    marginLeft: 5,
    marginBottom: 5,
  },
});
