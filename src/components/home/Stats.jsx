import {useEffect,useRef,useState} from 'react';
import {useInView,useReducedMotion,animate} from 'framer-motion';
import {useSite} from '../../context/SiteContext';
import Reveal from '../animations/Reveal';
function Counter({value,suffix}){const ref=useRef(null);const inView=useInView(ref,{once:true});const reduced=useReducedMotion();const [shown,setShown]=useState(0);useEffect(()=>{if(!inView||typeof value!=='number')return undefined;if(reduced){setShown(value);return undefined;}const animation=animate(0,value,{duration:1.7,ease:'easeOut',onUpdate:v=>setShown(Math.round(v))});return()=>animation.stop()},[inView,value,reduced]);return <strong ref={ref}>{typeof value==='number'?`${shown}${suffix||''}`:'—'}</strong>}
export default function Stats(){const clinic=useSite().settings;const missing=clinic.stats.some(s=>typeof s.value!=='number');return <Reveal className="stats-wrap shell"><div className="stats-row">{clinic.stats.map(s=><div key={s.label}><Counter {...s}/><span>{s.label}</span></div>)}</div>{missing&&<p className="stats-note">Centre figures will appear here once confirmed.</p>}</Reveal>}
