import { Outlet } from 'react-router-dom';

import { Header } from 'components/header';

export default function Root() {
  return (
    <div>
      <div className='before:fixed before:bottom-0 before:left-0 before:right-0 before:top-0 before:bg-neutral-950/50 before:content-[""]'>
        <video
          className='fixed left-0 top-0 -z-10 h-full w-full object-cover'
          autoPlay
          muted
          loop
        >
          <source src='/video/bg.mp4' type='video/mp4' />
        </video>
      </div>

      <div className='mx-auto my-7 grid min-h-[calc(100vh_-_60px)] max-w-[1400px] grid-rows-[min-content_1fr] rounded-xl bg-neutral-950/80 px-12 pb-16 pt-7 text-white shadow-xl backdrop-blur-lg'>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
