import React, { Component } from "react";
import { MeetingList } from "./MeetingList";
import { NewMeeting } from "./NewMeeting";
import { MeetingDetails } from "./MeetingDetails";

type Page = "list" | "login" | "new" | {kind: "meeting", name: string};

type EasyMeetState = {page: Page};

const DEBUG: boolean = true;

export class EasyMeetApp extends Component<{}, EasyMeetState> {

  constructor(props: {}) {
    super(props);

    this.state = {page: "list"};
  }

  //Renders the page depending on it's state
  render = (): JSX.Element => {
    if(this.state.page === "login") {
      if(DEBUG) console.debug("rendering login page");
      return <div></div>
    } else if(this.state.page === "new") {
      if(DEBUG) console.debug("rendering new page");
      return <div></div>
    } else if(this.state.page == "list") {
      if(DEBUG) console.debug("rendering list page");
      return <div></div>
    } else { //renders meeting participating page
      return <div></div>
    }
  };

}