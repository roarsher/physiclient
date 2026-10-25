import React,{act} from 'react';
import {createRoot} from 'react-dom/client';
import EnquiryModal from './EnquiryModal';
import {submitEnquiry} from '../../services/api';
jest.mock('../../services/api',()=>({submitEnquiry:jest.fn()}));
jest.mock('../../context/EnquiryContext',()=>({useEnquiry:()=>({enquiry:{service:{id:'at-home-physiotherapy-services',name:'Physiotherapy Home Visits',homeVisit:true}},closeEnquiry:jest.fn()})}));
jest.mock('../ui/AnimatedDialog',()=>({__esModule:true,default:({children})=><section>{children}</section>}));
test('home service requests a required address and sends it with the enquiry',async()=>{
 global.IS_REACT_ACT_ENVIRONMENT=true;
 const node=document.createElement('div');document.body.append(node);const root=createRoot(node);
 submitEnquiry.mockResolvedValue({id:'test-reference',status:'new'});
 try{await act(async()=>root.render(<EnquiryModal/>));
  expect(node.querySelector('[name="homeAddress"]').required).toBe(true);
  node.querySelector('[name="name"]').value='Test Visitor';node.querySelector('[name="phone"]').value='9876543210';node.querySelector('[name="homeAddress"]').value='Flat 12, Main Road, Patna';
  await act(async()=>node.querySelector('form').dispatchEvent(new Event('submit',{bubbles:true,cancelable:true})));
  expect(submitEnquiry).toHaveBeenCalledWith(expect.objectContaining({visitType:'home',homeAddress:'Flat 12, Main Road, Patna',serviceId:'at-home-physiotherapy-services'}));
  expect(node.textContent).toContain('test-reference');
 }finally{act(()=>root.unmount());node.remove();}
});
