import React, { useState, useEffect } from "react";
import { AppLoading } from "expo";
import { Asset } from "expo-asset";
import * as Font from "expo-font";
import AsyncStorage from '@react-native-community/async-storage'
import { InMemoryCache } from "apollo-cache-inmemory";
import { persistCache } from "apollo-cache-persist";
import ApolloClient from "apollo-boost";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "react-apollo-hooks";
import apolloClientOptions from "./apollo";
import styles from "./styles";
import NavController from "./components/NavController";
import { AuthProvider } from "./AuthContext";


export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [client, setClient] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    try {
      await Font.loadAsync({
        'NotoSansCJKkr-Regular': require('./assets/fonts/NotoSansCJKkr-Regular.ttf'),
        'NotoSansCJKkr-Thin': require('./assets/fonts/NotoSansCJKkr-Thin.ttf'),
      });
      await Asset.loadAsync([require("./assets/images/logo.png")]);
      const cache = new InMemoryCache();
      await persistCache({
        cache,
        storage: AsyncStorage,
      });
      const client = new ApolloClient({
        cache,
        request: async (operation) => {
          const token = await AsyncStorage.getItem("jwt");
          return operation.setContext({
            headers: { Authorization: `Bearer ${token}` },
          });
        },
        ...apolloClientOptions,
      });
      //client.resetStore();
      //client.cache.reset();
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (!isLoggedIn || isLoggedIn === "false") {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
      setLoaded(true);
      setClient(client);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    preLoad();
  }, []);

  return loaded && client && isLoggedIn !== null ? (
    <ApolloProvider client={client}>
      <ThemeProvider theme={styles}>
        <AuthProvider isLoggedIn={isLoggedIn}>
          <NavController />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  ) : (
    <AppLoading />
  );
}
