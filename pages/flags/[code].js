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
            <main className="main">
                <h1 className="heading">
                    {country.emoji} <br/>
                    {country.name}
                </h1>

                <p className="heading-subtext">
                    Code{' '}
                    <code className="heading-subtext">
                        {country.code}
                    </code>
                </p>

                <div className="block-container-other">
                    <div
                        className="block-nolink"
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
