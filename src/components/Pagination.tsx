import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Colors } from '../constants/Colors'

type Props = {
  items: string[]
  paginationIndex: number
}

const Pagination = (props: Props) => {
  return (
    <View style={styles.container}>
      {props.items.map((item, index) => (
        <View
          key={index}
          style={[
            styles.paginationDot,
            {
              backgroundColor:
                props.paginationIndex === index ? Colors.primary : 'gray',
            },
          ]}
        />
      ))}
      <View style={styles.paginationNumberContainer}>
        <View style={styles.paginationNumberBox}>
          <Text style={styles.PaginationText}>{props.paginationIndex + 1} / {props.items.length}</Text>
        </View>
      </View>
    </View>
  )
}

export default Pagination

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
  },
  paginationDot: {
    width: 30,
    height: 4,
    borderRadius: 5,
    marginHorizontal: 3,
  },
  paginationNumberContainer: {
    position: 'absolute',
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: 20,
  },
  paginationNumberBox: {
    backgroundColor: Colors.extraLightGray,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 10,
  },
  PaginationText: {
    color: Colors.primary,
    fontSize: 13,
  },
})
