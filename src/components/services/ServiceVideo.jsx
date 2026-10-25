import {useEffect,useRef,useState} from 'react';
import {mediaUrl} from '../../services/api';
import ServiceImage from '../ui/ServiceImage';
export default function ServiceVideo({service}){
 const player=useRef(null);const [failed,setFailed]=useState(!service.videoUrl);const [blocked,setBlocked]=useState(false);
 useEffect(()=>{let active=true;const node=player.current;if(!node)return undefined;
  const play=node.play();if(play?.catch)play.catch(()=>{if(active)setBlocked(true);});
  return()=>{active=false;node.pause();};
 },[service.videoUrl]);
 if(failed)return <div className="video-fallback"><ServiceImage type={service.picture} className="detail-image"/><div className="p-4 text-center"><p className="font-semibold text-clinic">Service video coming soon</p><p className="text-sm text-slate-600">The service details are available below.</p></div></div>;
 return <div className="service-player"><video ref={player} className="w-full rounded-2xl bg-black" src={mediaUrl(service.videoUrl)} controls autoPlay muted playsInline preload="metadata" onError={()=>setFailed(true)} onPlay={()=>setBlocked(false)} aria-label={`${service.name} explanation video`}>{service.videoCaptionsUrl&&<track kind="captions" src={mediaUrl(service.videoCaptionsUrl)} srcLang="en" label="English" default/>}Your browser does not support video playback.</video><p className="mt-2 text-xs text-slate-600">Video starts muted. Use the speaker control for sound.</p>{blocked&&<button className="button full mt-3" onClick={()=>{player.current?.play()?.catch(()=>setBlocked(true));}}>Play service video</button>}</div>;
}
