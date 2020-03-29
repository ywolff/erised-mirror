import React, { useEffect, useState } from 'react';
import PropTypes from 'proptypes';
import { useLocation } from 'react-router';

function MainWindow({ startCall, clientId }) {
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
      <div>
        <h3>
          Hi, your ID is
          <input
            type="text"
            className="txt-clientId"
            defaultValue={clientId}
            readOnly
          />
        </h3>
        <h4>Get started by calling a friend below</h4>
      </div>
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
    </div>
  );
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired
};

export default MainWindow;
