import Head from 'next/head'
import Link from "next/link"


export default function Home() {

    return (
        <div className="">
            <Head>
                <title>Flags game</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="flex flex-col items-center justify-center w-full flex-1 px-20 pt-10 text-center">
                <h1 className="text-6xl font-bold">
                    Welcome to{' '}
                    <Link href="/">
                        <a className="text-blue-600">
                            Flags game!
                        </a>
                    </Link>
                </h1>

                <p className="mt-3 text-2xl">
                    Totally not{' '}
                    <code className="p-3 font-mono text-lg bg-gray-100 rounded-md">
                        Next.js template design
                    </code>
                </p>

                <div className="flex flex-wrap items-center justify-around max-w-4xl mt-6 sm:w-full">
                    <Link href="/flags">
                        <a
                            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                        >
                            <h3 className="text-2xl font-bold">Browse flags 🇨🇿</h3>
                            <p className="mt-4 text-xl">
                                Find in-depth information about countries.
                            </p>
                        </a>
                    </Link>
                    <Link href="/play">
                        <a
                            className="p-6 mt-6 text-left border w-96 rounded-xl hover:text-blue-600 focus:text-blue-600"
                        >
                            <h3 className="text-2xl font-bold">Play game &rarr;</h3>
                            <p className="mt-4 text-xl">
                                Learn about countries in an interactive game!
                            </p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    )
}
