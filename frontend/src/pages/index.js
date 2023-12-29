import '@/styles/globals.css'
import Header from '@/components/header'
import Properties from '@/components/Properties'
import api from '@/api';

export const getServerSideProps = async (context) => {
    try {
        const res = await api.get('/api/home');
        return { props: { properties: res } }; // pass the properties to the page
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        return { props: { properties: [] } }; // in case of error, pass empty array
    }
};

export default function Home(data) {
    return (
        <>
            <Header />
            <Properties properties={data.properties} />
        </>
    )
}
