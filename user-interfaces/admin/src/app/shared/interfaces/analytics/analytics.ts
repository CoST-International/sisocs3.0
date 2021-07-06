export interface IAnalytics {
  data: IAnalyticsAttributes
}

interface IAnalyticsAttributes {
  numOfProjects: number,
  numOfTenders: number,
  numOfAwards: number,
  numOfContracts: number
}
