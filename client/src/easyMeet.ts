/**
 * Components of an easyMeet meeting plan
 */
export type easyMeet = {
  readonly dates: string[],
  readonly times: number[],
  readonly availability: Map<string, Map<string[], number[]>>,
  readonly creator: string,
  readonly endDate: string,// format YYYY-MM-DD
  readonly name: string;
}