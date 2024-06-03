'use client'

import { useState } from 'react';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FiAlignJustify } from 'react-icons/fi';

function Navigation() {
  const [show, setShow] = useState(false);
  const [item, setItem] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const search = (e) => {
    e.preventDefault();
    window.location.href = `/?item=${item}`
  };

  return (
    <>
      <Button variant='dark' onClick={handleShow}>
        <FiAlignJustify fontSize={20} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} className='bg-black text-white'>
        <Offcanvas.Header closeButton closeVariant={'white'}>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <form onSubmit={search} className='flex items-center justify-start'>
            <div className='p-2 bg-white rounded-sm'>
              <input placeholder='Buscar' className='text-black outline-none' type='text' name='item' value={item} onChange={(e) => setItem(e.target.value)} />
              <Button type="submit">Search</Button>
            </div>
          </form>

          <div className='mt-2'>
            <ul className='m-0 p-0 flex flex-col gap-2'>
              <li className='text-center flex justify-center'><Link className=' hover:bg-blue-700 w-full bg-blue-600 rounded-sm no-underline text-white p-2' href={'/game/categorias'}>Categorias</Link></li>
              <li className='text-center flex justify-center'><Link className='hover:bg-blue-700 w-full bg-blue-600 rounded-sm no-underline text-white p-2' href={'/ferramentas'}>Ferramentas</Link></li>
            </ul>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navigation;
