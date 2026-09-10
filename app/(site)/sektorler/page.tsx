import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { db } from '@/lib/db';
import { getSettings } from '@/lib/settings';
import { Breadcrumbs,QuoteCTA } from '@/components/ui';
export const metadata={title:'Sektöre Özel Çözümler',alternates:{canonical:'/sektorler'}};
export default async function Sectors(){const[s,sectors]=await Promise.all([getSettings(),db.sector.findMany({where:{active:true},orderBy:{sortOrder:'asc'}})]);return <div className="container"><Breadcrumbs items={[{name:'Sektörler'}]}/><div className="page-intro"><p className="eyebrow">SEKTÖRE ÖZEL ÇÖZÜMLER</p><h1>Her sektörün<br/>bir dili var.</h1><p>Ürününüzün ihtiyaçlarını anlayan, markanızın dünyasına uyum sağlayan ambalaj ve baskı çözümleri.</p></div><div className="category-grid">{sectors.map((v,i)=><Link href={`/sektorler/${v.slug}`} key={v.id} className="category-card"><div className="category-image"><Image src={v.image} alt={v.name+' için ambalaj çözümleri'} fill sizes="(max-width:700px) 50vw,33vw"/></div><div><span className="number">0{i+1}</span><h3>{v.name}</h3><ArrowUpRight size={22}/></div><p className="muted" style={{fontSize:14,marginTop:15}}>{v.description}</p></Link>)}</div><div className="section"><QuoteCTA phone={s.whatsapp}/></div></div>;}
