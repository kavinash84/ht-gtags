import React from 'react';
import TestComponent from 'components/Test/';

class Test extends React.Component {
  render() {
    const data = [
      {
        low: 'https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/small.jpg',
        high: 'https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/large.jpg',
        defaultImage: 'https://s3-ap-southeast-1.amazonaws.com/sanjeev-hometown/default.jpg'
      }
    ];
    return (
      <div>
        <TestComponent data={data} />
      </div>
    );
  }
}

export default Test;
