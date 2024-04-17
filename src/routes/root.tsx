import { Outlet } from 'react-router-dom';

import { Header } from 'components/header';

export default function Root() {
  return (
    <>
      {/* <div className='before:fixed before:bottom-0 before:left-0 before:right-0 before:top-0 before:bg-neutral-950/50 before:content-[""]'>
        <video
          className='fixed left-0 top-0 -z-10 h-full w-full object-cover'
          autoPlay
          muted
          loop
        >
          <source src='/video/bg.mp4' type='video/mp4' />
        </video>
      </div> */}

      <div className='container relative min-h-dvh bg-neutral-950 py-10 text-white shadow-xl sm:min-h-[calc(100vh_-_60px)] sm:rounded-xl sm:bg-neutral-950/80 sm:px-12 sm:pb-16 sm:pt-7'>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
}
