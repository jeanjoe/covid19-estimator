const multiplier = (case1, case2) => case1 * case2;

const days = (data) => {
  const { timeToElapse, periodType } = data;
  let numberOfDays;

  switch (periodType) {
    case 'weeks':
      numberOfDays = timeToElapse * 7;
      break;

    case 'months':
      numberOfDays = timeToElapse * 30;
      break;

    default:
      numberOfDays = timeToElapse;
      break;
  }
  return numberOfDays;
};

const powerCalculator = (data) => {
  const numberOfDays = days(data);
  return (2 ** parseInt((numberOfDays / 3), 10));
};
const percentageCalc = (percentage, value) => (percentage / 100) * value;
const infectionsByRequestedTime = (infectionsByTime, percentage) => percentageCalc(
  percentage, infectionsByTime
);


const currentImpactInfections = (data) => multiplier(data.reportedCases, 10);
const currentSevereImpactInfections = (data) => multiplier(data.reportedCases, 50);


const currentImpactInfectionsByTime = (data) => multiplier(
  currentImpactInfections(data), powerCalculator(data)
);
const currentSevereImpactInfectionsByTime = (data) => multiplier(
  currentSevereImpactInfections(data), powerCalculator(data)
);


const impactSevereCaseBryRequestedTime = (data) => percentageCalc(
  15, currentImpactInfectionsByTime(data)
);
const servereImpactSevereCaseBryRequestedTime = (data) => percentageCalc(
  15, currentSevereImpactInfectionsByTime(data)
);


const impactHospitalBedsByRequestedTime = (data) => parseInt(
  (percentageCalc(35, data.totalHospitalBeds) - impactSevereCaseBryRequestedTime(data)), 10
);
const severeImpactHospitalBedsByRequestedTime = (data) => parseInt(
  (percentageCalc(35, data.totalHospitalBeds) - servereImpactSevereCaseBryRequestedTime(data)), 10
);


const impactDollarsInFlight = (data) => parseInt(
  (currentImpactInfectionsByTime(data) * (
    data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation))
  / days(data), 10
);
const servereDollarsInFlight = (data) => parseInt(
  (currentSevereImpactInfectionsByTime(data) * (
    data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation))
  / days(data), 10
);


const covid19ImpactEstimator = (data) => ({
  data,
  impact: {
    currentlyInfected: currentImpactInfections(data),
    infectionsByRequestedTime: currentImpactInfectionsByTime,
    severeCasesByRequestedTime: impactSevereCaseBryRequestedTime(data),
    hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime(data),
    casesForICUByRequestedTime: parseInt(infectionsByRequestedTime(
      5, currentImpactInfectionsByTime(data)
    ), 10),
    casesForVentilatorsByRequestedTime: parseInt(infectionsByRequestedTime(
      2, currentImpactInfectionsByTime(data)
    ), 10),
    dollarsInFlight: impactDollarsInFlight
  },
  severeImpact: {
    currentlyInfected: currentSevereImpactInfections(data),
    infectionsByRequestedTime: currentSevereImpactInfectionsByTime(data),
    severeCasesByRequestedTime: servereImpactSevereCaseBryRequestedTime(data),
    hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime(data),
    casesForICUByRequestedTime: infectionsByRequestedTime(
      5, currentSevereImpactInfectionsByTime(data)
    ),
    casesForVentilatorsByRequestedTime: infectionsByRequestedTime(
      2, currentSevereImpactInfectionsByTime(data)
    ),
    dollarsInFlight: servereDollarsInFlight
  }
});

export default covid19ImpactEstimator;
