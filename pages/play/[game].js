import client from "../../apollo-client"
import {gql} from "@apollo/client"
import {useState} from "react";
import Link from "next/link";

export async function getStaticProps({params: {game}}) {
    const {data} = await client.query({
        query: gql`
        query {
          countries {
            code
            emoji
            name
            capital
          }
        }
      `
    })

    return {
        props: {
            data: data.countries,
            difficulty: game
        },
    }
}

export async function getStaticPaths() {
    return {
        paths: ["/play/easy", "/play/hard"],
        fallback: false,
    }
}

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

function Check(props) {
    return (
        <div
            className={props.correct ? "bg-green-400 p-6 mt-6 text-center border w-96 rounded-xl" : "bg-red-400 p-6 mt-6 text-center border w-96 rounded-xl"}>
            <h3 className="text-5xl font-bold">{props.countries[props.currentIndex].emoji}</h3>
            <p>{props.countries[props.currentIndex].name}</p>
            <Link href={"/flags/" + props.countries[props.currentIndex].code}>
                <a className="block text-xs hover:text-blue-600">
                    Learn more
                </a>
            </Link>
            <button onClick={props.nextCountry} className="mt-4 px-4 hover:text-blue-600 focus:text-blue-600">Next
                Flag
            </button>
        </div>
    )
}

function Question(props) {
    return (
        <form onSubmit={props.checkAnswer}
              className="p-6 mt-6 text-center border w-96 rounded-xl"
        >
            <h3 className="text-5xl font-bold">{props.countries[props.currentIndex].emoji}</h3>
            {props.hint ? <p className="block mb-4 text-sm">{props.countries[props.currentIndex].code}</p> :
                <a href="#" onClick={props.showHint} className="block my-4 text-xs hover:text-blue-600">
                    Get hint
                </a>}
            <input onChange={e => props.setAnswer(e.target.value)} type="text" placeholder="Country name"
                   className="px-2 border rounded-xl"/>
            <button type="submit" className="px-4 hover:text-blue-600 focus:text-blue-600">Check</button>
        </form>
    )
}

function Game(props) {

    //TODO find out if is possible to fetch 50 random
    function getRandomFifty(allCountries) {
        const first = allCountries.slice(0, 50).sort(() => Math.random() - 0.5)
        const second = allCountries.slice(51, 100).sort(() => Math.random() - 0.5)
        const third = allCountries.slice(101, 150).sort(() => Math.random() - 0.5)
        const fourth = allCountries.slice(151, 200).sort(() => Math.random() - 0.5)
        const fifth = allCountries.slice(201, 250).sort(() => Math.random() - 0.5)
        const randomFifty = first.slice(0, 10).concat(second.slice(0, 10).concat(third.slice(0, 10).concat(fourth.slice(0, 10).concat(fifth.slice(0, 10))))).sort(() => Math.random() - 0.5)

        return randomFifty
    }

    const [countries, setCountries] = useState(getRandomFifty(props.data).slice(0, 5))
    const [currentIndex, setCurrentIndex] = useState(0)
    const [points, setPoints] = useState(0)
    const [finished, setFinished] = useState(false)
    const [answer, setAnswer] = useState("")
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [hint, setHint] = useState(false)

    function addPoint() {
        setPoints(points + 1)
    }

    function nextCountry(e) {
        e.preventDefault()
        console.log(currentIndex)
        if (currentIndex < countries.length - 1) {
            setAnswered(false)
            setCorrect(false)
            setHint(false)
            setCurrentIndex(currentIndex + 1)
        } else {
            setFinished(true)
        }
    }

    function checkAnswer() {
        if (countries[currentIndex].name.toLowerCase() === answer.toLowerCase()) {
            addPoint()
            setCorrect(true)
        }
        setAnswered(true)
    }

    function showHint(e) {
        e.preventDefault()
        setHint(true)
    }

    return (
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 pt-10 text-center">
            <h1 className="text-6xl font-bold">
                Guess the{' '}
                <Link href="/">
                    <a className="text-blue-600">
                        Flag!
                    </a>
                </Link>
            </h1>

            <p className="mt-3 text-2xl">
                Your points{' '}
                <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                    {points}/{countries.length}
                </code>
            </p>

            <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                {finished ? <Finish points={points} wrong={countries.length - points}/> : (answered ?
                    <Check correct={correct} countries={countries} currentIndex={currentIndex}
                           nextCountry={nextCountry}/> :
                    <Question points={points} countries={countries} currentIndex={currentIndex}
                              checkAnswer={checkAnswer} setAnswer={setAnswer} hint={hint} showHint={showHint}/>)}
            </div>
        </main>
    )
}

export default Game