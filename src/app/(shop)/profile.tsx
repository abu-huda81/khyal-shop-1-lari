import React, { useState, useEffect, ReactNode } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { useAuth } from "../../providers/auth-provider";
import { useRouter } from "expo-router";
import { Colors } from "../../constants/Colors";
import { supabase } from "../../lib/supabase";
import { getProduct } from "../../api/api";

const fetchUserPurchases = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("order")
      .select("order_item(product(id, title, heroImage, price, slug))")
      .eq("user", userId);

    if (error) {
      console.error("Supabase query error:", error);
      return [];
    }

    // Flatten and deduplicate products
    const uniqueProducts = new Map<
      number,
      {
        id: number;
        title: string;
        heroImage: string;
        price: number;
        slug?: string;
      }
    >();

    data.forEach((order) => {
      order.order_item.forEach((item) => {
        const product = item.product;
        // Only add if not already in the map
        if (!uniqueProducts.has(product.id)) {
          uniqueProducts.set(product.id, product);
        }
      });
    });

    return Array.from(uniqueProducts.values());
  } catch (error) {
    console.error("Unexpected error in fetchUserPurchases:", error);
    return [];
  }
};

const ProfileScreen = () => {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [purchasedProducts, setPurchasedProducts] = useState<
    {
      id: string;
      title: string;
      heroImage: string;
      price: number;
      slug: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      try {
        // Only fetch products if user is not null
        if (user) {
          const products = await fetchUserPurchases(user.id);
          setPurchasedProducts(
            products.map((product) => ({
              ...product,
              id: `${product.id}-${Math.random().toString(36).substr(2, 9)}`,
              slug: product.slug || "", // Provide a default empty string if slug is undefined
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching purchased products:", error);
      }
    };

    fetchPurchasedProducts();
  }, [user]);

  const handleProductPress = (product: {
    id: string;
    slug?: string;
    title?: string;
    heroImage?: string;
    price?: number;
  }) => {
    // Prioritize slug, fallback to ID if slug is not available
    const productSlug = product.slug || `product-${product.id}`;

    // Directly navigate using the slug
    router.push(`/product/${productSlug}`);
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push("/auth");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.username}>{user?.name || "User Profile"}</Text>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <Text style={styles.sectionTitle}>Purchased Products</Text>
      <FlatList
        data={purchasedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productItem}
            onPress={() => handleProductPress(item)}
          >
            <Image
              source={{ uri: item.heroImage }}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.title}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyList}>No purchased products found</Text>
        }
      />

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 30,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  email: {
    fontSize: 16,
    color: Colors.gray,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: Colors.text,
  },
  productItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },
  productPrice: {
    fontSize: 14,
    color: Colors.gray,
  },
  logoutButton: {
    backgroundColor: Colors.primary,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyList: {
    textAlign: "center",
    color: Colors.gray,
    marginTop: 20,
  },
});

export default ProfileScreen;
