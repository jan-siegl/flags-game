import Link from "next/link"


export default function FlagTile(props) {

    return (
        <Link key={props.code} href={`/flags/` + props.code}>
            <a className="p-6 px-10 mt-6 mx-2 text-center border rounded-xl hover:text-blue-600 focus:text-blue-600">
                <h3 className="text-5xl font-bold">{props.emoji}</h3>
                <p className="mt-4 text-xl">
                    {props.code}
                </p>
            </a>
        </Link>
    )
}
