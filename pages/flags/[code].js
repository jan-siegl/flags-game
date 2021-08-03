import client from "../../apollo-client";
import {gql} from "@apollo/client";

export async function getStaticProps({ params: { code } }) {
    const { data } = await client.query({
        query: gql`
        query Country($code: String!) {
          country(code: $code) {
            code
            emoji
            name
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
        <div>
            {country.name}
        </div>
    )
}