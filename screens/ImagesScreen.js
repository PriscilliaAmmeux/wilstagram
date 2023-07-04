import * as FileSystem from "expo-file-system";
import React, { useCallback, useState } from "react";
import { StyleSheet, Image, FlatList, Button } from "react-native";
import singleFileUploader from "single-file-uploader";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";

export default function ImagesScreen() {
  const [imagesURI, setImagesURI] = useState([]);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const images = await FileSystem.readDirectoryAsync(
            FileSystem.cacheDirectory + "ImageManipulator"
          );
          setImagesURI(images);
        } catch (err) {
          console.log(err);
        }
      })();
    }, [])
  );

  return imagesURI.length > 0 ? (
    <FlatList
      data={imagesURI}
      keyExtractor={(imageURI) => imageURI}
      renderItem={(itemData) => {
        console.log("item", itemData);
        return (
          <>
            <Image
              style={styles.image}
              source={{
                uri:
                  FileSystem.cacheDirectory +
                  "ImageManipulator/" +
                  itemData.item,
              }}
            />
            <Button
              title="upload"
              onPress={async () => {
                try {
                  await singleFileUploader({
                    distantUrl:
                      "https://wildstagram.nausicaa.wilders.dev/upload",
                    expectedStatusCode: 201,
                    filename: itemData.item,
                    filetype: "image/jpeg",
                    formDataName: "fileData",
                    localUri:
                      FileSystem.cacheDirectory +
                      "ImageManipulator/" +
                      itemData.item,
                    token: Constants.manifest.extra.token,
                  });
                  alert("Uploaded");
                } catch (err) {
                  alert("Error");
                }
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
    resizeMode: "cover",
    height: 500,
  },
});
