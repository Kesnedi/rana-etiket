import Link from 'next/link';
import Image from 'next/image';
import { db } from '@/lib/db';
import { Breadcrumbs } from '@/components/ui';
export const metadata={title:'Baskı ve Ambalaj Rehberi',alternates:{canonical:'/blog'}};
export default async function Blog(){const posts=await db.blogPost.findMany({where:{active:true},orderBy:{createdAt:'desc'}});return <div className="container"><Breadcrumbs items={[{name:'Blog'}]}/><div className="page-intro"><p className="eyebrow">RANA REHBER</p><h1>İyi üretim,<br/>doğru bilgiyle başlar.</h1><p>Malzeme seçiminden baskı tekniklerine, projenizi planlarken işinize yarayacak notlar.</p></div><div className="blog-grid" style={{paddingBottom:90}}>{posts.map(p=><article className="blog-card" key={p.id}><Link className="blog-image" href={`/blog/${p.slug}`}><Image src={p.image} alt={p.alt} fill sizes="(max-width:600px) 100vw,33vw"/></Link><p className="eyebrow">BASKI & AMBALAJ</p><h2><Link href={`/blog/${p.slug}`}>{p.title}</Link></h2><p>{p.excerpt}</p><Link className="text-link" href={`/blog/${p.slug}`}>Yazıyı okuyun →</Link></article>)}</div></div>;}
