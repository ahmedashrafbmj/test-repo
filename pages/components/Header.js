import React from 'react'
import { logo } from '/public/logo.png';

export default function Hero () {
  return (
    <header className='w-full flex justify-center items-center flex-col'>
      <nav
        className="flex justify-between items-center w-full mb-10 pt-3">
        <img src="logo.png" alt="sumz_logo" className='w-28 object-contain' />
        <button type="button" onClick={() => window.open('https://github.com/RizanKhan837')} className='black_btn'>
          Github
        </button>
      </nav>

        <h1 className='head_text'>
        Elevating Smart Contracts<br className='max-md:hidden' />
        <span className='orange_gradient '>With AI Precision</span>
      </h1>
      <h2 className='desc'>Elevate your smart contracts with the Smart Audit, where AI-driven audits ensure every line of code reflects the pinnacle of security and trust.</h2>
    </header>
  )
}
