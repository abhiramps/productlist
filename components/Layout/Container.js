import { Fragment } from 'react';
import Head from 'next/head';

const Container = ({ children }) => {
    return (
        <Fragment>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta name="description" content="products list" />
            </Head>
            <main className='Container'>
                {children}
            </main>
        </Fragment>
    );
};

export default Container;
