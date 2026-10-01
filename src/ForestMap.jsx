import {useMemo} from 'react';
const rnd=s=>()=>(s=s*16807%2147483647)/2147483647;
export const FOREST=['M40 60C120 20 210 40 230 110 250 180 170 230 90 210 30 190 10 110 40 60Z','M480 330C560 290 660 320 680 400 700 470 600 510 520 490 450 470 430 380 480 330Z','M300 440C340 420 390 440 385 480 380 515 320 520 295 495Z','M560 40C610 30 660 60 650 100 640 140 585 130 565 95Z'];
const BB=[[10,20,250,230,320],[430,290,700,510,340],[290,420,395,520,60],[550,25,665,145,60]];
const BURN=['M250 300l70-20 40 50-30 60-80 10z','M120 330l60-10 20 50-50 30z','M560 210l50-15 25 40-40 30z'];
export default function ForestMap({uid='a',layers={cover:true,burn:true,ndvi:false,soil:false},zoom=1,children}){
  const d=useMemo(()=>{const r=rnd(42),g=['#1f5a3a','#2d6a4f','#174a2f','#3c7a52'];const t=[];
    BB.forEach(([x0,y0,x1,y1,n])=>{for(let i=0;i<n;i++)t.push([x0+r()*(x1-x0),y0+r()*(y1-y0),3+r()*5,g[i%4]])});
    const lone=Array.from({length:36},()=>[r()*700,r()*520,3+r()*3]),stump=Array.from({length:110},()=>[r()*700,r()*520,r()*1.6+.8]),wet=Array.from({length:16},()=>[r()*700,r()*520]);
    return {t,lone,stump,wet}},[]);
  return <svg viewBox="0 0 700 520" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Citra satelit lahan gambut: sebagian besar hutan telah gundul">
    <defs><filter id={'n'+uid}><feTurbulence type="fractalNoise" baseFrequency=".013" numOctaves="4" seed="3"/><feColorMatrix values="0 0 0 0 .62 0 0 0 0 .5 0 0 0 0 .34 1.3 0 0 0 -.25"/></filter>
      <clipPath id={'f'+uid}>{FOREST.map(p=><path key={p} d={p}/>)}</clipPath>
      <mask id={'m'+uid}><rect width="700" height="520" fill="#fff"/>{FOREST.map(p=><path key={p} d={p} fill="#000"/>)}</mask></defs>
    <g transform={`translate(350 260) scale(${zoom}) translate(-350 -260)`}>
      <rect width="700" height="520" fill="#4a3a29"/><rect width="700" height="520" filter={`url(#n${uid})`}/>
      {d.stump.map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill="#a48a68" opacity=".7"/>)}
      <path d="M-10 250C120 200 220 300 340 250S560 190 710 260" fill="none" stroke="#24505a" strokeWidth="16"/><path d="M-10 250C120 200 220 300 340 250S560 190 710 260" fill="none" stroke="#3d7f8c" strokeWidth="6" opacity=".7"/>
      <path d="M0 120L700 90M400 0L440 520" stroke="#3b6e78" strokeWidth="3"/><path d="M0 400L700 380" stroke="#b39c78" strokeWidth="3" strokeDasharray="10 6"/>
      {layers.burn&&BURN.map(p=><path key={p} d={p} fill="#120e0a" opacity=".85"/>)}
      {layers.cover&&<><g clipPath={`url(#f${uid})`}><path d={FOREST.join('')} fill="#123d28"/>{d.t.map(([x,y,r,c],i)=><g key={i}><circle cx={x+1.5} cy={y+2} r={r} fill="#062014" opacity=".5"/><circle cx={x} cy={y} r={r} fill={c}/></g>)}</g>
        {d.lone.map(([x,y,r],i)=><circle key={i} cx={x} cy={y} r={r} fill="#2d6a4f" opacity=".85"/>)}</>}
      {layers.ndvi&&<rect width="700" height="520" mask={`url(#m${uid})`} fill="#dc2626" opacity=".28"/>}
      {layers.soil&&d.wet.map(([x,y],i)=><circle key={i} cx={x} cy={y} r="5" fill="#38bdf8" stroke="#fff" strokeWidth="1"/>)}
      {children}</g></svg>;
}
