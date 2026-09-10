import { cache } from 'react';
import { db } from './db';
import { parse } from './utils';
export type HomeContent={eyebrow:string;title:string;description:string;image:string;ctaText:string;ctaUrl:string;featuredTitle:string;categoryTitle:string;sectorTitle:string;whyTitle:string;whyText:string;processTitle:string;process:string[][];ctaTitle:string;ctaDescription:string;featuredIds:string[];categoryIds:string[];sectorIds:string[]};
export type Settings={company:string;tagline:string;logo:string;favicon:string;phone:string;whatsapp:string;email:string;address:string;mapTitle:string;mapsUrl:string;mapsEmbed:string;latitude:string;longitude:string;yandex:string;instagram:string;facebook:string;linkedin:string;footer:string;analytics:string;seoTitle:string;seoDescription:string;home:HomeContent;about:{title:string;text:string;values:string[][]};production:{title:string;description:string;capabilities:string[][];machines:string[][]};menus:{header:string[][];footer:string[][]}};
export const getSettings=cache(async()=>{const rows=await db.siteSetting.findMany();return Object.fromEntries(rows.map(r=>[r.key,parse<unknown>(r.value,'')])) as Settings;});
