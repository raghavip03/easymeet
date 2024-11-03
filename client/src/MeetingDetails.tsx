import React, { Component, ChangeEvent, MouseEvent } from "react";
import { easyMeet } from "./easyMeet";

type DetailProps = {
  name: string
  onBackClick: () => void
};

type DetailState = {
  now: number,
  easyMeet: easyMeet | undefined,
  name: string,
  chosenTimes: [],
  voted: boolean;
};

export class MeetingDetails extends Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props)
    this.state = {now: Date.now(), easyMeet: undefined, name: "", chosenTimes: [], voted: false};
  };

  // componentDidMount = (): void => {
  //   this.doRefreshClick();
  // };

  render = (): JSX.Element => {
    return <div></div>
  }
}