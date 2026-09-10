import type { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { siteUrl } from '@/lib/utils';
export const dynamic='force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const [products,categories,sectors,posts]=await Promise.all([db.product.findMany({where:{active:true,category:{active:true}}}),db.category.findMany({where:{active:true}}),db.sector.findMany({where:{active:true}}),db.blogPost.findMany({where:{active:true}})]);return [...['','/urunler','/sektorler','/hakkimizda','/uretim','/blog','/iletisim','/teklif-al','/kvkk','/gizlilik-politikasi','/cerez-politikasi'].map(p=>({url:siteUrl()+p})),...products.map(p=>({url:siteUrl()+'/urunler/'+p.slug,lastModified:p.updatedAt})),...categories.map(p=>({url:siteUrl()+'/kategoriler/'+p.slug})),...sectors.map(p=>({url:siteUrl()+'/sektorler/'+p.slug})),...posts.map(p=>({url:siteUrl()+'/blog/'+p.slug,lastModified:p.updatedAt}))];}
