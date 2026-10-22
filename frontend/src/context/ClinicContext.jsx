import { createContext, useContext, useState, useEffect } from 'react';
import { clinicApi } from '../services/api';

const ClinicContext = createContext(null);

export function ClinicProvider({ children }) {
  const [clinic, setClinic] = useState(null);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchClinicData() {
      try {
        const [clinicRes, servicesRes] = await Promise.all([
          clinicApi.getClinic(),
          clinicApi.getServices()
        ]);
        if (!cancelled) {
          setClinic(clinicRes.data);
          setServices(servicesRes.data);
        }
      } catch (err) {
        if (!cancelled) {
          setError('Failed to load clinic information.');
          console.error('[ClinicContext]', err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchClinicData();
    return () => { cancelled = true; };
  }, []);

  return (
    <ClinicContext.Provider value={{ clinic, services, loading, error }}>
      {children}
    </ClinicContext.Provider>
  );
}

export function useClinic() {
  const context = useContext(ClinicContext);
  if (!context) throw new Error('useClinic must be used within ClinicProvider');
  return context;
}
