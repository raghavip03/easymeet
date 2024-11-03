/**
 * Meeting Plans List Page / Home
 * Two components:
 * - Currently open easyMeets
 * - Past easyMeets
 */
import React, {Component, ChangeEvent, MouseEvent} from "react";
import { easyMeet } from "./easyMeet";

type ListProps = {
  onNewClick: () => void
  onMeetClick: (name: string) => void
}

type ListState = {
  now: number,
  easyMeets: easyMeet[] | undefined
};

export class MeetingList extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {now: Date.now(), easyMeets: undefined}
  }

  // componentDidMount(): void {
  //     this.doRefreshClick();
  // }
  componentDidUpdate = (prevProps: ListProps): void => {
    if(prevProps !==  this.props) {
      this.setState({now: Date.now()});
    }
  };

  //Renders the main page
  render = (): JSX.Element => {
    return (
      <div></div>
    );
  };
};

