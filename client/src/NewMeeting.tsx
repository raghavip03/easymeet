/**
 * New Meeting Page
 * Allows users to schedule a new meeting plan page
 */

import React, {Component, ChangeEvent, MouseEvent} from "react";

type NewMeetingProps = {
  onBackClick: () => void
}

type NewMeetingState = {
  dates: string[],
  times: number[],
  creator: string,
  endDate: string,// format YYYY-MM-DD
  name: string;
}

export class NewMeeting extends Component<NewMeetingProps, NewMeetingState> {
  constructor(props: NewMeetingProps) {
    super(props)
    this.state = {
      dates: [],
      times: [],
      creator: "",
      endDate: "",
      name: "",
     };
  }
  render = (): JSX.Element => {
    return (
      <div>
        <h2>New Easy Meet</h2>
      <div>
        <label htmlFor="easyMeetName">Meeting Name:</label>
        <input id="name" type="text" value={(this.state.name)} onChange={this.doNameChange}></input>
      </div>
      <div>
        <label htmlFor="creator">Meeting Creator:</label>
        <input id="creator" type="text" value={(this.state.creator)} onChange={this.doCreatorChange}></input>
      </div>
      <div>
      <label htmlFor="dates">Choose Dates:</label>
      <table border={1}>
        <tr>
          <td>Row 1</td>
          <td>Row 2</td>
          <td>Row 3</td>
        </tr>
        <tr>
          <td>Row 1</td>
          <td>Row 2</td>
          <td>Row 3</td>
        </tr>
      </table>
      </div>
      </div>

    );
  }
}