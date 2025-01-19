import { FlatList, StyleSheet, Text, View } from 'react-native'
import { PRODUCTS } from '../../../assets/products'
import ProductListItem from '../../components/product-item-list'

export default function Page() {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item, index, separators }) => <ProductListItem product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<Text>Products</Text>}
        contentContainerStyle={styles.FlatListContent}
        columnWrapperStyle={styles.FlatListColumnWrapper}
        style={styles.FlatList}
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
