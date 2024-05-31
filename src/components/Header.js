import Image from 'next/image'
import Navegation from './Navegation'

export default function Header() {
  return (
    <header className="flex gap-0 justify-between items-center p-3 bg-black">
      <div className="flex gap-2 items-center">
        <Image src={'/favicon.png'} width={40} height={40}></Image>
        <h1 className="m-0 text-white text-2xl uppercase">WordGames</h1>
      </div>
      <Navegation />
    </header>
  );
}
