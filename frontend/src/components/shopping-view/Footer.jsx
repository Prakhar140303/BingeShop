import React from 'react'

function Footer() {
  return (
   <footer className="bg-gray-900 text-white py-6 mt-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-around items-center gap-4 px-6">
          <div className="text-center md:text-left">
            <h2 className="text-lg font-bold">BingeShop</h2>
            <p className="text-sm text-gray-400">© {new Date().getFullYear()} All Rights Reserved</p>
          </div>
          <div className="flex gap-6 text-sm">
            <a href="/about" className="hover:scale-110">About</a>
            <a href="/contact" className="hover:scale-110">Contact</a>
            <a href="/privacy" className="hover:scale-110">Privacy Policy</a>
            <a href="/terms" className="hover:scale-110">Terms & Conditions</a>
          </div>
        </div>
      </footer>
  )
}

export default Footer