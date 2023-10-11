import './globals.css'
import { Inter } from 'next/font/google'
import 'leaflet/dist/leaflet.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Treehack',
  description: 'Fight urban heat islands by visualizing a greener future',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=''/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800&family=Nunito+Sans:opsz,wght@6..12,200;6..12,300;6..12,400&display=swap" rel="stylesheet"/>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossOrigin=""/>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
