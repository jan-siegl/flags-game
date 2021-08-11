import client from "../../apollo-client";
import {gql} from "@apollo/client";
import Link from "next/link";

export async function getStaticProps({ params: { code } }) {
    const { data } = await client.query({
        query: gql`
        query Country($code: ID!) {
          country(code: $code) {
            code
            emoji
            name
            native
            phone
            continent {
                name
            }
            capital
            currency
            languages {
                name
            }
            states {
                name
            }
          }
        }
      `,
        variables: { code: code }
    })


    return {
        props: {
            country: data.country,
        },
    }
}

export async function getStaticPaths() {
    const { data } = await client.query({
        query: gql`
        query Countries {
          countries {
            code
          }
        }
      `,
    })
    return {
        paths: data.countries.map((country) => `/flags/${country.code}`),
        fallback: false,
    }
}


export default function Flag({ country }) {

    return (
        <div className="">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 pt-10 text-center">
                <h1 className="text-6xl font-bold">
                    {country.emoji} <br/>
                    {country.name}
                </h1>

                <p className="mt-3 text-2xl">
                    Code{' '}
                    <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                        {country.code}
                    </code>
                </p>

                <div className="flex flex-wrap items-center justify-center max-w-4xl mt-6 sm:w-full">
                    <div
                        className="p-6 px-10 mt-6 mx-2 text-left border rounded-xl"
                    >
                        <p className="text-xl">
                            Continent:
                        </p>
                        <h3 className="text-2xl mt-4 font-bold">{country.continent.name}</h3>
                    </div>
                    <div
                        className="p-6 px-10 mt-6 mx-2 text-left border rounded-xl"
                    >
                        <p className="text-xl">
                            Capital city:
                        </p>
                        <h3 className="text-2xl mt-4 font-bold">{country.capital}</h3>
                    </div>
                    <div
                        className="p-6 px-10 mt-6 mx-2 text-left border rounded-xl"
                    >
                        <p className="text-xl">
                            Languages:
                        </p>
                        <h3 className="text-2xl mt-4 font-bold">{country.languages.map((language) => (<span>{language.name}<br/></span>))}</h3>
                    </div>
                    <div
                        className="p-6 px-10 mt-6 mx-2 text-left border rounded-xl"
                    >
                        <p className="text-xl">
                            Currency:
                        </p>
                        <h3 className="text-2xl mt-4 font-bold">{country.currency}</h3>
                    </div>
                    <div
                        className="p-6 px-10 mt-6 mx-2 text-left border rounded-xl"
                    >
                        <p className="text-xl">
                            Phone code:
                        </p>
                        <h3 className="text-2xl mt-4 font-bold">{country.phone}</h3>
                    </div>
                    {country.states.length ? <div
                        className="p-6 px-10 mt-6 mx-2 text-left border rounded-xl"
                    >
                        <p className="text-xl">
                            States:
                        </p>
                        <h3 className="text-2xl mt-4 font-bold">{country.states.map((state) => (<span>{state.name}<br/></span>))}</h3>
                    </div> : null}
                </div>
            </main>
        </div>
    )
}
