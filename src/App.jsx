import {useState,createContext,useContext} from 'react';import ForestMap from './ForestMap.jsx';
import TreeRecommend from './TreeRecommend.jsx';
const Ctx=createContext(()=>{});

const NAV=[['map','Peta Prioritas'],['mission','Manajemen Misi'],['alert','Peringatan Dini',3],['tree','Rekomendasi Tanam'],['growth','Monitoring Pertumbuhan']];
const trend=[[0,.9],[1,.82],[2,.7],[3,.42],[4,.33],[5,.21]],months=['Nov','Des','Jan','Feb','Mar','Apr'];

const Chip=({t,c='g'})=><span className={`chip ${c}`}>{t}</span>;
function Btn({children,done='Selesai',msg,cls='btn',onDone,style}){
  const n=useContext(Ctx),[s,setS]=useState(0);
  const go=()=>{if(s)return;setS(1);setTimeout(()=>{setS(2);n(msg||done);onDone&&onDone();setTimeout(()=>setS(0),2000)},800)};
  return <button className={`${cls} ${s===2?'ok':''}`} style={style} disabled={s===1} aria-busy={s===1} onClick={go}>{s===1?'Memproses…':s===2?'✓ '+done:children}</button>;
}
const Stat=({l,v,s,c})=><div className="card"><div className="lbl">{l}</div><div className={`big ${c||''}`}>{v}</div><div className="mono" style={{fontSize:11,color:'var(--mut)'}}>{s}</div></div>;

function Trend(){
  const p=trend.map(([i,v])=>`${20+i*52},${10+(1-v)*90}`);
  return <div className="card"><div className="lbl">Tren indeks vegetasi (6 bulan)</div>
    <svg viewBox="0 0 300 130" width="100%" role="img" aria-label="NDVI turun dari 0.9 ke 0.21">
      <line x1="20" x2="290" y1="45" y2="45" stroke="#52b788" strokeDasharray="3 3" opacity=".5"/>
      <polyline points={p.join(' ')} fill="none" stroke="#f87171" strokeWidth="2"/>
      <line x1="176" x2="176" y1="10" y2="100" stroke="#dc2626" strokeDasharray="3 3"/>
      <text x="176" y="8" fill="#f87171" fontSize="8" textAnchor="middle" fontFamily="JetBrains Mono">KARHUTLA</text>
      {months.map((m,i)=><text key={m} x={20+i*52} y="120" fill="#8fa89b" fontSize="9" textAnchor="middle" fontFamily="JetBrains Mono">{m}</text>)}
    </svg></div>;
}

function Robot(){
  return <div className="card"><div className="lbl">Rekomendasi eksekusi robotik · SOP-RES-4B</div>
    <h3 style={{color:'var(--em)',margin:'6px 0'}}>Drone Seeding X6 + Rover Bio-Leg</h3>
    <p style={{fontSize:12,color:'var(--mut)'}}>Gambut lunak tidak dilalui traktor roda konvensional; kapsul biji terurai hayati dijatuhkan dari udara dengan densitas 450 kapsul/ha.</p>
    <p className="mono" style={{fontSize:11,margin:'8px 0'}}>Est. Durasi: 3.5 Jam · Spesies: Jelutung Rawa</p>
    <Btn done="Misi terkirim" msg="Misi penanaman dikirim ke armada robotik (simulasi)">Buat Misi Penanaman (Kirim Robotik)</Btn>
    <Btn cls="btn ghost" done="Data dimuat" msg="Data sensor Node #084: RH 64%, suhu 27.8°C" style={{marginTop:6}}>Lihat Data Sensor LoRa Terdekat (Node #084)</Btn></div>;
}

function Alerts(){
  const [f,setF]=useState('all'),[gone,setGone]=useState([]);
  const list=[
    {k:'c',t:'Deteksi Anomali Gas & Termal (Potensi Karhutla Gambut Bawah Permukaan)',tag:'KRITIS: KARHUTLA BAWAH PERMUKAAN',id:'ALR-2024-0916',ai:'97.2% Akurasi Model AI',when:'11 Menit Lalu (10:34 WIB)',loc:'Lanskap Gambut Kampar Sektor 7 (Lat 0.312° N, Long 101.761° E)',m:[['Konsentrasi gas metana (CH₄)','480 ppm','+248% ambang batas','r'],['Suhu tanah gambut (30 cm)','58.4°C','+14.0°C dlm 2 jam','r']],rec:'Luncurkan drone pemadam water-bombing mikro (DR-02) untuk mencegah smoldering fire meluas ke lapisan gambut dalam.',a:'Luncurkan Drone Verifikasi (DR-02)'},
    {k:'c',t:'Deteksi Akustik Gergaji Mesin (Chainsaw Detection - Pembalakan Liar)',tag:'KRITIS: PEMBALAKAN LIAR',id:'ALR-2024-414C',ai:'91.5% Spectrogram Match',when:'24 Menit Lalu (10:21 WIB)',loc:'Zona Inti TN Tanjung Puting, Sektor Katingan (Lat -2.841° S, Long 112.432° E)',m:[['Durasi berulang','4.2 Menit','Node LoRa #A-14','r'],['Unit patroli terdekat','3.8 km','ETA 18 mnt','a']],rec:'Kirim koordinat GPS ke Unit Patroli Reaksi Cepat Polhut dan aktifkan rotasi optik PTZ Tower 3.',a:'Kirim Koordinat Patroli Polhut'},
    {k:'a',t:'Anomali Suhu Kanopi Udara & Angin Kering Ekstrem',tag:'PERINGATAN SEDANG: IKLIM MIKRO',id:'ALR-2024-047M',ai:'Tingkat bahaya sedang',when:'42 Menit Lalu (10:03 WIB)',loc:'Hutan Lindung Bukit Tigapuluh Blok E (Lat -0.982° S, Long 102.511° E)',m:[['Suhu udara kanopi','39.2°C','','a'],['Kelembapan relatif','31%','Sangat kering','a'],['Kecepatan angin','22 km/j','','a']],rec:'Status siaga kuning; patroli mandiri masyarakat (MPA) direkomendasikan.',a:'Peringatan MPA Bukit Tigapuluh'}];
  const shown=list.filter(x=>(f==='all'||x.k===f)&&!gone.includes(x.id));
  return <>
    <div className="lbl mono">PUSAT KOMANDO TACTICAL C2 &gt; Pusat Kendali Operasigt; Ringkasan Operasi</div><h1>Peringatan Dini & Telemetri Pertumbuhan</h1>
    <div className="grid g4">
      <Stat l="Total peringatan aktif" v="14" s="Anomali terdeteksi"/><Stat l="Kritis (fire/feeling)" v="03" s="Tindakan cepat" c="red"/>
      <Stat l="Meteorologi / gas" v="06" s="Elevated risk" c="amb"/><Stat l="Jaringan LoRa mesh" v="99.1%" s="Packet integrity"/></div>
    <div className="tabs">{[['all','Semua Peringatan (14)'],['c','Kritis (Kebakaran) (3)'],['a','Peringatan Sedang (Gas/Suhu) (6)']].map(([k,l])=><button key={k} className={`tab ${f===k?'on':''}`} onClick={()=>setF(k)}>{l}</button>)}</div>
    <div className="grid g2"><div className="grid">{shown.map(x=>
      <article key={x.id} className={`card ${x.k==='c'?'crit':''}`}>
        <div style={{display:'flex',gap:8,flexWrap:'wrap',alignItems:'center'}}><Chip t={x.tag} c={x.k==='c'?'r':'a'}/><span className="mono" style={{fontSize:11}}>ID: {x.id}</span><Chip t={x.ai}/><span className="sp"/><span className="mono" style={{fontSize:11}}>{x.when}</span></div>
        <h2 style={{font:'600 20px/28px Inter',margin:'8px 0 2px'}}>{x.t}</h2><div className="mono" style={{fontSize:11,color:'var(--mut)'}}>{x.loc}</div>
        <div className="grid g3" style={{margin:'10px 0'}}>{x.m.map(([l,v,d,c])=><div key={l} className="card" style={{background:'var(--bg)'}}><div className="lbl">{l}</div><div className={`val ${c==='r'?'red':'amb'}`}>{v}</div><div className="mono" style={{fontSize:10}}>{d}</div></div>)}</div>
        <p style={{fontSize:12}}><b className="mono">REKOMENDASI C2 AI: </b>{x.rec}</p>
        <div style={{display:'flex',gap:8,marginTop:8,flexWrap:'wrap'}}><Btn done="Terkirim" msg={x.a+' berhasil (simulasi)'} style={{maxWidth:320}}>{x.a}</Btn><Btn cls="btn ghost" done="Ditutup" msg={x.id+' ditandai selesai'} onDone={()=>setTimeout(()=>setGone(g=>[...g,x.id]),600)} style={{maxWidth:160}}>Tandai Selesai</Btn></div></article>)}</div>
      <div className="grid" style={{alignContent:'start'}}><div className="map" style={{minHeight:200}}><ForestMap uid="al"><polygon points="200,150 330,130 380,260 250,320 170,250" fill="rgba(220,38,38,.3)" stroke="#dc2626" strokeWidth="3"/><circle cx="270" cy="220" r="10" fill="#dc2626" className="pulse"/></ForestMap><div className="hud" style={{left:8,bottom:8}}>Citra Sentinel-2 (RGB)</div></div><Trend/><Robot/></div></div></>;
}

function MapView(){
  const [sel,setSel]=useState('R1A-KMP-04'),[f,setF]=useState('all'),[z,setZ]=useState(1),[L,setL]=useState({cover:true,burn:true,ndvi:true,soil:false});
  const P=[['R1A-KMP-04',92,'260,170 340,150 380,240 300,280 240,240','top',0.21,'342.8 ha','r'],['KTG-MND-09',68,'470,110 550,90 600,190 520,220 460,180','rec',0.54,'128.7 ha','g'],['R1A-GSK-02',34,'120,300 210,280 250,370 170,420 100,380','ready',0.68,'218.6 ha','g'],['R1A-TRP-11',76,'480,340 570,320 610,410 530,450 470,420','high',0.32,'95.4 ha','a']];
  const T=[['all','Semua Persil',142],['top','Prioritas Utama',18],['ready','Siap Ditanam',29],['rec','Dalam Pemulihan',6],['high','Risiko Tinggi',7]];
  const cur=P.find(p=>p[0]===sel),col={r:['rgba(220,38,38,.35)','#dc2626'],a:['rgba(217,119,6,.35)','#d97706'],g:['rgba(82,183,136,.3)','#52b788']};
  const LY=[['cover','Tutupan Hutan (Sentinel-2)'],['ndvi','NDVI (Indeks Vegetasi)'],['burn','Bekas Terbakar (Burn Scar)'],['soil','Kelembapan Tanah (LoRa)']];
  return <>
    <div className="tabs">{T.map(([k,l,n])=><button key={k} className={`tab ${f===k?'on':''}`} onClick={()=>setF(k)}>{l} {n}</button>)}</div>
    <div className="grid g2"><div className="map" style={{minHeight:520}}>
      <ForestMap uid="mp" layers={L} zoom={z}>{P.map(([id,s,pts,cat,,,c])=>{const on=f==='all'||f===cat,q=pts.split(' ')[0].split(',');return <g key={id} onClick={()=>setSel(id)} style={{cursor:'pointer',opacity:on?1:.15}} tabIndex={0} role="button" aria-label={'Persil '+id} onKeyDown={e=>e.key==='Enter'&&setSel(id)}><polygon points={pts} fill={col[c][0]} stroke={col[c][1]} strokeWidth={sel===id?4:2}/><text x={+q[0]+10} y={+q[1]+70} fill="#fff" fontSize="13" fontFamily="JetBrains Mono" stroke="#000" strokeWidth=".4">{id} [{s}]</text></g>})}</ForestMap>
      <div className="hud" style={{left:12,top:12,width:250}}><div className="lbl">Lapisan sensor & GIS · {Object.values(L).filter(Boolean).length} aktif</div>{LY.map(([k,l])=><label key={k} style={{display:'flex',gap:8,padding:'4px 0',cursor:'pointer'}}><input type="checkbox" checked={L[k]} onChange={()=>setL(o=>({...o,[k]:!o[k]}))}/>{l}</label>)}</div>
      <div className="zoom"><button aria-label="Perbesar" disabled={z>=2.2} onClick={()=>setZ(z+.4)}>+</button><button aria-label="Perkecil" disabled={z<=1} onClick={()=>setZ(Math.max(1,z-.4))}>−</button></div>
      <div className="hud mono" style={{left:12,bottom:12,fontSize:11}}>WGS84 / UTM 48N · Zoom {Math.round(z*10+4)}x · Tutupan hutan tersisa 24%</div></div>
    <div className="grid" style={{alignContent:'start'}}><div className="card"><Chip t={`RISIKO ${cur[1]>=75?'TINGGI':cur[1]>=40?'SEDANG':'RENDAH'} (SKOR ${cur[1]}/100)`} c={cur[6]}/><h2 style={{font:'700 24px Inter',margin:'8px 0'}}>Persil {sel}</h2><div className="mono" style={{fontSize:11}}>Lanskap Gambut Kampar, Riau Sektor VII · Gradient Boosting AI 94.8%</div>
      <div className="kv" style={{marginTop:10}}><div className="card"><div className="lbl">Luas lahan</div><div className="val">{cur[5]}</div></div><div className="card"><div className="lbl">NDVI saat ini</div><div className={`val ${cur[4]<.4?'red':''}`}>{cur[4]}</div></div><div className="card"><div className="lbl">Topografi</div><div className="val">1.8°</div></div><div className="card"><div className="lbl">Riwayat karhutla</div><div className="val amb">3x</div></div></div></div><Trend/><Robot/></div></div></>;
}

function Missions(){
  const n=useContext(Ctx);
  const [M,setM]=useState([['RE-2025-084','Restorasi Koridor Gambut Kampar Blok C','BERJALAN',62.8],['RE-2025-085','Seeding Aerotransport Bukit Suligi','TERJADWAL',0],['RE-2025-086','Inokulasi Mikoriza & Biochar Giam Siak','TERJADWAL',0],['RE-2025-082','Koridor Restorasi Tegalan Sungai Kampar','TERVERIFIKASI',100]]);
  const [sel,setSel]=useState(0),[paused,setPaused]=useState(false),[fl,setFl]=useState('all');
  const m=M[sel],log=[['10:42:15','[TR-01] Telemetri permukaan gambut: lunak terdeteksi (kedalaman 15cm).'],['10:38:06','[DR-03] Payload: sortasi penebangan ke-4, pelepasan 1.200 kapsul.'],['10:15:22','[Sensor LoRa #884] Kelembapan mikro di zona penanaman: 64% RH (ideal).']];
  const add=()=>{const id='RE-2025-'+String(87+M.length-4).padStart(3,'0');setM(a=>[...a,[id,'Misi baru (draf) Blok '+String.fromCharCode(65+M.length),'TERJADWAL',0]]);n(id+' dibuat (simulasi)')};
  const shown=M.map((x,i)=>[x,i]).filter(([x])=>fl==='all'||(fl==='run'?x[2]==='BERJALAN':x[2]==='TERJADWAL'));
  return <>
    <div style={{display:'flex',alignItems:'center'}}><div className="lbl mono">Autonomous C2 mesh engine · latency 18ms</div><span className="sp"/><button className="btn" style={{width:200}} onClick={add}>+ Inisiasi Misi Baru</button></div>
    <div className="grid" style={{gridTemplateColumns:'340px 1fr 320px'}}>
      <div className="card"><div className="lbl">Daftar misi aktif & terjadwal · {M.length} entitas</div>
        <div className="tabs" style={{margin:'8px 0'}}>{[['all','Semua'],['run','Berjalan'],['sch','Terjadwal']].map(([k,l])=><button key={k} className={`tab ${fl===k?'on':''}`} onClick={()=>setFl(k)}>{l}</button>)}</div>
        {shown.map(([[id,t,s,p],i])=><button key={id} className={`card mi ${sel===i?'on':''}`} style={{marginTop:8,background:'var(--bg)'}} onClick={()=>setSel(i)}><div style={{display:'flex',justifyContent:'space-between'}}><span className="mono" style={{fontSize:11}}>{id}</span><Chip t={s} c={s==='TERJADWAL'?'a':'g'}/></div><div style={{fontWeight:600}}>{t}</div><div className="bar"><i style={{width:p+'%'}}/></div></button>)}</div>
      <div className="grid" style={{alignContent:'start'}}><div className="card"><Chip t={paused?'DIJEDA':m[2]} c={paused?'a':'g'}/> <span className="mono">{m[0]}</span><h1 style={{marginTop:6}}>{m[1]}</h1>
        <div className="grid g3" style={{margin:'10px 0'}}><Stat l="Armada darat" v="TR-01" s="Rover Kancil"/><Stat l="Armada udara" v="DR-03" s="Sortasi 4/6"/><Stat l="Target konservasi" v="15.000" s="Kapsul biji"/></div>
        <div className="lbl">Progres penanaman kapsul</div><div className="mono val">{Math.round(m[3]*150)} / 15.000 · {m[3]}%</div><div className="bar"><i style={{width:m[3]+'%'}}/></div></div>
        <div className="tabs"><button className="tab" onClick={()=>{setPaused(!paused);n(paused?'Misi dilanjutkan':'Misi dijeda (simulasi)')}}>{paused?'▶ Lanjutkan':'⏸ Jeda Sementara'}</button><Btn cls="tab" done="RTH aktif" msg="Armada kembali ke base (simulasi)" style={{width:'auto'}}>Kembali ke Base (RTH)</Btn><button className="tab" onClick={()=>n('Parameter penaburan dibuka (simulasi)')}>Ubah Parameter Penaburan</button></div>
        <div className="map" style={{minHeight:240}}><ForestMap uid="ms"><polygon points="200,150 420,110 520,260 330,380 150,300" fill="rgba(82,183,136,.2)" stroke="#52b788" strokeWidth="3" strokeDasharray="8 6"/><circle cx="340" cy="230" r="9" fill="#60a5fa" className="pulse"/></ForestMap><div className="hud mono" style={{left:8,top:8,fontSize:11}}>DR-03 · ALT 28m · SPD 4.8 m/s</div></div></div>
      <div className="card"><div className="lbl">Event log operasional real-time</div>{log.map(([t,x])=><div className="log" key={t}><b>{t}</b><span>{x}</span></div>)}</div></div></>;
}

export default function App(){
  const [v,setV]=useState('map'),[t,setT]=useState(''),[sos,setSos]=useState(false);
  const notify=m=>{setT(m);clearTimeout(window.__t);window.__t=setTimeout(()=>setT(''),2600)};
  return <Ctx.Provider value={notify}><div className="app">
    <header className="top"><div className="logo">RESTY<small>FORESTRY C2 · v4.2</small></div><span className="pill">RESTY / Riau / L</span><span className="pill">Riau - Lanskap Gambut Kampar</span><span className="pill">● SYNC Sentinel-2: T-47m</span><span className="sp"/><button className={`sos ${sos?'on':''}`} aria-pressed={sos} onClick={()=>{setSos(!sos);notify(sos?'Siaga darurat dinonaktifkan':'SIAGA DARURAT aktif — tim diberi notifikasi (simulasi)')}}>{sos?'● SIAGA AKTIF':'SIAGA DARURAT'}</button></header>
    <nav className="side"><h6 style={{margin:'4px 0 8px'}}>Tampilan navigasi</h6>{NAV.map(([k,l,b])=><button key={k} className={`nav ${v===k?'on':''}`} onClick={()=>setV(k)}>{l}{b&&<span className="badge">{b}</span>}</button>)}
      <div className="tele"><div>STATUS TELEMETRI <span style={{color:'var(--em)'}}>● ONLINE</span></div><div>LoRa Mesh 99.4% RSSI</div><div style={{marginTop:8}}>Cdr. Hendra P.<br/>Forestry Unit VII</div></div></nav>
    <main>{v==='map'&&<MapView/>}{v==='alert'&&<Alerts/>}{v==='mission'&&<Missions/>}{v==='tree'&&<TreeRecommend/>}{v==='growth'&&<><h1>Monitoring Pertumbuhan</h1><div className="grid g2b"><Trend/><Robot/></div></>}</main>{t&&<div className="toast" role="status">{t}</div>}</div></Ctx.Provider>;
}
