/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Container, 
  MainContent, 
  PreviewContainer, 
  PreviewHeader, 
  PreviewText, 
  VideoPreview, 
  DownloadButton,
  GenerateAnotherButton
} from './styles';

const DownloadPage: React.FC = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('Initializing...');

  useEffect(() => {
    const pollTaskStatus = async (taskId: string) => {
      try {
        const response = await fetch(`https://dexxtech.xyz/endpoint/status/${taskId}`);
        const data = await response.json();

        switch (data.status) {
          case 'SUCCESS':
            setVideoUrl(data.video_url);
            setIsLoading(false);
            return true;
          case 'FAILURE':
            setError(data.error || 'Video generation failed');
            setIsLoading(false);
            return true;
          case 'PROCESSING':
            setStatusMessage(data.status_message || 'Processing...');
            return false;
          default:
            return false;
        }
      } catch (error) {
        setError('Failed to check video status');
        setIsLoading(false);
        return true;
      }
    };

    const startPolling = async () => {
      const generationData = localStorage.getItem('generationData');
      if (!generationData) {
        setError('No video generation data found');
        setIsLoading(false);
        return;
      }

      const { taskId } = JSON.parse(generationData);
      
      const pollInterval = setInterval(async () => {
        const isDone = await pollTaskStatus(taskId);
        if (isDone) {
          clearInterval(pollInterval);
        }
      }, 5000); // Poll every 5 seconds

      // Cleanup
      return () => clearInterval(pollInterval);
    };

    startPolling();
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
    } catch {
      setError('Failed to download video');
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