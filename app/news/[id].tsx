import { Image } from "expo-image";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";

export default function FullNewsView() {
  const router = useRouter();
  const { title, content, description, urlToImage, author, publishedAt } =
    useLocalSearchParams();

  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [navigation]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {urlToImage && (
        <Image 
        source={{ uri: String(urlToImage) }} 
        style={styles.image} 
        cachePolicy="memory"
        contentFit="cover"
        />
      )}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.meta}>
        {author ? `Por ${author}` : "Autor desconocido"} •{" "}
        {new Date(String(publishedAt)).toLocaleString("es-PY")}
      </Text>

      <Text style={styles.content}>
        {content || description || "Sin contenido disponible."}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    fontSize: 16,
    color: "#3366FF",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  meta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
});
