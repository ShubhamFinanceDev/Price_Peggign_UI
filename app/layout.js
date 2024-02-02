import { Providers } from '@/redux/provider'

// import { Poppins } from 'next/font/google'

import './globals.scss'
import Loader from '@/components/core/loader'
import Navbar from '@/components/core/Navbar'
import Footer from '@/components/core/Footer'


// const poppins = Poppins({
//   weight: ["400", "500", "600", "700", "800", "900"],
//   display: "swap",
//   subsets: ["latin"],
//   variable: "--poppins-font",
// });

export const metadata = {
  title: 'Shubham Housing Finance',
  description: "Shubham Housing Finance provide affordable housing loan with a hassle-free documentation process and easy EMI options for the low-income segment.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning={true}>
        <Providers>
          <Loader />
          <div>
            <Navbar />
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
