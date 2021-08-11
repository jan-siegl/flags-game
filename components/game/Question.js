function Question(props) {
    if (props.difficulty === "hard") {
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
                {props.hintCapital ? <p className="block mb-4 text-sm">{props.countries[props.currentIndex].capital.slice(0, 3)}</p> :
                <a href="#" onClick={props.showHintCapital} className="block my-4 text-xs hover:text-blue-600">
                    Get hint
                </a>}
                <input onChange={e => props.setAnswerCapital(e.target.value)} type="text" placeholder="Capital name"
                       className="px-2 border rounded-xl"/><br/>
                <button type="submit" className="p-4 hover:text-blue-600 focus:text-blue-600">Check</button>
            </form>
        )
    } else {
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
                       className="px-2 border rounded-xl"/><br/>
                <button type="submit" className="px-4 hover:text-blue-600 focus:text-blue-600">Check</button>
            </form>)
    }
}

export default Question
