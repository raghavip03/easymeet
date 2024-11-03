/**
 * Components of an easyMeet meeting plan
 */
export type easyMeet = {
  readonly personTable: Array<{ availability: boolean[][]; name: string}>
  readonly peopleTable: Array<{ availability: boolean[][]; name: string}>
  readonly availability: boolean[][]
}