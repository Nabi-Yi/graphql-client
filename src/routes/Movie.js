import { useParams } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";

const GET_MOVIE = gql`
  query getMovie($movieId: String!) {
    movie(id: $movieId) {
      title
      id
    }
  }
`;
export default function Movie() {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_MOVIE, {
    variables: {
      movieId: id,
    },
  });

  if(loading){
      return <h1>Fetching Movie</h1>
  }
  return <div>{data.movie.id} && {data.movie.title} </div>;
}
