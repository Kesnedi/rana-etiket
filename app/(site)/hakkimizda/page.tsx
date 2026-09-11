import Image from 'next/image';
import { getSettings } from '@/lib/settings';
import { Breadcrumbs,QuoteCTA } from '@/components/ui';
export const metadata={title:'Hakkımızda',alternates:{canonical:'/hakkimizda'}};
export default async function About(){const s=await getSettings();return <div className="container"><Breadcrumbs items={[{name:'Hakkımızda'}]}/><div className="page-intro"><p className="eyebrow">RANA’NIN HİKÂYESİ</p><h1>{s.about.title}</h1></div><div className="content-split"><div className="content-image"><Image src="/images/etiket-sticker-setleri.webp" alt="Rana tekstil etiketi tasarım kompozisyonu" fill sizes="(max-width:850px) 100vw,50vw"/></div><div><div className="prose"><p>{s.about.text}</p></div><div className="value-row">{s.about.values.map(([title,text])=><div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></div></div><div style={{paddingBottom:80}}><QuoteCTA phone={s.whatsapp}/></div></div>;}

