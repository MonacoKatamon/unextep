import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Unextep - Launch Your SaaS in Minutes',
  description: 'Unextep is a complete toolkit for indie hackers and solo developers to launch their SaaS products quickly and efficiently.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {children}
      </body>
    </html>
  );
} 