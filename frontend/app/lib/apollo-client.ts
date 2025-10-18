"use client";
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://employee-directory-backend-izs5.onrender.com/", // ✅ your backend GraphQL endpoint
  }),
  cache: new InMemoryCache(),
});
export default client;
