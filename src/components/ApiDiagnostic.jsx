import React, { useState, useEffect } from 'react';
import { checkApiServer } from '../utils/apiTest';
import api from '../api';

const ApiDiagnostic = () => {
  const [status, setStatus] = useState('checking');
  const [message, setMessage] = useState('Checking API connection...');
  const [details, setDetails] = useState(null);
  const [baseUrl, setBaseUrl] = useState('');
  const [newBaseUrl, setNewBaseUrl] = useState('');

  useEffect(() => {
    checkConnection();
    setBaseUrl(api.defaults.baseURL);
    setNewBaseUrl(api.defaults.baseURL);
  }, []);

  const checkConnection = async () => {
    setStatus('checking');
    setMessage('Checking API connection...');
    
    try {
      const result = await checkApiServer();
      if (result.success) {
        setStatus('success');
        setMessage(result.message);
      } else {
        setStatus('error');
        setMessage(result.message);
        setDetails(result);
      }
    } catch (error) {
      setStatus('error');
      setMessage('Error checking API connection');
      setDetails({ error: error.message });
    }
  };

  const updateBaseUrl = () => {
    if (newBaseUrl) {
      api.defaults.baseURL = newBaseUrl;
      setBaseUrl(newBaseUrl);
      localStorage.setItem('apiBaseUrl', newBaseUrl);
      checkConnection();
    }
  };

  return (
    <div className="card mt-3">
      <div className="card-header bg-primary text-white">
        API Connection Diagnostic
      </div>
      <div className="card-body">
        <div className="mb-3">
          <div className={`alert ${status === 'success' ? 'alert-success' : status === 'error' ? 'alert-danger' : 'alert-info'}`}>
            {message}
          </div>
          
          {details && (
            <div className="mt-2">
              <h6>Details:</h6>
              <pre className="bg-light p-2" style={{ maxHeight: '200px', overflow: 'auto' }}>
                {JSON.stringify(details, null, 2)}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mb-3">
          <label className="form-label">Current API Base URL:</label>
          <div className="input-group">
            <input 
              type="text" 
              className="form-control" 
              value={newBaseUrl} 
              onChange={(e) => setNewBaseUrl(e.target.value)} 
            />
            <button 
              className="btn btn-outline-primary" 
              onClick={updateBaseUrl}
            >
              Update
            </button>
          </div>
          <div className="form-text">
            Try one of these URLs if you're having connection issues:
            <ul className="mt-1">
              <li><button className="btn btn-sm btn-link p-0" onClick={() => setNewBaseUrl('https://localhost:7057')}>https://localhost:7057</button></li>
              <li><button className="btn btn-sm btn-link p-0" onClick={() => setNewBaseUrl('http://localhost:5132')}>http://localhost:5132</button></li>
              <li><button className="btn btn-sm btn-link p-0" onClick={() => setNewBaseUrl('http://localhost:5000')}>http://localhost:5000</button></li>
            </ul>
          </div>
        </div>
        
        <button 
          className="btn btn-primary" 
          onClick={checkConnection}
        >
          Check Connection Again
        </button>
      </div>
    </div>
  );
};

export default ApiDiagnostic;