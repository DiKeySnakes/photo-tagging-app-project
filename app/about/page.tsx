import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SecondaryLinks from '../components/SecondaryLinks';

const About = () => {
  return (
    <main>
      <Header className='flex flex-row content-between p-4 sticky top-0 z-10 bg-base-300 shadow-sm'>
        <p className='w-full text-3xl text-red-500 italic font-bold'>
          Pixel Hunt
        </p>
        <SecondaryLinks />
      </Header>

      <div className='m-16 max-w-full flex flex-col items-center justify-center'>
        <div className='min-w-[100%]'>
          <div className='text-2xl h-[45vh] flex flex-col items-center justify-around'>
            <div>
              <p className='text-5xl'>Photo Tagging App Project</p>
              <div className='mt-2 text-3xl italic text-center'>
                aka Where is Waldo
              </div>
            </div>
            <div>
              <p className='italic'>
                Game images by{' '}
                <a href='https://www.artstation.com/chekavo'>Egor Klyuchnyk</a>
              </p>
              <div className='mt-2 text-lg italic text-center'>
                www.artstation.com
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full fixed left-0 bottom-0'>
        <Footer />
      </div>
    </main>
  );
};

export default About;
