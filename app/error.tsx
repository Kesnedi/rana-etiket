'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <div className="container section"><h1>Sayfa yüklenemedi.</h1><p>Geçici bir sorun oluştu. Lütfen yeniden deneyin.</p><button className="button" onClick={reset}>Yeniden dene</button></div>;}
