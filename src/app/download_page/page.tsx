'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  position: relative;
`;

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Navbar = styled.nav`
  padding: 1rem 2rem;
  background: #000000;
`;

const NavTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
`;

const TitleSpan = styled.span`
  color: #2196f3;
`;

const PreviewContainer = styled.div`
  background: #151922;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
`;

const PreviewHeader = styled.div`
  background: #1E2430;
  padding: 1.5rem;
  border-bottom: 1px solid #2A3140;
`;

const PreviewText = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin: 0;
`;

const VideoPreview = styled.div`
  padding: 2rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  padding: 1rem;
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #1976d2;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
  display: block;
`;

const GenerateAnotherButton = styled(Button)`
  background: #4CAF50;
  &:hover {
    background: #388E3C;
  }
  position: fixed;
  bottom: 20px;
  right: 20px;
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const LoaderSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #2196f3;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const LoaderText = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

const ErrorText = styled.div`
  color: #ff5252;
  text-align: center;
  padding: 1rem;
  font-size: 1.1rem;
`;

// Component
const DownloadPage: React.FC = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollingStartTime, setPollingStartTime] = useState<number>(Date.now());

  const POLLING_INTERVAL = 5000; // 5 seconds
  const MAX_POLLING_TIME = 30 * 60 * 1000; // 30 minutes

  useEffect(() => {
    const generationData = localStorage.getItem('generationData');
    if (!generationData) {
      setError('No video generation data found');
      setIsLoading(false);
      return;
    }

    const data = JSON.parse(generationData);
    if (!data.job_id) {
      setError('No job ID found');
      setIsLoading(false);
      return;
    }

    setPollingStartTime(Date.now());

    const pollInterval = setInterval(async () => {
      try {
        // Check if we've exceeded maximum polling time
        if (Date.now() - pollingStartTime > MAX_POLLING_TIME) {
          clearInterval(pollInterval);
          setError('Video generation timed out. Please try again.');
          setIsLoading(false);
          return;
        }

        const response = await fetch(`https://dexxtech.xyz/check_status/${data.job_id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const statusData = await response.json();
        
        switch (statusData.status) {
          case 'completed':
            setVideoUrl(statusData.video_url);
            setIsLoading(false);
            clearInterval(pollInterval);
            break;
          case 'failed':
            setError('Video generation failed. Please try again.');
            setIsLoading(false);
            clearInterval(pollInterval);
            break;
          case 'processing':
            // Continue polling
            break;
          default:
            setError('Unknown status received');
            setIsLoading(false);
            clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Failed to check status:', error);
        // Don't stop polling on temporary errors
      }
    }, POLLING_INTERVAL);

    return () => clearInterval(pollInterval);
  }, []);

  const handleDownload = async () => {
    if (!videoUrl) return;
    
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-video.mp4';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError('Failed to download video. Please try again.');
    }
  };

  const handleGenerateAnother = () => {
    router.push('/');
  };

  return (
    <Container>
      <Navbar>
        <NavTitle>
          Welcome to <TitleSpan>VisioGen</TitleSpan>
        </NavTitle>
      </Navbar>

      <MainContent>
        <PreviewContainer>
          <PreviewHeader>
            <PreviewText>
              {isLoading ? 'Generating Your Video...' : 'Your Generated Video'}
            </PreviewText>
          </PreviewHeader>

          <VideoPreview>
            {isLoading ? (
              <LoaderContainer>
                <LoaderSpinner />
                <LoaderText>
                  Please wait while we generate your video...<br/>
                  This may take several minutes
                </LoaderText>
              </LoaderContainer>
            ) : error ? (
              <ErrorText>{error}</ErrorText>
            ) : videoUrl ? (
              <>
                <video 
                  controls 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <DownloadButton onClick={handleDownload}>
                  Download Video
                </DownloadButton>
              </>
            ) : (
              <ErrorText>Video not found</ErrorText>
            )}
          </VideoPreview>
        </PreviewContainer>
        
        <GenerateAnotherButton onClick={handleGenerateAnother}>
          Generate Another Video
        </GenerateAnotherButton>
      </MainContent>
    </Container>
  );
};

export default DownloadPage;