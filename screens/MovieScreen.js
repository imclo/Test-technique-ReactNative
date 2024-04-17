import {
  Text,
  View,
  ActivityIndicator,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Platform,
} from "react-native";

import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import Constants from "expo-constants";

export default function Movie({ route }) {
  const navigation = useNavigation();

  const apiKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTVmNzUzOTY5NTA0ZDAwMTQzMDE4ZmEiLCJlbWFpbCI6InRhbl9jaGxAeWFob28uZnIiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjQtMDctMjZUMDA6MDA6MDAuMDAwWiIsImlzVHJhaW5pbmciOnRydWUsImlhdCI6MTcxMjgzNzA4Mn0.n4tA9vYRj80SXQel4B650J7R5qPpu5QC--XG7djuOW4";

  const { id } = route.params;

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/allocine/movie/${id}`,
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        }
      );
      // console.log(data);
      setData(data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" color="black" style={{ marginTop: 100 }} />
  ) : (
    <SafeAreaView style={styles.container}>
      <View style={styles.view}>
        <Text style={styles.title}>{data.title}</Text>
        <Image
          source={{
            uri: data.poster_path.original,
          }}
          style={styles.picture}
          resizeMode="cover"
        />
        <View style={styles.genre}>
          {data.genres.map((genre) => {
            return (
              <Text style={styles.genreName} key={genre.id}>
                {genre.name}
              </Text>
            );
          })}
        </View>
        <ScrollView style={styles.scrollview}>
          <Text style={styles.description}>{data.overview}</Text>
        </ScrollView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.goBack("Popular Movies");
          }}
        >
          <Text style={styles.buttonText}>Retourner sur les films</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  picture: {
    marginTop: 15,
    height: 200,
    width: 120,
  },
  genre: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    flexWrap: "wrap",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
  },
  genreName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#8E8C8E",
  },
  description: {
    fontSize: 15,
    textAlign: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
  },
  scrollview: { flex: 1 },
  button: {
    backgroundColor: "#2D4D4D",
    width: 250,
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
});
