import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import { PaperProvider, TextInput } from "react-native-paper";

import { useColorScheme } from "@/components/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SearchableStock } from "../data";
import { theme } from "../theme";
import { searchStocks } from "../utils/searchStocks";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const StoreContext = createContext<{
  searchQuery: string;
  setSearchQuery: (text: string) => void;
  searchedStocks: Array<SearchableStock>;
  setSearchedStocks: (stocks: SearchableStock[]) => void;
  likedStocks: string[];
  updateLikedStocks: (op: "add" | "delete", ticker: string) => void;
}>({
  searchQuery: "",
  setSearchQuery: () => {},
  searchedStocks: [],
  setSearchedStocks: () => {},
  likedStocks: [],
  updateLikedStocks: () => {},
});

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStocks, setSearchedStocks] = useState<SearchableStock[]>([]);
  const [likedStocks, setLikedStocks] = useState<string[]>([]);

  const updateLikedStocks = async (op: "add" | "delete", ticker: string) => {
    const prevStocks = [...likedStocks];
    const newStocks =
      op === "delete"
        ? prevStocks.filter((symbol) => symbol !== ticker)
        : [ticker, ...prevStocks];

    try {
      await AsyncStorage.setItem("watchlist", JSON.stringify(newStocks));
      setLikedStocks(newStocks);
    } catch (error) {
      setLikedStocks(prevStocks);
    }
  };

  useEffect(() => {
    async function getLikedStocks() {
      const stocks = await AsyncStorage.getItem("watchlist");
      if (stocks) {
        setLikedStocks(JSON.parse(stocks));
      }
    }
    getLikedStocks();

    return () => {
      setLikedStocks([]);
    };
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StoreContext.Provider
          value={{
            searchQuery,
            setSearchQuery,
            searchedStocks,
            setSearchedStocks,
            likedStocks,
            updateLikedStocks,
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen
                name="search"
                options={{
                  headerBackTitleVisible: false,
                  headerTitle: () => (
                    <TextInput
                      mode="outlined"
                      autoFocus={true}
                      dense
                      placeholder="Search stocks..."
                      style={{ width: "88%" }}
                      onChangeText={(text: string) => {
                        setSearchQuery(text);

                        const stocks = searchStocks(text);
                        setSearchedStocks(stocks);
                      }}
                    />
                  ),
                }}
              />
              <Stack.Screen name="[ticker]" options={{ headerShown: false }} />
            </Stack>
          </GestureHandlerRootView>
        </StoreContext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
