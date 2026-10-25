import AnimatedDialog from '../ui/AnimatedDialog';
import ServiceVideo from './ServiceVideo';
export default function ServiceDetails({service,onClose,onEnquire}){
 return <AnimatedDialog title={service.name} onClose={onClose} className="service-detail-sheet"><ServiceVideo key={service.id} service={service}/><div className="detail-copy"><span className="category-label">{service.category}</span><p>{service.description}</p><ul className="mb-6 list-disc space-y-2 pl-5 text-sm text-slate-600">{(service.details||[]).map(detail=><li key={detail}>{detail}</li>)}</ul><button className="button full" onClick={()=>onEnquire(service)}>Enquire about this service <span aria-hidden="true">↗</span></button></div></AnimatedDialog>;
}
