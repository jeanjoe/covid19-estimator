const multiplier = (case1, case2) => case1 * case2;

const powerCalculator = (timeToElapse, periodType) => {
  let days = 0;

  switch (periodType) {
    case 'days':
      days = timeToElapse;
      break;

    case 'weeks':
      days = timeToElapse * 7;
      break;

    case 'months':
      days = timeToElapse * 30;
      break;

    default:
      days = 0;
      break;
  }

  return (2 ** parseInt((days / 3), 10));
};

const covid19ImpactEstimator = (data) => {
  const currentImpactInfections = multiplier(data.reportedCases, 10);
  const currentSevereImpactInfections = multiplier(data.reportedCases, 50);
  const currentImpactInfectionsByTime = multiplier(
    currentImpactInfections,
    powerCalculator(data.timeToElapse, data.periodType)
  );
  const currentSevereImpactInfectionsByTime = multiplier(
    currentSevereImpactInfections,
    powerCalculator(data.timeToElapse, data.periodType)
  );

  return {
    data,
    impact: {
      currectlyInfected: currentImpactInfections,
      infectionsByRequestedTime: currentImpactInfectionsByTime
    },
    severeImpact: {
      currectlyInfected: currentSevereImpactInfections,
      infectionsByRequestedTime: currentSevereImpactInfectionsByTime
    }
  };
};

export default covid19ImpactEstimator;
