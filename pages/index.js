import Head from 'next/head'

import { gql } from "@apollo/client"
import client from "../apollo-client"

import FlagTile from "../components/FlagTile"

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
        query Countries {
          countries {
            code
            emoji
          }
        }
      `,
  })


  return {
    props: {
      countries: data.countries,
    },
  }
}

export default function Home({ countries }) {
  return (
    <div className="bg-gray-300">
      <Head>
        <title>Flags game</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <div className=""></div>
      <div className="flex flex-wrap">
        {countries.map((country) => (
            <FlagTile {...country} />
        ))}
      </div>
    </div>
  )
}
