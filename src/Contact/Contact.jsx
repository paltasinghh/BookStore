import React from 'react'
import Navbar from '../Components/Navbar'
import Contacts from '../Components/Contacts'
import Footer from'../Components/Footer'
function Contact() {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen'>
    <Contacts/>
    </div>
    <Footer/>

    </>
  )
}

export default Contact;
