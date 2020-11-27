import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

export const GET_IS_DARK_THEME = gql`
  query getIsDarkTheme {
    isDarkTheme @client
  }
`;

const cache = new InMemoryCache();

cache.writeQuery({
  query: GET_IS_DARK_THEME,
  data: {
    isDarkTheme: false,
  },
});

export const toggleTheme = () => {
  const { isDarkTheme } = cache.readQuery({ query: GET_IS_DARK_THEME });

  cache.writeQuery({
    query: GET_IS_DARK_THEME,
    data: {
      isDarkTheme: !isDarkTheme,
    },
  });
};

export default new ApolloClient({
  cache,
});
