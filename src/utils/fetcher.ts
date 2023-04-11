const fetcher = ( ...args:any ) => {
  const params:any = { ...args };
  return fetch( params ).then( res => res.json() );
};

export { fetcher };
