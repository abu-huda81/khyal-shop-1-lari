import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ViewToken,
  ImageSourcePropType,
} from "react-native";
import React, { useRef, useState } from "react";
import Pagination from "./Pagination";

type Props = {
  imageList: ImageSourcePropType[];
};

const width = Dimensions.get("window").width;

const ImageSlider = ({ imageList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const viewabilityConfigCallbackPairs = useRef([
    {
      viewabilityConfig: {
        itemVisiblePercentThreshold: 50,
      },

      onViewableItemsChanged: ({
        viewableItems,
      }: {
        viewableItems: ViewToken[];
      }) => {
        // Add null checks and ensure array is not empty
        if (
          viewableItems &&
          viewableItems.length > 0 &&
          viewableItems[0]?.index !== undefined &&
          viewableItems[0]?.index !== null
        ) {
          setPaginationIndex(viewableItems[0].index % imageList.length);
        }
      },
    },
  ]);

  // Add a fallback for empty imageList
  if (imageList.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={imageList}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} resizeMode="cover" />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width}
        scrollEventThrottle={16}
        viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
      />
      <Pagination 
        items={imageList.map((_, index) => index.toString())} 
        paginationIndex={paginationIndex} 
      />
    </View>
  );
};

export default ImageSlider;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    position: "relative",
  },
  imageContainer: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 300,
    borderRadius: 15,
  },
});
