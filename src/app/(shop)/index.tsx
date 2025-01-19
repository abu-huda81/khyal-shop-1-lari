import { FlatList, StyleSheet, Text, View } from 'react-native'
import { PRODUCTS } from '../../../assets/products'
import { CATEGORIES } from '../../../assets/categories'
import ProductListItem from '../../components/product-item-list'
import ListHeader from '../../components/list-header'

export default function Home() {
  return (
    <View>
      <FlatList
        data={PRODUCTS}
        renderItem={({ item, index, separators }) => (
          <ProductListItem product={item} />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        ListHeaderComponent={<ListHeader categories={CATEGORIES} />}
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
