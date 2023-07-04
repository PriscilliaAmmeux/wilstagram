import React, { useCallback, useState } from "react";
import axios from "axios";
import { Image, FlatList, StyleSheet } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

export default function FeedScreen() {
  const [serverImagesUrls, setServerImagesUrls] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const filesUrl = await axios.get(
            "https://wildstagram.nausicaa.wilders.dev/list"
          );
          console.log("filesurls", filesUrl.data);
          setServerImagesUrls(filesUrl.data);
        } catch (err) {
          console.log(err);
        }
      })();
    }, [])
  );

  return serverImagesUrls.length > 0 ? (
    <FlatList
      data={serverImagesUrls}
      keyExtractor={(serverImageURI) => serverImageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  "https://wildstagram.nausicaa.wilders.dev/files/" +
                  itemData.item,
              }}
            />
          </>
        );
      }}
    />
  ) : null;
}

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: 500,
  },
});
