import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Image,
  ListRenderItem,
  TouchableOpacity,
} from "react-native";
import data from "@/assets/data.json";
import { Ionicons } from "@expo/vector-icons";
import useCartStore from "../../store/cartStore";
import { useEffect } from "react";

export default function TabOneScreen() {
  const { reduceProduct, addProduct } = useCartStore();

  // useEffect(() => {
  //   useCartStore.subscribe((state) => {
  //     console.log("STATE", state);
  //   });
  // }, []);

  const renderItem: ListRenderItem<any> = ({ item }) => (
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
        <TouchableOpacity onPress={() => addProduct(item)}>
          <Ionicons name="add" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
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
    justifyContent: "center",
  },
});
