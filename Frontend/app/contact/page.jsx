import Banner from '../components/Home/Banner';

export const metadata = {
  title: 'Zinnie - Premium Drinks | Home',
  description: 'Discover our premium range of fresh, healthy and delicious beverages crafted with love.',
  keywords: 'premium drinks, healthy beverages, Zinnie drinks, fresh juice',
  openGraph: {
    title: 'Zinnie - Premium Drinks',
    description: 'Discover our premium range of beverages.',
    url: 'https://www.jcdrink.com',
    siteName: 'Zinnie',
    type: 'website',
  },
};

export default function Page() {
  return (
    <>
      <Banner />
    </>
  );
}