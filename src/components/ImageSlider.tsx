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
import React, { useRef, useState, useEffect } from "react";
import Pagination from "./Pagination";

type Props = {
  imageList: ImageSourcePropType[];
};

const width = Dimensions.get("window").width;

const ImageSlider = ({ imageList }: Props) => {
  const [paginationIndex, setPaginationIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Only set up auto-pagination if there are multiple images
    if (imageList.length > 1) {
      const interval = setInterval(() => {
        const nextIndex = (paginationIndex + 1) % imageList.length;

        // Scroll to the next image
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        });

        // Update pagination index
        setPaginationIndex(nextIndex);
      }, 3000); // Change image every 3 seconds

      // Clean up the interval when component unmounts
      return () => clearInterval(interval);
    }
  }, [paginationIndex, imageList.length]);

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
        ref={flatListRef}
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
