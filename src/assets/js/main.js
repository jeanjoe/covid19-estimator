import estimator from '../../estimator.js';

const submitEstimate = (event) => {
  event.preventDefault();
  console.log('clicked');
  const data = {
    region: 'Africa'
  };

  estimator.covid19ImpactEstimator(data);
};
