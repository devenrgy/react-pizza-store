import { Outlet } from 'react-router-dom';

import { Header } from 'components/header';

export default function Root() {
  return (
    <div className='app'>
      <Header/>

      <main>
        <Outlet/>
      </main>
    </div>
  );
}

