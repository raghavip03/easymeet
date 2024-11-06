/**
 * Meeting Plans List Page / Home
 * Two components:
 * - Currently open easyMeets
 * - Past easyMeets
 */
import React, {Component, MouseEvent} from "react";
import { easyMeet } from "./easyMeet";
import { isRecord } from "./record";

type ListProps = {
  onNewClick: () => void
  onMeetClick: (name: string) => void
}

type ListState = {
  now: number,
  easyMeets: easyMeet[] | undefined,
};

export class MeetingList extends Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {now: Date.now(), easyMeets: undefined}
  }

  componentDidMount(): void {
      this.doRefreshClick();
  }
  componentDidUpdate = (prevProps: ListProps): void => {
    if(prevProps !==  this.props) {
      this.setState({now: Date.now()});
    }
  };

  //Renders the main page
  render = (): JSX.Element => {
    return (
      <div>
        <h2>Your Easy Meets</h2>
        {this.renderEasyMeets()}
        <button type="button" onClick={this.doNewClick}>New Meeting</button>
      </div>
    );
  };

  // Renders the list of easyMeets created
  renderEasyMeets = (): JSX.Element => {
    if (this.state.easyMeets === undefined) {
      return <p>Loading easy-meets...</p>
    } else {
      const meetings: JSX.Element[] = []
      for (const em of this.state.easyMeets) {
        meetings.push(
          <li key={em.name}>
            <a href="#" onClick={(evt) => this.doEMeetClick(evt, em.name)}>{em.name}</a>
          </li>
        );
      }
      return <ul>{meetings}</ul>
    }
  }

  // server is called to populate the website with each refresh
  doRefreshClick = (): void => {
    fetch("api/list").then(this.doListResp)
    .catch(() => this.doListError("failed to connect to server"));
  }

  // Redirects to creation of a new meeting page
  doNewClick = (_evt: MouseEvent<HTMLButtonElement>): void => {
    this.props.onNewClick();
  }

  //When an easymeet link is clicked, page is directed to its details
  doEMeetClick = (evt: MouseEvent<HTMLAnchorElement>, name: string): void => {
    evt.preventDefault();
    this.props.onMeetClick(name);
  }

  // Verifies the response from api calls
  doListResp = (resp: Response): void => {
    if(resp.status === 200) {
      resp.json().then(this.doListJson)
      .catch(() => this.doListError("200 response is not JSON"));
    }else if (resp.status === 400) {
      resp.text().then(this.doListError)
      .catch(() => this.doListError("400 response is not text"));
    } else {
      this.doListError(`bad status code from /api/list: ${resp.status}`);
    }
  }

  // formats the correct responses into JSON
  doListJson = (data: unknown): void => {
    if(!isRecord(data)) {
      console.error("bad data from /api/list: not a record", data);
      return;
    }
    if(!Array.isArray(data.easyMeets)) {
      console.error("bad data from /api/list: polls is not an array", data);
      return;
    }
    const easyMeets: easyMeet[] = [];
    for(const val of data.easyMeets) {
      const em = val;
      if(em === undefined)
      return;
      easyMeets.push(em);
    }
    this.setState({easyMeets, now: Date.now()});
  }


  // formats the errors from api calls
  doListError = (msg: string): void => {
    console.error(`Error fetching /api/list: ${msg}`);
  };

};
