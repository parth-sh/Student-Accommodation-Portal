import '@/styles/globals.css'
import Header from '@/components/header'
import Properties from '@/components/properties'
import api from '@/api';

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
            <Header />
            <Properties properties={props.properties} />
        </>
    )
}
