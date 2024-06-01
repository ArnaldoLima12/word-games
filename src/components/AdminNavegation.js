'use client'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ButtonLogout from './ButtonLogout';
import Link from 'next/link';
import { FiAlignJustify } from "react-icons/fi";
import { useState } from 'react';

function AdminNavegation() {
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant='dark' onClick={handleShow}>
        <FiAlignJustify fontSize={20}></FiAlignJustify>
      </Button>

      <Offcanvas show={show} onHide={handleClose} className='bg-black text-white' >
        <Offcanvas.Header closeButton closeVariant={'white'}>
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='flex flex-col gap-2'>
            <Link className='text-white bg-blue-400 p-2 text-center rounded-md no-underline' href={'/admin'}>Painel</Link>
            <Link className='text-white bg-blue-400 p-2 text-center rounded-md no-underline' href={'/admin/newgame'}>Novo Jogo</Link>
            <ButtonLogout/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminNavegation;