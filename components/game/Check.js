import Link from "next/link";

function Check(props) {
    return (
        <div
            className={props.correct ? "bg-green-400 p-6 mt-6 text-center border w-96 rounded-xl" : "bg-red-400 p-6 mt-6 text-center border w-96 rounded-xl"}>
            <h3 className="text-5xl font-bold">{props.countries[props.currentIndex].emoji}</h3>
            <p>{props.countries[props.currentIndex].name}{props.difficulty === "hard" ? (<span><br/>{props.countries[props.currentIndex].capital}</span>) : null}</p>
            <Link href={"/flags/" + props.countries[props.currentIndex].code}>
                <a className="text-xs hover:text-blue-600">
                    Learn more
                </a>
            </Link><br/>
            <button onClick={props.nextCountry} className="mt-4 px-4 hover:text-blue-600 focus:text-blue-600">Next
                Flag
            </button>
        </div>
    )
}

export default Check
