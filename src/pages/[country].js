import React from 'react';

function Country({ content }) {

  console.log('content', content)

  return (
    <div>Hello</div>
  );
};

export const getStaticPath = async () => {
  return {
    paths: [

    ],
    fallback: false
  }
};

export const getServerSideProps = async (context) => {
  const { params: { id }} = context;
  const response = await fetch(`https://restcountries.eu/rest/v2/name/${id}`);
  const data = await response.json().results.toString();
  console.log('data', data);

  return {
    props: {
      content: data
    }
  };
};

export default Country;
