import NewEntry from '../components/NewEntry';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SecondaryLinks from '../components/SecondaryLinks';

export default function LeaderboardPage() {
  return (
    <main>
      <Header className='flex flex-row content-between p-4 sticky top-0 z-10 bg-base-200 shadow-sm'>
        <p className='w-full text-3xl text-red-500 italic font-bold'>
          Pixel Hunt
        </p>
        <SecondaryLinks />
      </Header>
      <NewEntry />
      <Footer />
    </main>
  );
}
