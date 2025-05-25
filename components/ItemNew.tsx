import { Item } from "@/types";
import { Text } from "./Themed";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DateTime } from "luxon";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";

interface ItemNewProps {
  newData: Item;
}

const ItemNew = ({ newData }: ItemNewProps) => {
  const router = useRouter();
  const { title, urlToImage, description, author, publishedAt } = newData;

  const goToFullView = () => {
    router.push({
      pathname: "/news/[id]",
      params: {
        id: title,
        ...newData,
      },
    });
  };
  
  return (
    <TouchableOpacity style={styles.card} onPress={goToFullView}>
      {urlToImage && (
        <Image
          source={{ uri: urlToImage }}
          style={styles.image}
          cachePolicy="memory"
          contentFit="cover"
        />
      )}
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.summary}>{description}</Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.author}>Autor: {author || "Anónimo"}</Text>
          <Text style={styles.publication}>
            Publicado:{" "}
            {publishedAt
              ? DateTime.fromISO(publishedAt)
                  .setZone("America/Asuncion")
                  .toFormat("dd/MM/yyyy HH:mm")
              : "Sin datos"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default React.memo(ItemNew);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    elevation: 3,
    marginVertical: 10,
  },
  image: {
    height: 250,
    width: "100%",
  },
  content: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 6,
  },
  summary: {
    fontSize: 14,
    color: "#666",
  },
  author: {
    marginTop: 5,
    color: "#666",
  },
  publication: {
    marginTop: 5,
    color: "#666",
  },
});
