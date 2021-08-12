import Link from "next/link"


export default function Play() {


    return (
        <div className="">
            <main className="main">
                <h1 className="heading">
                    Lets play a{' '}
                    <Link href="/">
                        <a className="text-blue-600">
                            Flag game!
                        </a>
                    </Link>
                </h1>

                <p className="heading-subtext">
                    One game takes around{' '}
                    <code className="heading-code">
                        2&nbsp;minutes
                    </code>
                </p>

                <div className="block-container">
                    <Link href={{
                        pathname: '/play/easy'
                    }}>
                        <a
                            className="block"
                        >
                            <h3 className="block-heading">Easy 🚩</h3>
                            <p className="block-text">
                                Learn about countries by guessing their name!
                            </p>
                        </a>
                    </Link>
                    <Link href={{
                        pathname: '/play/hard',
                    }}>
                        <a
                            className="block"
                        >
                            <h3 className="block-heading">Hard 🏴󠁳󠁴󠁸󠁿</h3>
                            <p className="block-text">
                                Learn about countries by guessing their name and capital!
                            </p>
                        </a>
                    </Link>
                </div>
            </main>
        </div>
    )
}
