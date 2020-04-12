const multiplier = (case1, case2) => case1 * case2;

const days = (timeToElapse, periodType) => {
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

const powerCalculator = (timeToElapse, periodType) => {
  const numberOfDays = days(timeToElapse, periodType);

  return (2 ** parseInt((numberOfDays / 3), 10));
};

const percentageCalc = (percentage, value) => (percentage / 100) * value;

const infectionsByRequestedTime = (infectionsByTime, percentage) => percentageCalc(
  percentage, infectionsByTime
);

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
  );
  const servereImpactSevereCaseBryRequestedTime = percentageCalc(
    15, currentSevereImpactInfectionsByTime
  );

  const impactHospitalBedsByRequestedTime = parseInt(
    (percentageCalc(35, data.totalHospitalBeds) - impactSevereCaseBryRequestedTime), 10
  );
  const severeImpactHospitalBedsByRequestedTime = parseInt(
    (percentageCalc(35, data.totalHospitalBeds) - servereImpactSevereCaseBryRequestedTime), 10
  );


  const impactDollarsInFlight = parseInt(
    (currentImpactInfectionsByTime * (
      data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation))
    / days(data.timeToElapse, data.periodType), 10
  );
  const servereDollarsInFlight = parseInt(
    (currentSevereImpactInfectionsByTime * (
      data.region.avgDailyIncomeInUSD * data.region.avgDailyIncomePopulation))
    / days(data.timeToElapse, data.periodType), 10
  );

  return {
    data,
    impact: {
      currentlyInfected: currentImpactInfections,
      infectionsByRequestedTime: currentImpactInfectionsByTime,
      severeCasesByRequestedTime: impactSevereCaseBryRequestedTime,
      hospitalBedsByRequestedTime: impactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: infectionsByRequestedTime(
        5, currentImpactInfectionsByTime
      ),
      casesForVentilatorsByRequestedTime: infectionsByRequestedTime(
        2, currentImpactInfectionsByTime
      ),
      dollarsInFlight: impactDollarsInFlight
    },
    severeImpact: {
      currentlyInfected: currentSevereImpactInfections,
      infectionsByRequestedTime: currentSevereImpactInfectionsByTime,
      severeCasesByRequestedTime: servereImpactSevereCaseBryRequestedTime,
      hospitalBedsByRequestedTime: severeImpactHospitalBedsByRequestedTime,
      casesForICUByRequestedTime: infectionsByRequestedTime(
        5, currentSevereImpactInfectionsByTime
      ),
      casesForVentilatorsByRequestedTime: infectionsByRequestedTime(
        2, currentSevereImpactInfectionsByTime
      ),
      dollarsInFlight: servereDollarsInFlight
    }
  };
};

export default covid19ImpactEstimator;
