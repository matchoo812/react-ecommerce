import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
    </Helmet>
  );
};

Meta.defaultProps = {
  title: 'Welcome to ProShop | Home',
  description: 'We sell the best products at the best prices',
  keywords: 'electronics, shopping, bargains, cheap electronics, e-commerce',
};

export default Meta;
