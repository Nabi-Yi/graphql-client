import { gql, useQuery } from "@apollo/client";

const GET_MOVIES = gql`
  query getMovies {
    allMovies {
      title
      id
    }
  }
`;
export default function Movies() {
  const { data, loading, error } = useQuery(GET_MOVIES);
  if (loading) {
    return <h1> Loading</h1>;
  }
  if (error) {
    return <h1> failed to fetch data</h1>;
  }
  return (
    <div>
      {data.allMovies.map(movie => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </div>
  );
}
