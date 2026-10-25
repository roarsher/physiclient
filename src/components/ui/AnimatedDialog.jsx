import { useEffect, useId, useRef, useState } from 'react';
export default function AnimatedDialog({ title, children, onClose, className = '' }) {
 const dialog = useRef(null); const timer = useRef(null); const [closing,setClosing] = useState(false); const id=useId();
 useEffect(() => {
  const node=dialog.current; const previous=document.activeElement; const overflow=document.body.style.overflow;
  node.showModal(); document.body.style.overflow='hidden';
  return () => { clearTimeout(timer.current); node.close(); document.body.style.overflow=overflow; previous?.focus(); };
 }, []);
 function dismiss() { if (closing) return; setClosing(true); timer.current=setTimeout(onClose,180); }
 return <dialog ref={dialog} aria-labelledby={id} className={`sheet ${closing?'closing':''} ${className}`} onCancel={e=>{e.preventDefault();dismiss();}} onClick={e=>{if(e.target===e.currentTarget)dismiss();}}>
  <div className="sheet-inner"><div className="handle" aria-hidden="true"/><header className="sheet-header"><h2 id={id}>{title}</h2><button className="close" type="button" onClick={dismiss} aria-label="Close dialog">×</button></header>{children}</div>
 </dialog>;
}
