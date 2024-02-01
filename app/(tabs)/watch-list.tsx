import { useContext } from "react";
import { Animated, FlatList, Pressable, StyleSheet, View } from "react-native";
import { Swipeable } from "react-native-gesture-handler";
import { Text } from "react-native-paper";
import { StockCard } from "../../components/StockCard";
import { stocks } from "../../data";
import { StoreContext } from "../_layout";

function RightActions({
  process,
  dragX,
  onPress,
}: {
  process: Animated.AnimatedInterpolation<string | number>;
  dragX: Animated.AnimatedInterpolation<string | number>;
  onPress: () => void;
}) {
  const scale = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0.7, 0],
  });

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
        width: 90,
      }}
    >
      <Animated.Text
        style={{
          fontWeight: "bold",
          fontSize: 22,
          color: "white",
          transform: [{ scale }],
        }}
      >
        Delete
      </Animated.Text>
    </Pressable>
  );
}

export default function WatchListScreen() {
  const { likedStocks, updateLikedStocks } = useContext(StoreContext);

  if (likedStocks.length === 0) {
    return (
      <View style={styles.container}>
        <Text variant="titleLarge" style={{ fontWeight: "bold" }}>
          No stocks on watch list
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={stocks.filter((i) => likedStocks.includes(i.ticker))}
        keyExtractor={(item) => item.ticker}
        renderItem={({ item }) => (
          <Swipeable
            renderRightActions={(process, dragX) => (
              <RightActions
                process={process}
                dragX={dragX}
                onPress={() => updateLikedStocks("delete", item.ticker)}
              />
            )}
          >
            <StockCard {...item} />
          </Swipeable>
        )}
      />
    </View>
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
});
