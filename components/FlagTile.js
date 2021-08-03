import Link from "next/link"


export default function FlagTile(props) {

    return (
        <div key={props.code} className="inline mx-5 my-5 rounded bg-white text-xl">
            <Link href={`/flags/` + props.code}>
                <a>
                    <p className="p-5">
                        <span className="mx-auto">{props.emoji}</span><br/>{props.code}
                    </p>
                </a>
            </Link>
        </div>
    )
}