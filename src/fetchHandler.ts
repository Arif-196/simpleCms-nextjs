import { baseurl } from './config';

const fetchHandler = async( endpoint: string, method = 'GET', body?: any ) => {
  const uri = `${baseurl}${endpoint}`;

  try {
    const response = await fetch( uri, {
      method,
      body: method === 'GET' ? null : JSON.stringify( body ),
    } );
  
    const results = await response.json();
  
    return results;
  } catch ( error ) {
    throw error;
  }

};

const postHandler = async( endpoint: string, method:string, body?: any, isFormData = false ) => {
  const uri = `${baseurl}${endpoint}`;

  try {
    const response = await fetch( uri, {
      method: method,
      body: method === 'GET' ? undefined : isFormData ? body : JSON.stringify( body ),
    } );
  
    const results = await response.json();
  
    return results;
  } catch ( error ) {
    throw error;
  }

};

export { fetchHandler, postHandler };