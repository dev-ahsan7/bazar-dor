import React from 'react';

const PriceUpCard = async () => {
  const res = await fetch(
    'https://api.api-store.workers.dev/api/bazardor/products',
  );
  const data = await res.json();
  console.log(data);
  return <div></div>;
};
``
export default PriceUpCard;
