 import { createContext, useContext, useState } from 'react';

const Context = createContext(null);

export function EnquiryProvider({ children }) {
  const [enquiry, setEnquiry] = useState(null);

  function openEnquiry(service = null, options = {}) {
    setEnquiry({
      service,
      purpose: options.purpose || 'general',
      visitType: service?.homeVisit
        ? 'home'
        : options.visitType === 'home'
          ? 'home'
          : 'clinic',
    });
  }

  function closeEnquiry() {
    setEnquiry(null);
  }

  return (
    <Context.Provider value={{ enquiry, openEnquiry, closeEnquiry }}>
      {children}
    </Context.Provider>
  );
}

export function useEnquiry() {
  return useContext(Context);
}