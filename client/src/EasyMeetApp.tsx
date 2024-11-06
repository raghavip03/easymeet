import React, { Component } from "react";
import { MeetingList } from "./MeetingList";
import { NewMeeting } from "./NewMeeting";
import { MeetingDetails } from "./MeetingDetails";

type Page = "list" |"new" | {kind: "easymeet", name: string};

type EasyMeetState = {page: Page};

const DEBUG: boolean = true;

export class EasyMeetApp extends Component<{}, EasyMeetState> {

  constructor(props: {}) {
    super(props);

    this.state = {page: "list"};
  }

  //Renders the page depending on it's state
  render = (): JSX.Element => {
    if(this.state.page === "list") {
      if(DEBUG) console.debug("rendering list page");
      return <MeetingList onNewClick={this.doNewClick} onMeetClick={this.doEMeetClick}/>
    } else if(this.state.page === "new") {
      if(DEBUG) console.debug("rendering new page");
      return <NewMeeting onBackClick={this.doBackClick}/>
    } else { //renders details page
      return <MeetingDetails name={this.state.page.name} onBackClick={this.doBackClick}/>
    }
  };

  // When New is clicked, redirect to New Page
  doNewClick = (): void => {
    if (DEBUG) console.debug("setting state to new");
    this.setState({page: "new"});
  }

  // when clicked on the link to a new easy-meet, it should redirect to details
  doEMeetClick = (name: string): void => {
    if (DEBUG) console.debug(`setting state to ${name}'s details`);
    this.setState({page: {kind: "easymeet", name}});
  }

  //When back button is clicked, the state is set to list
  doBackClick = (): void => {
    if (DEBUG) console.debug("setting state to list");
    this.setState({page: "list"})
  }

}