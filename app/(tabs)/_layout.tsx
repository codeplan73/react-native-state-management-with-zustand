import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, View, Text, StyleSheet } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "@/components/useColorScheme";
import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "@/store/cartStore";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}
const CartButton = () => {
  const { items } = useCartStore();
  return (
    <Link href="/modal" asChild>
      <Pressable style={{ marginRight: 15 }}>
        <View style={styles.countContainer}>
          <Text style={styles.countText}>{items()}</Text>
        </View>
        <Ionicons name="cart" size={28} />
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  countContainer: {
    position: "absolute",
    zIndex: 1,
    bottom: -5,
    right: -10,
    backgroundColor: "#fff",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  countText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ff007b",
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: useClientOnlyValue(false, true),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Shop",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => <CartButton />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: "Cart",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="shopping-bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="booking"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => <TabBarIcon name="tasks" color={color} />,
          headerRight: () => (
            <Link href="/tasks" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="tasks"
                    size={25}
                    color={Colors[colorScheme ?? "light"].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: "Homepagee",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
    </Tabs>
  );
}
