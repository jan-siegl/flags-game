import client from "../../apollo-client"
import {gql} from "@apollo/client"
import {useState} from "react";

export async function getStaticProps({ params: { game } }) {
    const { data } = await client.query({
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
        paths: [ "/play/easy", "/play/hard"],
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
    const [answered, setAnswered] = useState(false)
    const [correct, setCorrect] = useState(false)

    function addPoint() {
        setPoints(points + 1)
    }

    function nextCountry(e) {
        e.preventDefault()
        console.log(currentIndex)
        if (currentIndex < countries.length - 1) {
            setAnswered(false)
            setCorrect(false)
            setCurrentIndex(currentIndex + 1)
        } else {
            setFinished(true)
        }
        console.log(currentIndex)
    }

    function checkAnswer() {
        if (countries[currentIndex].name.toLowerCase() === answer.toLowerCase()) {
            addPoint()
            setCorrect(true)
        }
        setAnswered(true)
    }

    if (finished) {
        return (
            <>You completed the game. Your score is {points}/{countries.length}</>
        )
    } else {
        if (answered) {
            return (
                <div className="">
                    yooo {correct ? "correct" : "wrong"} <a href="#" title="go next" onClick={nextCountry}>Next Flag</a>
                </div>
            )
        } else {
            return (
                <div>
                    <div>
                        {points}/{countries.length}
                    </div>
                    <div className="">
                        {countries[currentIndex].emoji}
                        <form onSubmit={checkAnswer}>
                            <input onChange={e => setAnswer(e.target.value)} type="text" placeholder="Search" />
                            <button type="submit">Check</button>
                        </form>
                    </div>
                </div>
            )
        }
    }
}

export default Game