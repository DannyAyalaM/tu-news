import { Alert, FlatList, StyleSheet, TextInput } from "react-native";
import { View } from "@/components/Themed";
import { useCallback, useEffect, useRef, useState } from "react";
import { List } from "@/utils/services.js";
import { Item } from "@/types";
import ItemNew from "@/components/ItemNew";
import LoadMoreIcon from "@/components/LoadMoreIcon";

export default function News() {
  const [news, setNews] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const debounceTimeout = useRef<number | null>(null);
  const [loading, setLoading] = useState<Boolean>(false);
  const [params, setParams] = useState({
    q: "Paraguay",
    pageSize: 10,
    page: 1,
    language: "es",
  });

  useEffect(() => {
    setNews([]);
    getNews(true);
  }, [params.q]);

  useEffect(() => {
    if (params.page > 1) getNews();
  }, [params.page]);

  const getNews = (isNewQuery = false) => {
    setLoading(true);

    List(
      `?q=${params.q}&language=${params.language}&pageSize=${params.pageSize}&page=${params.page}`
    )
      .then((res) => {
        const responseInfo: any = res.json()
        if (res.ok) return responseInfo
        throw new Error(responseInfo.message || "Error al consultar los datos");
      })
      .then((data) => {
        if (data?.articles && data.articles.length > 0) {
          setNews(isNewQuery ? data.articles : [...news, ...data.articles]);
        } else if (isNewQuery) {
          setNews([]);
        }
      })
      .catch((error) => Alert.alert(error.message || "Error en la consulta"))
      .finally(() => setLoading(false));
  };

  const handleSearchChange = (text: string) => {
    setSearch(text);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(() => {
      setParams({ ...params, q: text || "Paraguay", page: 1 });
    }, 1000);
  };

  const renderItem = useCallback(
    ({ item }: { item: Item }) => <ItemNew newData={item} />,
    []
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar noticias..."
        value={search}
        onChangeText={handleSearchChange}
      />

      <FlatList
        data={news}
        keyExtractor={(item: Item) => item.title}
        renderItem={renderItem}
        style={styles.list}
        onEndReached={() =>  news.length > 0 && setParams({ ...params, page: params.page + 1 })}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<LoadMoreIcon loading={loading} />}
        removeClippedSubviews={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  list: {
    marginTop: 20,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 20,
    width: "100%",
  },
});
