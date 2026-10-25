import {ArrowUpRight} from 'lucide-react';
import Reveal from '../animations/Reveal';
import {useEnquiry} from '../../context/EnquiryContext';
export default function CTABanner(){const {openEnquiry}=useEnquiry();return <Reveal className="cta-banner shell"><div><span className="eyebrow">ONE CONVERSATION CAN BE A BEGINNING</span><h2>Every journey is unique.<br/>Let’s start yours today.</h2><p>Tell us a little about your needs. We’ll help you understand the next steps.</p></div><button className="button button-white" onClick={()=>openEnquiry(null,{purpose:'appointment'})}>Book Appointment <ArrowUpRight size={18}/></button></Reveal>}
