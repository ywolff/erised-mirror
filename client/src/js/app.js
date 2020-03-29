import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import _ from 'lodash';
import socket from './socket';
import PeerConnection from './PeerConnection';
import MainWindow from './MainWindow';
import CallWindow from './CallWindow';
import CallModal from './CallModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clientId: '',
      callWindow: '',
      callModal: '',
      callFrom: '',
      localSrc: null,
      peerSrc: null,
      friendID: null,
      nudging: false
    };
    this.pc = {};
    this.config = null;
    this.startCallHandler = this.startCall.bind(this);
    this.endCallHandler = this.endCall.bind(this);
    this.sendNudgeHandler = this.sendNudge.bind(this);
    this.rejectCallHandler = this.rejectCall.bind(this);
  }

  componentDidMount() {
    socket
      .on('init', ({ id: clientId }) => {
        document.title = `${clientId} - VideoCall`;
        const inviteLink = `${window.location.origin}?id=${clientId}&video=1`;
        this.setState({ clientId });
        this.setState({ inviteLink });
        navigator.clipboard.writeText(inviteLink);
      })
      .on('request', ({ from: callFrom }) => {
        this.setState({ callModal: 'active', callFrom });
      })
      .on('call', (data) => {
        if (data.sdp) {
          this.pc.setRemoteDescription(data.sdp);
          if (data.sdp.type === 'offer') this.pc.createAnswer();
        } else this.pc.addIceCandidate(data.candidate);
      })
      .on('nudge', this.receiveNudge.bind(this))
      .on('end', this.endCall.bind(this, false))
      .emit('init');
  }

  startCall(isCaller, friendID, config) {
    this.config = config;
    this.pc = new PeerConnection(friendID)
      .on('localStream', (src) => {
        const newState = { callWindow: 'active', localSrc: src };
        if (!isCaller) newState.callModal = '';
        this.setState(newState);
      })
      .on('peerStream', src => this.setState({ peerSrc: src, friendID }))
      .start(isCaller, config);
  }

  rejectCall() {
    const { callFrom } = this.state;
    socket.emit('end', { to: callFrom });
    this.setState({ callModal: '' });
  }

  endCall(isStarter) {
    if (_.isFunction(this.pc.stop)) {
      this.pc.stop(isStarter);
    }
    this.pc = {};
    this.config = null;
    this.setState({
      callWindow: '',
      callModal: '',
      localSrc: null,
      peerSrc: null
    });
  }

  sendNudge() {
    const { friendID } = this.state;
    socket.emit('nudge', { to: friendID });
    this.receiveNudge();
  }

  receiveNudge() {
    this.setState({ nudging: true });
    new Audio(require('../assets/nudge.mp3')).play();
    setTimeout(() => this.setState({ nudging: false }), 1000);
  }

  render() {
    const { clientId, inviteLink, callFrom, callModal, callWindow, localSrc, peerSrc, nudging } = this.state;
    return (
      <BrowserRouter>
        <Route path="/">
          <div>
            <MainWindow
              clientId={clientId}
              inviteLink={inviteLink}
              startCall={this.startCallHandler}
            />
            {!_.isEmpty(this.config) && (
              <CallWindow
                status={callWindow}
                localSrc={localSrc}
                peerSrc={peerSrc}
                config={this.config}
                mediaDevice={this.pc.mediaDevice}
                endCall={this.endCallHandler}
                sendNudge={this.sendNudgeHandler}
                nudging={nudging}
              />
            ) }
            <CallModal
              status={callModal}
              startCall={this.startCallHandler}
              rejectCall={this.rejectCallHandler}
              callFrom={callFrom}
            />
          </div>
        </Route>
      </BrowserRouter>
    );
  }
}

render(<App />, document.getElementById('root'));
