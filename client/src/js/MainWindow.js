import React, { useEffect, useState } from 'react';
import PropTypes from 'proptypes';
import { useLocation } from 'react-router';

function MainWindow({ startCall, clientId, inviteLink, shouldAutoAcceptCall, setShouldAutoAcceptCall }) {
  const [friendID, setFriendID] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const friendIdFromUrl = queryParams.get('id');
    if (friendIdFromUrl) {
      startCall(true, friendIdFromUrl, { audio: true, video: queryParams.get('video') });
    }
  }, [location]);
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
  const callWithVideo = (video) => {
    const config = { audio: true, video };
    return () => friendID && startCall(true, friendID, config);
  };


  return (
    <div className="container main-window">
      <h3>
        Hi, your ID is
        <input
          type="text"
          className="txt-clientId"
          defaultValue={clientId}
          readOnly
        />
      </h3>
      <h4>Following invite link has been copied to clipboard:</h4>
      <em><u>{inviteLink}</u></em>
      <h4>Send it to a friend or enter his id below to call him:</h4>
      <div>
        <input
          type="text"
          className="txt-clientId"
          spellCheck={false}
          placeholder="Your friend ID"
          onChange={event => setFriendID(event.target.value)}
        />
        <div>
          <button
            type="button"
            className="btn-action fa fa-video-camera"
            onClick={callWithVideo(true)}
          />
          <button
            type="button"
            className="btn-action fa fa-phone"
            onClick={callWithVideo(false)}
          />
        </div>
      </div>
      <h4>
        <label id="auto-accept-label" htmlFor="auto-accept">
          <input
            id="auto-accept"
            type="checkbox"
            checked={shouldAutoAcceptCall}
            onChange={() => setShouldAutoAcceptCall(!shouldAutoAcceptCall)}
          />
          Automatically accept call
        </label>
      </h4>
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  inviteLink: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  shouldAutoAcceptCall: PropTypes.bool.isRequired,
  setShouldAutoAcceptCall: PropTypes.func.isRequired
};

export default MainWindow;
