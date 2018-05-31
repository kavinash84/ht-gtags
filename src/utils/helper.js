import btoa from 'btoa';

export const encodeCategory = obj => {
  const values = obj && Object.values(obj).filter(x => x !== undefined);
  return btoa(JSON.stringify({ params: values }));
};

export const x = () => {};
