import './globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Script from 'next/script';

export const metadata = {
  title: 'Zinnie - Premium Drinks',
  description:
    'Discover our premium range of drinks. Fresh, healthy and delicious beverages crafted with care.',
  keywords: 'drinks, beverages, healthy drinks, Zinnie',

  openGraph: {
    title: 'Zinnie - Premium Drinks',
    description: 'Discover our premium range of drinks.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700&display=swap"
        />
      </head>

      <body suppressHydrationWarning>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-S07YWT3NCJ"
          strategy="afterInteractive"
        />

        <Script strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];

            function gtag(){
              dataLayer.push(arguments);
            }

            gtag('js', new Date());
            gtag('config', 'G-S07YWT3NCJ');
          `}
        </Script>

        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}