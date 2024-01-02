import '@/styles/globals.css'
import Header from '@/components/header'
import Properties from '@/components/properties'
import api from '@/api';
import Head from 'next/head';

export const getServerSideProps = async (context) => {
    try {
        const properties = await api.get('/api/properties');
        return { props: { properties } }; // pass the properties to the page
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        return { props: { properties: [] } }; // in case of error, pass empty array
    }
};

export default function Home(props) {
    return (
        <>
            <Head>
                <title>Airbnb | Holiday rentals, cabins, beach houses &amp; more</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"></link>
                <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css" rel="stylesheet"></link>
            </Head>
            <Header />
            <Properties properties={props.properties} />
        </>
    )
}
