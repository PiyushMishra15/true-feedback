import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="relative w-full flex mb-20">
        <div className="w-full px-8 mx-auto max-w-7xl">
          <div className="flex justify-between items-start gap-12 md:flex-row flex-col">
            <h5 className="mb-6 text-xl font-semibold text-slate-800">TRUE-FEEDBACK</h5>
            <div className="flex justify-between gap-12 w-full">
              <ul>
                <p className="block mb-1 text-base font-semibold text-slate-800">Product</p>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Overview
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Solutions
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Tutorials
                  </a>
                </li>
              </ul>
              <ul>
                <p className="block mb-1 text-base font-semibold text-slate-800">Company</p>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    About us
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-700 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    News
                  </a>
                </li>
              </ul>
              <ul>
                <p className="block mb-1 text-base font-semibold text-slate-800">Resource</p>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Newsletter
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                    Help center
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center w-full py-4 mt-24 border-t border-slate-200 md:flex-row md:justify-between">
            <p className="block mb-4 text-sm text-center text-slate-500 md:mb-0">
              Copyright © 2024 
              <a href="https://material-tailwind.com/">TRUE FEEDBACK</a>. All Rights Reserved.
            </p>
            <div className="flex gap-4 text-slate-600 sm:justify-center">
              {/* Social Media Links */}
              <a href="#" className="block transition-opacity text-inherit hover:opacity-80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path>
                </svg>
              </a>
              <a href="#" className="block transition-opacity text-inherit hover:opacity-80">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"></path>
                </svg>
              </a>
              {/* Additional icons can follow the same pattern */}
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
