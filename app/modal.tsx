import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ListRenderItem,
  TouchableOpacity,
  Button,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "@/store/cartStore";

export default function ModalScreen() {
  const { reduceProduct, addProduct, products, clearCart, total } =
    useCartStore();

  const renderItem: ListRenderItem<Product & { quantity: number }> = ({
    item,
  }) => (
    <View style={styles.cartItemContainer}>
      <Image style={styles.cartItemImage} source={{ uri: item.image }} />

      <View style={styles.itemContainer}>
        <Text style={styles.cartItemName}>{item.title}</Text>
        <Text style={styles.cartItemName}>${item.price}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => reduceProduct(item)}>
          <Ionicons name="remove" size={24} color="black" />
        </TouchableOpacity>
        <Text>{item.quantity}</Text>
        <TouchableOpacity onPress={() => addProduct(item)}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListFooterComponent={
            <Text
              style={{
                fontWeight: "bold",
                // margin: 10,
                backgroundColor: "#fff",
                borderRadius: 20,
                fontSize: 20,
                padding: 10,
              }}
            >
              ${total()}
            </Text>
          }
        />

        <Button title="Clear Cart" onPress={clearCart} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },
  cartItemContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
    padding: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  itemContainer: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cartItemImage: {
    height: 50,
    width: 50,
    objectFit: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
