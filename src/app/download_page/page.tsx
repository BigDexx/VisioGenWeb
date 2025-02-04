'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  position: relative;
`;

const PreviewContainer = styled.div`
  background: #151922;
  border-radius: 8px;
  padding: 2rem;
  margin-top: 2rem;
`;

const PreviewHeader = styled.div`
  margin-bottom: 2rem;
`;

const PreviewText = styled.h2`
  color: white;
  font-size: 2rem;
  margin: 0;
`;

const VideoPreview = styled.div`
  background: #0B0E14;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin-bottom: 2rem;
`;

const DownloadButton = styled.button`
  background: #2196f3;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;
  width: 100%;
  margin-top: 1rem;

  &:hover {
    background: #1976d2;
  }

  &:disabled {
    background: #666;
    cursor: not-allowed;
  }
`;

const GenerateAnotherButton = styled.button`
  background: #2DFFA0;
  color: #151922;
  border: none;
  border-radius: 4px;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #25CC80;
  }
`;

interface GenerationData {
  jobId: string;
  status: string;
  videoUrl?: string;
}

const POLLING_INTERVAL = 5000; // 5 seconds

const DownloadPage = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [statusMessage, setStatusMessage] = useState<string>('Initializing...');

  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    
    const checkJobStatus = async (jobId: string) => {
      try {
        const response = await fetch(`https://dexxtech.xyz/endpoint/status/${jobId}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to check job status');
        }

        switch (data.status) {
          case 'completed':
            setVideoUrl(`https://dexxtech.xyz${data.video_url}`);
            setIsLoading(false);
            clearInterval(pollInterval);
            break;
          case 'failed':
            setError(data.error || 'Video generation failed');
            setIsLoading(false);
            clearInterval(pollInterval);
            break;
          case 'processing':
            setStatusMessage('Processing your video...');
            break;
          default:
            setStatusMessage('Waiting for processing to begin...');
        }
      } catch (error) {
        console.error('Error checking job status:', error);
        setStatusMessage('Checking status...');
      }
    };

    const initializePolling = () => {
      const generationDataStr = localStorage.getItem('generationData');
      if (!generationDataStr) {
        setError('No video generation data found');
        setIsLoading(false);
        return;
      }

      const generationData: GenerationData = JSON.parse(generationDataStr);
      if (!generationData.jobId) {
        setError('No job ID found');
        setIsLoading(false);
        return;
      }

      // Start polling
      checkJobStatus(generationData.jobId);
      pollInterval = setInterval(() => checkJobStatus(generationData.jobId), POLLING_INTERVAL);
    };

    initializePolling();

    // Cleanup
    return () => {
      if (pollInterval) {
        clearInterval(pollInterval);
      }
    };
  }, []);

  const handleDownload = async () => {
    if (!videoUrl) return;
    try {
      const response = await fetch(videoUrl);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'generated-video.mp4';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      setError('Failed to download video');
      console.error('Download error:', error);
    }
  };

  return (
    <Container>
      <MainContent>
        <PreviewContainer>
          <PreviewHeader>
            <PreviewText>
              {isLoading ? 'Generating Your Video...' : 'Your Generated Video'}
            </PreviewText>
          </PreviewHeader>
          <VideoPreview>
            {isLoading ? (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <p>Please wait while we generate your video...</p>
              </div>
            ) : error ? (
              <div style={{ textAlign: 'center', padding: '20px', color: 'red' }}>
                {error}
              </div>
            ) : videoUrl ? (
              <>
                <video 
                  controls 
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Video not found
              </div>
            )}
          </VideoPreview>
          <DownloadButton onClick={handleDownload}>
                  Download Video
                </DownloadButton>
        </PreviewContainer>
        <div style={{ position: 'absolute', bottom: '20px', right: '10px' }}>
                  <GenerateAnotherButton onClick={() => router.push('/')}>
                    Generate Another Video
                  </GenerateAnotherButton>
                </div>
      </MainContent>
    </Container>
  );
};

export default DownloadPage;