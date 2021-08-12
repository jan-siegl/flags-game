import Head from 'next/head'
import Link from "next/link"


export default function Home() {

    return (
        <div className="">
            <Head>
                <title>Flags game</title>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className="main">
                <h1 className="heading">
                    Welcome to{' '}
                    <Link href="/">
                        <a className="text-blue-600">
                            Flags game!
                        </a>
                    </Link>
                </h1>

                <p className="heading-subtext">
                    Totally not{' '} <br className="sm:hidden"/>
                    <code className="heading-code">
                        Next.js&nbsp;template&nbsp;design
                    </code>
                </p>

                <div className="block-container">
                    <Link href="/flags">
                        <a
                            className="block"
                        >
                            <h3 className="block-heading">Browse flags 🇨🇿</h3>
                            <p className="block-text">
                                Find in-depth information about countries.
                            </p>
                        </a>
                    </Link>
                    <Link href="/play">
                        <a
                            className="block"
                        >
                            <h3 className="block-heading">Play game &rarr;</h3>
                            <p className="block-text">
                                Learn about countries in an interactive game!
                            </p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    )
}
