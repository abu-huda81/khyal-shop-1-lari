import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { PRODUCTS } from '../../../assets/products'
import { CATEGORIES } from '../../../assets/categories'
import ProductListItem from '../../components/product-item-list'
import ListHeader from '../../components/list-header'

import { getProductsAndCategories } from '../../api/api'

export default function Home() {
  const { data, error, isLoading } = getProductsAndCategories()
  // imkyaighjasmxaszutvq
  if (isLoading) return <ActivityIndicator />

  if (error || !data)
    return <Text>Error {error?.message || 'An error occured'}</Text>
  return (
    <View>
      <FlatList
        data={data.products}
        renderItem={({ item, index, separators }) => (
          <ProductListItem product={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader categories={data.categories} />}
        contentContainerStyle={styles.FlatListContent}
        columnWrapperStyle={styles.FlatListColumnWrapper}
        style={styles.FlatList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  FlatListContent: {
    paddingBottom: 20,
  },
  FlatListColumnWrapper: {
    justifyContent: 'space-between',
  },
  FlatList: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
})
