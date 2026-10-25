import AnimatedDialog from '../ui/AnimatedDialog';
import EnquiryForm from '../contact/EnquiryForm';
import {useEnquiry} from '../../context/EnquiryContext';
export default function EnquiryModal(){const {enquiry,closeEnquiry}=useEnquiry();return <AnimatedDialog title={enquiry.purpose==='free-assessment'?'Book a free assessment':'Let’s talk about your care'} onClose={closeEnquiry}><div className="enquiry-content"><EnquiryForm service={enquiry.service} purpose={enquiry.purpose||'general'} onDone={closeEnquiry}/></div></AnimatedDialog>}
