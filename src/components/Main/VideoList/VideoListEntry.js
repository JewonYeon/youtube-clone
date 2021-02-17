import React from 'react';

const VideoListEntry = ({ video, handleClick }) => (
  <div className="video-list-entry" onClick={() => handleClick(video)}>
    <div className="media-left media-middle">
      <img className="media-object" src={video.snippet.thumbnails.default.url} alt="" />
    </div>
    <div className="media-body">
      <div className="video-list-entry-title">{video.snippet.title}</div>
      <div className="video-list-entry-username">{video.snippet.channelTitle}</div>
      <div className="video-list-entry-bottom">
        <div className="video-list-entry-count">조회수 8.9만회 • </div>
        <div className="video-list-entry-publishedAt">{video.snippet.publishedAt.slice(0, 10)}</div>
      </div>
    </div>
  </div>
)

export default VideoListEntry;
