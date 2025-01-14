import styled from "styled-components";
const DownloadButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  padding: 12px 24px;
  background-color: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1976d2;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;
const PreviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
`;

const GenerateAnotherButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #2DFFA0;  // Using the accent green color
  color: #0B0E14;  // Dark background color for contrast
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #25CC80;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;
const VideoPreview = styled.div`
  position: relative;
  width: 100%;
  height: 610px;
  background-color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  overflow: hidden;
  
  video {
    max-width: 100%;
    max-height: 100%;
  }
`;
const Container = styled.div`
  min-height: 100vh;
  background-color: #111827;
  color: #f3f4f6;
`;

const MainContent = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
`;

const PreviewContainer = styled.div`
  background-color: #1a1f2e;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  aspect-ratio: 9/16;
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const PreviewText = styled.span`
  color: #f3f4f6;
  font-size: 1rem;
  font-weight: 500;
`;

const PlayButton = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #2563eb;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  border: 2px solid #3b82f6;

  &:hover {
    background-color: #1d4ed8;
  }

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 10px 0 10px 20px;
    border-color: transparent transparent transparent #ffffff;
    margin-left: 5px;
  }
`;

export {PlayButton, VideoPreview, PreviewContainer, PreviewHeader, PreviewText,MainContent,Container, DownloadButton, GenerateAnotherButton}