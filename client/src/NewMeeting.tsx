/**
 * New Meeting Page
 * Allows users to schedule a new meeting plan page
 */

import React, {Component, ChangeEvent, MouseEvent} from "react";

type NewMeetingProps = {
  onBackClick: () => void
}

type NewMeetingState = {
  dateTable: boolean[][],
  timeTable: boolean[][],
  timeZone: string[];
}

export class NewMeeting extends Component<NewMeetingProps, NewMeetingState> {
  constructor(props: NewMeetingProps) {
    super(props)
    this.state = {dateTable: [], timeTable: [], timeZone: []};
  }
  render = (): JSX.Element => {
    return (
      <div>
      </div>
    );
  }
}