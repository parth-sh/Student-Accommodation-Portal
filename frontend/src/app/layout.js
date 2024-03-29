import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Airbnb | Holiday rentals, cabins, beach houses &amp; more</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" rel="stylesheet"></link>
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/brands.min.css" rel="stylesheet"></link>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
