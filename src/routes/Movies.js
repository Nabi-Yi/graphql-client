import {gql, useApolloClient} from "@apollo/client";
import {useEffect, useState} from "react";

export default function Movies() {
    const [movies, setMovies] = useState([])
    const client = useApolloClient();
    useEffect(() => {
        client.query({
            query: gql`
                {
                    allMovies {
                        title
                        id
                    }
                }
            `
        }).then(response => setMovies(response.data.allMovies))
    }, [client])
    return <div>
        {
            movies.map((movie) => (
                <li key = {movie.id}>
                    {movie.title}
                </li>
            ))
        }
    </div>;
}

