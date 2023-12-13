import React from 'react'
import clientPromise from '../lib/mongodb'

export default function Movies({ movies }) {
    return (
        <div>
            <h1>Top 20 movies of All time</h1>
            <p>
                <small>(According to metacritic)</small>
            </p>
            <ul>
                {movies.map((movie) => (
                    <li>
                        <h2>{movie.title}</h2>
                        <h3>{movie.metacritic}</h3>
                        <p>{movie.plot}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export async function getStaticProps() {
    try {
        const client = await clientPromise
        const db = client.db("sample_mflix")

        const movies = await db
            .collection("movies")
            .find({})
            .sort({ metacritic: -1 })
            .limit(1000)
            .toArray()

        return {
            props: { movies: JSON.parse(JSON.stringify(movies)) }
        }
    } catch (e) {
        console.error(e)
    }
}

