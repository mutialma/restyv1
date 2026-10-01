import {useState,useMemo} from 'react';

const SPECIES=[
 {n:'Jelutung Rawa',l:'Dyera polyphylla',ico:'🌳',soil:['Gambut'],ph:[3.5,5],moist:[70,100],light:['Terbuka','Naungan Sebagian'],carbon:18.2,grow:'Sedang (2-3 m/thn)',note:'Toleran genangan dalam, akar papan menahan tanah gambut lunak.'},
 {n:'Punak',l:'Tetramerista glabra',ico:'🌲',soil:['Gambut'],ph:[3.5,4.8],moist:[80,100],light:['Naungan Sebagian','Naungan Penuh'],carbon:14.5,grow:'Lambat (1-1.5 m/thn)',note:'Spesies klimaks gambut dalam, baik untuk restorasi zona inti.'},
 {n:'Meranti Rawa',l:'Shorea balangeran',ico:'🌴',soil:['Gambut','Mineral'],ph:[4,5.5],moist:[60,90],light:['Terbuka'],carbon:21.0,grow:'Sedang (2-2.5 m/thn)',note:'Kayu komersial, cocok untuk blok produksi berkelanjutan.'},
 {n:'Geronggang',l:'Cratoxylum arborescens',ico:'🌱',soil:['Gambut','Mineral'],ph:[4,6],moist:[40,80],light:['Terbuka'],carbon:12.8,grow:'Cepat (3-4 m/thn)',note:'Pionir cepat tumbuh, baik menutup lahan terbuka lebih dulu.'},
 {n:'Mahang',l:'Macaranga pruinosa',ico:'🍃',soil:['Mineral','Pasir'],ph:[5,6.5],moist:[30,60],light:['Terbuka'],carbon:9.4,grow:'Cepat (3-5 m/thn)',note:'Pionir pada lahan mineral terdegradasi, menaungi bibit sela.'},
 {n:'Gelam',l:'Melaleuca cajuputi',ico:'🌿',soil:['Gambut','Pasir'],ph:[3,5],moist:[50,90],light:['Terbuka','Naungan Sebagian'],carbon:11.0,grow:'Sedang (2-3 m/thn)',note:'Tahan kebakaran ringan, cocok sabuk hijau zona rawan karhutla.'},
];

function score(sp,c){
  let s=0,n=0;
  n++; s+=sp.soil.includes(c.soil)?1:0.15;
  n++; s+=(c.ph>=sp.ph[0]&&c.ph<=sp.ph[1])?1:Math.max(0,1-Math.abs(c.ph-((sp.ph[0]+sp.ph[1])/2))*0.35);
  n++; s+=(c.moist>=sp.moist[0]-15&&c.moist<=sp.moist[1]+15)?1:0.25;
  n++; s+=sp.light.includes(c.light)?1:0.3;
  return Math.round((s/n)*100);
}

export default function TreeRecommend(){
  const [c,setC]=useState({soil:'Gambut',ph:4.2,moist:78,light:'Terbuka'});
  const ranked=useMemo(()=>SPECIES.map(sp=>({...sp,m:score(sp,c)})).sort((a,b)=>b.m-a.m),[c]);
  return <>
    <div className="lbl mono">REKOMENDASI TANAM &gt; Kecocokan Spesies</div>
    <h1>Rekomendasi Pohon untuk Lokasi Ini</h1>
    <div className="grid g2">
      <div className="card">
        <div className="lbl" style={{marginBottom:10}}>Kondisi lahan</div>
        <div className="grid" style={{gap:14}}>
          <label>Tipe tanah<select className="sel" style={{marginTop:6}} value={c.soil} onChange={e=>setC({...c,soil:e.target.value})}>
            {['Gambut','Mineral','Pasir'].map(o=><option key={o}>{o}</option>)}</select></label>
          <label>pH tanah: <span className="mono" style={{color:'var(--em)'}}>{c.ph.toFixed(1)}</span>
            <input className="slider" type="range" min="3" max="7.5" step="0.1" value={c.ph} onChange={e=>setC({...c,ph:+e.target.value})}/></label>
          <label>Kelembapan tanah: <span className="mono" style={{color:'var(--em)'}}>{c.moist}%</span>
            <input className="slider" type="range" min="10" max="100" value={c.moist} onChange={e=>setC({...c,moist:+e.target.value})}/></label>
          <label>Paparan cahaya<select className="sel" style={{marginTop:6}} value={c.light} onChange={e=>setC({...c,light:e.target.value})}>
            {['Terbuka','Naungan Sebagian','Naungan Penuh'].map(o=><option key={o}>{o}</option>)}</select></label>
        </div>
        <p style={{fontSize:12,color:'var(--mut)',marginTop:14}}>Skor kecocokan dihitung dari kesesuaian tipe tanah, rentang pH toleransi, kebutuhan kelembapan, dan kebutuhan cahaya tiap spesies terhadap kondisi yang dimasukkan.</p>
      </div>
      <div className="card" style={{background:'var(--bg)'}}>
        <div className="lbl">Ringkasan lokasi</div>
        <div className="kv" style={{marginTop:8}}>
          <div className="card"><div className="lbl">Tipe tanah</div><div className="val">{c.soil}</div></div>
          <div className="card"><div className="lbl">pH</div><div className="val">{c.ph.toFixed(1)}</div></div>
          <div className="card"><div className="lbl">Kelembapan</div><div className="val">{c.moist}%</div></div>
          <div className="card"><div className="lbl">Cahaya</div><div className="val" style={{fontSize:13}}>{c.light}</div></div>
        </div>
      </div>
    </div>
    <div className="lbl" style={{marginTop:4}}>Spesies terurut berdasarkan kecocokan</div>
    <div className="grid" style={{gap:10}}>
      {ranked.map(sp=><div key={sp.n} className="card tree">
        <div className="ico">{sp.ico}</div>
        <div style={{flex:1}}>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'baseline'}}>
            <div><b style={{fontSize:16}}>{sp.n}</b> <span className="mono" style={{fontSize:11,color:'var(--mut)'}}>{sp.l}</span></div>
            <span className="score">{sp.m}%</span>
          </div>
          <div className="match" style={{margin:'6px 0'}}><i style={{width:sp.m+'%'}}/></div>
          <p style={{fontSize:12,color:'var(--mut)'}}>{sp.note}</p>
          <div className="mono" style={{fontSize:11,marginTop:4}}>Serapan karbon ~{sp.carbon} tCO₂/ha/thn · Laju tumbuh: {sp.grow}</div>
        </div>
      </div>)}
    </div>
  </>;
}
