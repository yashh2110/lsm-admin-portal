import Lottie from 'react-lottie';

import React from 'react';
import '../../css/common/loader.css';
import animationData from '../../../assets/loaders/loader.json';
function Loader() {
  return (
    <div className="loader">
      <Lottie
        height={150}
        width={150}
        options={{
          loop: true,
          autoplay: true,
          animationData: animationData,
        }}
      />
    </div>
  );
}

export default Loader;
