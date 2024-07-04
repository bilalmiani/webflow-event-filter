import React from "react";
import PropTypes from "prop-types";

const Video = ({ embedId }) => {
    const newUrl = embedId.replace('watch?v=', 'embed/');
  
    return (
      <div className="video-responsive">
        <iframe
          width="853"
          height="480"
          src={newUrl}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Embedded youtube"
        />
      </div>
    );
  };

Video.propTypes = {
  embedId: PropTypes.string.isRequired
};

export default Video;