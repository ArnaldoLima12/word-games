'use client'

import { useState } from 'react';
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
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navigation;
