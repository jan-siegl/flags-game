import Link from "next/link"


export default function Play() {


    return (
        <div className="">
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 pt-10 text-center">
                <h1 className="text-6xl font-bold">
                    Lets play a{' '}
                    <Link href="/">
                        <a className="text-blue-600">
                            Flag game!
                        </a>
                    </Link>
                </h1>

                <p className="mt-3 text-2xl">
                    One game takes around{' '}
                    <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                        3 minutes
                    </code>
                </p>

                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <Link href={{
                        pathname: '/play/easy'
                    }}>
                        <a
                            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                        >
                            <h3 className="text-2xl font-bold">Easy 🚩</h3>
                            <p className="mt-4 text-xl">
                                Learn about countries in an interactive EASY game!
                            </p>
                        </a>
                    </Link>
                    <Link href={{
                        pathname: '/play/hard',
                    }}>
                        <a
                            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                        >
                            <h3 className="text-2xl font-bold">Hard 🏴󠁳󠁴󠁸󠁿</h3>
                            <p className="mt-4 text-xl">
                                Learn about countries in an interactive HARD game!
                            </p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    )
}
