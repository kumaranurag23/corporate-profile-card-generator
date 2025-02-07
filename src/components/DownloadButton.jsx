// src/components/DownloadButton.jsx
import React from 'react';
import { downloadCardAsImage } from '../utils/htmlToImage';

const DownloadButton = ({ elementId, fileName }) => {
  return (
    <button onClick={() => downloadCardAsImage(elementId, fileName)}>
      Download Card
    </button>
  );
};

export default DownloadButton;