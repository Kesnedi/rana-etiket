import { Catalog,type SearchParams } from '@/components/catalog';
import { Breadcrumbs } from '@/components/ui';
export const metadata={title:'Ürünler',description:'Kutu, ambalaj, etiket, tekstil etiketi ve kurumsal baskı ürünlerini keşfedin.',alternates:{canonical:'/urunler'}};
export default async function Products({searchParams}:{searchParams:Promise<SearchParams>}){return <div className="container"><Breadcrumbs items={[{name:'Ürünler'}]}/><div className="page-intro"><p className="eyebrow">RANA ÜRÜN KOLEKSİYONU</p><h1>Markanız için<br/>doğru başlangıç.</h1><p>Malzemeden son dokunuşa, ihtiyacınıza uygun üretim seçeneklerini keşfedin. Her ürün, markanıza özel olarak planlanır.</p></div><Catalog searchParams={await searchParams}/></div>;}
