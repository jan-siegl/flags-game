import Head from 'next/head'

import {gql} from "@apollo/client"
import client from "../../apollo-client"

import FlagTile from "../../components/FlagTile"
import {useState} from "react";
import Link from "next/link";

export async function getStaticProps() {
    const {data} = await client.query({
        query: gql`
        query {
          countries {
            code
            name
            emoji
            continent {
                code
            }
          }
          continents {
            code
            name
          }
        }
      `,
    })


    return {
        props: {
            countries: data.countries,
            continents: data.continents
        },
    }
}

export default function Flags(props) {
    const [countries, setCountries] = useState(props.countries)
    const [continents] = useState(props.continents)

    function filter(e) {
        setCountries(e.target.value === "default" ? props.countries : props.countries.filter((country) => country.continent.code === e.target.value))
    }

    function search(e) {
        setCountries(e.target.value.length < 3 ? props.countries.filter((country) => country.code.toLowerCase().includes(e.target.value.toLowerCase())) : props.countries.filter((country) => country.name.toLowerCase().includes(e.target.value.toLowerCase())))
    }

    return (
        <div className="">
            <Head>
                <title>Flags game</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="main">
                <h1 className="heading">
                    Lets learn{' '}
                    <Link href="/">
                        <a className="text-blue-600">
                            Flags!
                        </a>
                    </Link>
                </h1>

                <p className="heading-subtext">
                    <form>
                        <input onChange={search} type="text" placeholder="Search" />
                        <select onChange={filter} name="Continent" id="continent">
                            <option value="default">All continents</option>
                            {continents.map((continent) => (<option value={continent.code}>{continent.name}</option>))}
                        </select>
                    </form>
                </p>

                <div className="block-container">
                    {countries.map((country) => (
                        <FlagTile {...country} />
                    ))}
                </div>
            </main>
        </div>
    )
}
