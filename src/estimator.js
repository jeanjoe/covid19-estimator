const multiplier = (case1, case2) => case1 * case2;

const powerCalculator = (timeToElapse, periodType) => {
  let days;
  switch (periodType) {
    case 'weeks':
      days = timeToElapse * 7;
      break;

    case 'months':
      days = timeToElapse * 30;
      break;

    default:
      days = timeToElapse;
      break;
  }

  return (2 ** parseInt((days / 3), 10));
};

const percentageCalc = (percentage, value) => (percentage / 100) * value;

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

  const impactSevereCaseBryRequestedTime = percentageCalc(
    15, currentImpactInfectionsByTime
  ).toFixed(0);
  const servereImpactSevereCaseBryRequestedTime = percentageCalc(
    15, currentSevereImpactInfectionsByTime
  ).toFixed(0);

  const impactHospitalBedsByRequestedTime = (
    percentageCalc(35, data.totalHospitalBeds) - impactSevereCaseBryRequestedTime
  ).toFixed(0);
  const severeImpactHospitalBedsByRequestedTime = (
    percentageCalc(35, data.totalHospitalBeds) - servereImpactSevereCaseBryRequestedTime
  ).toFixed(0);

  return {
    data,
    impact: {
      currentlyInfected: currentImpactInfections,
      infectionsByRequestedTime: currentImpactInfectionsByTime,
      severeCasesByRequestedTime: impactSevereCaseBryRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: currentSevereImpactInfections,
      infectionsByRequestedTime: currentSevereImpactInfectionsByTime,
      severeCasesByRequestedTime: servereImpactSevereCaseBryRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime
    }
  };
};

// export default covid19ImpactEstimator;

function call() {
  const data = {
    region: {
      name: 'Africa',
      avgAge: 19.7,
      avgDailyIncomeInUSD: 5,
      avgDailyIncomePopulation: 0.71
    },
    periodType: 'days',
    timeToElapse: 22,
    reportedCases: 528,
    population: 66622705,
    totalHospitalBeds: 1380614
  };

  console.log(covid19ImpactEstimator(data));
}
