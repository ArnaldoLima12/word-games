'use client'

import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import ButtonLogout from './ButtonLogout';
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
        <Offcanvas.Body>
            <ButtonLogout/>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default AdminNavegation;