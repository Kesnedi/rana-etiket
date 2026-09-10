import { z } from 'zod';
import { sameOrigin,startSession,endSession,rateLimit,apiError } from '@/lib/security';
export async function POST(request:Request){try{sameOrigin(request);await rateLimit('login',8,15*60000);const {email,password}=z.object({email:z.email(),password:z.string().min(1).max(200)}).parse(await request.json());await startSession(email,password);return Response.json({ok:true});}catch(e){return apiError(e);}}
export async function DELETE(request:Request){try{sameOrigin(request);await endSession();return Response.json({ok:true});}catch(e){return apiError(e);}}
