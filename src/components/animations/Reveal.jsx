import {motion,useReducedMotion} from 'framer-motion';
export default function Reveal({children,delay=0,className=''}){const reduced=useReducedMotion();return <motion.div className={className} initial={reduced?false:{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} transition={{duration:.65,delay,ease:[.22,1,.36,1]}}>{children}</motion.div>}
