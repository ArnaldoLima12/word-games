import Image from 'next/image'
import Navegation from './Navegation'
import AdminNavegation from './AdminNavegation';
import Link from 'next/link';

export default function Header({auth}) {

  
  return (
    <header className="flex gap-0 justify-between items-center p-3 bg-black">
      <div>
        <Link className="flex gap-2 items-center no-underline" href={'/'}>
          <Image src={'/favicon.png'} width={40} height={40} alt='Logo WordGames'></Image>
          <h1 className="m-0 text-white text-2xl uppercase">PlatinumGames</h1>
        </Link>
      </div>

      {auth ? (<AdminNavegation/> ) : (<Navegation/>)}
      
    </header>
  );
}
