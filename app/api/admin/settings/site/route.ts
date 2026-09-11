import {revalidatePath} from 'next/cache';import {db} from '@/lib/db';import {requireAdmin,sameOrigin,apiError} from '@/lib/security';
const allowed=['logo','company','tagline','phone','whatsapp','email','address','mapTitle','mapsUrl','instagram','facebook','linkedin','footer','seoTitle','seoDescription'];
export async function POST(request:Request){try{sameOrigin(request);await requireAdmin();const body=await request.json();for(const key of allowed){if(typeof body[key]==='string')await db.siteSetting.upsert({where:{key},create:{key,value:JSON.stringify(body[key])},update:{value:JSON.stringify(body[key])}})}revalidatePath('/', 'layout');revalidatePath('/admin/settings/edit');return Response.json({ok:true})}catch(e){return apiError(e)}}


