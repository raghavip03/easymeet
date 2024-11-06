import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";


type SafeRequest = Request<ParamsDictionary, {}, Record<string, unknown>>;
type SafeResponse = Response;

// Description of an individual easyMeet
export type easyMeet = {
  dates: string[],
  times: number[],
  availability: Map<string, Map<string[], number[]>>,
  creator: string,
  endDate: string,// format YYYY-MM-DD
  name: string;
}

//Maps from name of the easyMeet to the easyMeet information
const easyMeetMap: Map<string, easyMeet> = new Map()

//Maps from creator to their created EasyMeets
const creatorMap: Map<string, easyMeet[]> = new Map()

/**
 * Compare easyMeet's end date times used for sorting
 * @param a easyMeet
 * @param b easyMeet
 * @returns number: negative: a should go before b, positive: b before a,
 * zero: equal sorting priority
 */
const compareDates = (a: easyMeet, b: easyMeet): number => {
  const dateA = new Date(a.endDate);
  const dateB = new Date(b.endDate);

  if (isNaN(dateA.getTime()) || isNaN(dateB.getTime())) {
    return NaN;
  }

  return dateA.getTime() - dateB.getTime();
};

/**
 * Adds an easyMeet to the list
 * Check if the same easyMeet exsists?
 * @param _req request
 * @param res response
 */
export const addEasyMeet = (req: SafeRequest, res: SafeResponse): void => {
  const easyMeet = req.body;

  // type checking each detail
  if(typeof easyMeet.name !== "string") {
    res.status(400).send("missing 'name' parameter");
    return;
  }
  if(!Array.isArray(easyMeet.dates)) {
    res.status(400).send("missing 'dates' parameter");
    return;
  }
  if(!Array.isArray(easyMeet.times)) {
    res.status(400).send("missing 'times' parameter");
    return;
  }
  if (!(easyMeet.availability instanceof Map)) {
    res.status(400).send("missing 'availability' parameter or 'availability' is not a Map");
    return;
  }
  if (typeof easyMeet.creator !== "string") {
    res.status(400).send("missing 'creator' parameter");
    return;
  }
  if (typeof easyMeet.endDate !== "string") {
    res.status(400).send("missing 'end date' parameter");
    return;
  }

  // check if it already exsists?

  // formatting an easyMeet object to push into the name map
  const emeet: easyMeet = {
    dates: easyMeet.dates,
    times: easyMeet.times,
    availability: easyMeet.availability,
    creator: easyMeet.creator,
    endDate: easyMeet.endDate,// format YYYY-MM-DD
    name: easyMeet.name
  };

  // Updating the easyMeet list that maps from creator
  let easyMeetArr = creatorMap.get(emeet.creator)
  if (easyMeetArr == undefined) {
    easyMeetArr = [emeet];
  } else {
    easyMeetArr.push(emeet);
  }

  easyMeetMap.set(emeet.name, emeet);
  creatorMap.set(emeet.creator, easyMeetArr);
  res.send({easyMeet: emeet});
}

/**
 * Returns a list of all easyMeets, sorted in descending order
 * @param _req request
 * @param res response
 */
export const listEasyMeet = (req: SafeRequest, res: SafeResponse): void => {
  const values = Array.from(easyMeetMap.values())
  values.sort(compareDates);
  res.send({easyMeets: values});
}

/**
 * Updates an easyMeet object with new availabilities
 * check if the same person has voted before
 * @param _req request
 * @param res response
 */
export const updateEasyMeet = (req: SafeRequest, res: SafeResponse): void => {
  const easyMeet = req.body;

  // type checking each detail
  if(typeof easyMeet.name !== "string") {
    res.status(400).send("missing 'name' parameter");
    return;
  }
  if(!Array.isArray(easyMeet.dates)) {
    res.status(400).send("missing 'dates' parameter");
    return;
  }
  if(!Array.isArray(easyMeet.times)) {
    res.status(400).send("missing 'times' parameter");
    return;
  }
  if (!(easyMeet.availability instanceof Map)) {
    res.status(400).send("missing 'availability' parameter or 'availability' is not a Map");
    return;
  }
  if (typeof easyMeet.creator !== "string") {
    res.status(400).send("missing 'creator' parameter");
    return;
  }
  if (typeof easyMeet.endDate !== "string") {
    res.status(400).send("missing 'end date' parameter");
    return;
  }

  // Find the easyMeet in the name->easyMeet map and update info
  const existingEasyMeet = easyMeetMap.get(easyMeet.name)
  if (existingEasyMeet === undefined) {
    res.status(400).send(`Meeting ${easyMeet.name} does not exist`);
    return;
  }

  existingEasyMeet.name = easyMeet.name;
  existingEasyMeet.dates = easyMeet.dates;
  existingEasyMeet.times = easyMeet.times;
  existingEasyMeet.availability = easyMeet.availability; //check this for issues?
  existingEasyMeet.creator = easyMeet.creator;
  existingEasyMeet.endDate = easyMeet.endDate;
  res.send({updatedEasyMeet: existingEasyMeet});
}

/**
 * Return the information of a particular easyMeet when clicked on
 * @param _req request
 * @param res response
 */
export const getEasyMeet = (req: SafeRequest, res: SafeResponse): void => {
  const name = req.body.name;
  if(typeof name !== "string") {
    res.status(400).send("missing 'name' parameter");
    return;
  }
  const easyMeet = easyMeetMap.get(name)
  if (easyMeet === undefined) {
    res.status(400).send(`Meeting ${name} does not exist`);
    return;
  }
  res.send({easyMeet: easyMeet})
}
