import Link from "next/link";

function Finish(props) {
    return (
        <div
            className="p-6 mt-6 text-center border w-96 rounded-xl">
            <h3 className="text-2xl font-bold">You completed the game!</h3>
            <p className="my-4">Your had <span
                className="text-green-400">{props.points} {props.points === 1 ? "flag" : "flags"} correct</span> and <span
                className="text-red-400">{props.wrong} {props.wrong === 1 ? "flag" : "flags"} wrong</span></p>
            <Link href="/play"><a className="mt-4 px-4 hover:text-blue-600 focus:text-blue-600">Play again</a></Link>
            <Link href="/flags"><a className="mt-4 px-4 hover:text-blue-600 focus:text-blue-600">Browse flags</a></Link>
        </div>
    )
}

export default Finish
