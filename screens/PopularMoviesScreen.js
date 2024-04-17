import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  Platform,
} from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";

export default function PopularMovies() {
  const navigation = useNavigation();

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTVmNzUzOTY5NTA0ZDAwMTQzMDE4ZmEiLCJlbWFpbCI6InRhbl9jaGxAeWFob28uZnIiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjQtMDctMjZUMDA6MDA6MDAuMDAwWiIsImlzVHJhaW5pbmciOnRydWUsImlhdCI6MTcxMjgzNzA4Mn0.n4tA9vYRj80SXQel4B650J7R5qPpu5QC--XG7djuOW4";

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movies/popular",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      //   console.log(data.results);
      setData(data.results);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <FlatList
          data={data}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.movies}
              onPress={() => {
                navigation.navigate("Movie", { id: item.id });
              }}
            >
              <Image
                source={{
                  uri: item.poster_path.original,
                }}
                style={styles.picture}
                resizeMode="cover"
              />
              <View style={styles.movieInfos}>
                <Text style={styles.title}>{item.title}</Text>
                <Text numberOfLines={5} style={styles.description}>
                  {item.overview}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </SafeAreaView>
  );
}

const widthWindow = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? Constants.statusBarHeight : 0,
  },
  view: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    gap: 10,
  },
  movieInfos: { flex: 1, gap: 20 },
  title: { fontSize: 17 },
  description: { fontSize: 14, color: "gray", paddingRight: 15 },
  movies: {
    width: widthWindow - 20,
    flexDirection: "row",
    marginVertical: 10,
    gap: 10,
    paddingLeft: 10,
  },
  picture: {
    height: 150,
    width: 120,
  },
});
