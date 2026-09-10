import type { Metadata } from 'next';
import '@fontsource/manrope/400.css';
import '@fontsource/manrope/500.css';
import '@fontsource/manrope/600.css';
import '@fontsource/manrope/700.css';
import './globals.css';
export const metadata:Metadata={title:{default:'Rana Etiket & Matbaa',template:'%s | Rana Etiket'},description:'Markanıza özel kutu, etiket, ambalaj ve baskı çözümleri.'};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="tr"><body>{children}</body></html>;}
