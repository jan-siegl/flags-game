import client from "../../apollo-client"
import {gql} from "@apollo/client"
import {useState} from "react";
import Link from "next/link";
import Check from "../../components/game/Check";
import Question from "../../components/game/Question";
import Finish from "../../components/game/Finish";

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
    const [answerCapital, setAnswerCapital] = useState("")
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)
    const [hint, setHint] = useState(false)
    const [hintCapital, setHintCapital] = useState(false)

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
            setHintCapital(false)
            setCurrentIndex(currentIndex + 1)
        } else {
            setFinished(true)
        }
    }

    function checkAnswer() {
        if (countries[currentIndex].name.toLowerCase() === answer.toLowerCase()) {
            if (props.difficulty === "hard") {
                if (countries[currentIndex].capital.toLowerCase() === answerCapital.toLowerCase()) {
                    addPoint()
                    setCorrect(true)
                }
            } else {
                addPoint()
                setCorrect(true)
            }
        }
        setAnswered(true)
    }

    function showHint(e) {
        e.preventDefault()
        setHint(true)
    }

    function showHintCapital(e) {
        e.preventDefault()
        setHintCapital(true)
    }

    return (
        <main className="main">
            <h1 className="heading">
                Guess the{' '}
                <Link href="/">
                    <a className="text-blue-600">
                        Flag!
                    </a>
                </Link>
            </h1>

            <p className="heading-subtext">
                Your points{' '}
                <code className="heading-code">
                    {points}/{countries.length}
                </code>
            </p>

            <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 w-full">
                {finished ? <Finish points={points} wrong={countries.length - points}/> : (answered ?
                    <Check difficulty={props.difficulty} correct={correct} countries={countries} currentIndex={currentIndex}
                           nextCountry={nextCountry}/> :
                    <Question points={points} countries={countries} currentIndex={currentIndex}
                              checkAnswer={checkAnswer} setAnswer={setAnswer} setAnswerCapital={setAnswerCapital} hint={hint} showHint={showHint} hintCapital={hintCapital} showHintCapital={showHintCapital} difficulty={props.difficulty} />)}
            </div>
        </main>
    )
}

export default Game
