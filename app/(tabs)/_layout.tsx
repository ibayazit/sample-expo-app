import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs, router } from "expo-router";
import React from "react";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { Pressable } from "react-native";
import { TextInput } from "react-native-paper";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  return <MaterialIcons size={28} style={{ marginBottom: 0 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          header: () => (
            <Pressable
              style={{ width: "100%", paddingHorizontal: 20, paddingTop: 50 }}
              onPress={() => router.push("/search")}
            >
              <TextInput
                onPressIn={() => router.push("/search")}
                placeholder="Search stocks..."
                disabled
                mode="outlined"
                left={<TextInput.Icon icon="magnify" />}
              />
            </Pressable>
          ),
        }}
      />
      <Tabs.Screen
        name="watch-list"
        options={{
          title: "Watchlist",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="star-outline" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
