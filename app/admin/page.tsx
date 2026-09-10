import { redirect } from 'next/navigation';
import { getSession } from '@/lib/security';
import { LoginForm } from '@/components/admin/auth';
export default async function AdminLogin(){if(await getSession())redirect('/admin/dashboard');return <div className="login-wrap"><div className="login-card"><p className="eyebrow">RANA ETİKET & MATBAA</p><h1>Yönetim paneli</h1><p className="muted">İçeriklerinizi ve teklif taleplerini yönetin.</p><LoginForm/></div></div>;}
