import { Fragment } from 'react';
import Head from 'next/head';

const Container = ({ children }) => {
    return (
        <Fragment>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="products list" content="products list" />
                <title>products list</title>
            </Head>
            <main >
                {children}
            </main>
        </Fragment>
    );
};

export default Container;
