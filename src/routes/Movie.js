import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

const GET_MOVIE = gql`
    query getMovie($movieId: String!) {
        movie(id: $movieId) {
            title
            id
            isLiked @client
        }
    }
`;

export default function Movie() {
    const {id} = useParams();
    const {
        data,
        loading,
        error,
        client: {cache},
    } = useQuery(GET_MOVIE, {
        variables: {
            movieId: id,
        },
    });

    const likeMovie = () => {
        cache.writeFragment({
                id: `Movie:${ id }`,
                fragment: gql`
                    fragment MovieFragment on Movie {
                        isLiked
                    }`
                ,
                data: {
                    isLiked: !data.movie.isLiked
                }
            }
        )
    };

if (loading) {
    return <h1>Fetching Movie</h1>;
}
return (
    <div>
        { data?.movie?.id } && { data?.movie?.title }
        <button onClick={ likeMovie }>
            { data?.movie?.isLiked ? "Unlike" : "Like" }
        </button>
    </div>
);
}
