import { existsSync,writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';
import { spawnSync } from 'node:child_process';
if(!existsSync('.env')){writeFileSync('.env',`DATABASE_URL="file:./dev.db"\nADMIN_EMAIL="admin@ranaetiket.local"\nADMIN_PASSWORD="${randomBytes(24).toString('base64url')}"\nAUTH_SECRET="${randomBytes(48).toString('hex')}"\nSITE_URL="http://localhost:3000"\nCOOKIE_SECURE="false"\nTRUST_PROXY="false"\n`,{mode:0o600});console.log('.env oluşturuldu. Yerel yönetici e-postası: admin@ranaetiket.local. Rastgele şifre yalnızca .env içinde kayıtlıdır.');}
for(const args of [['node_modules/prisma/build/index.js','generate'],['node_modules/prisma/build/index.js','migrate','deploy'],['node_modules/tsx/dist/cli.mjs','prisma/seed.ts'],['node_modules/tsx/dist/cli.mjs','scripts/assets.ts']]){const result=spawnSync(process.execPath,args,{stdio:'inherit'});if(result.status)process.exit(result.status);}
