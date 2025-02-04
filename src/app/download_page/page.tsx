'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from './styles';

const POLLING_INTERVAL = 5000; // 5 seconds
const MAX_POLLING_TIME = 30 * 60 * 1000; // 30 minutes

const DownloadPage = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pollingStartTime] = useState<number>(Date.now());

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

    const checkStatus = async () => {
      try {
        // Check if we've exceeded maximum polling time
        if (Date.now() - pollingStartTime > MAX_POLLING_TIME) {
          setError('Video generation timed out. Please try again.');
          setIsLoading(false);
          return false; // Return false to stop polling
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
            return false; // Stop polling
          case 'failed':
            setError(statusData.error || 'Video generation failed');
            setIsLoading(false);
            return false; // Stop polling
          case 'processing':
            return true; // Continue polling
          default:
            console.log('Unknown status:', statusData);
            return true; // Continue polling
        }
      } catch (error) {
        console.error('Failed to check status:', error);
        return true; // Continue polling on temporary errors
      }
    };

    // Initial check
    checkStatus();

    // Start polling
    const intervalId = setInterval(async () => {
      const shouldContinue = await checkStatus();
      if (!shouldContinue) {
        clearInterval(intervalId);
      }
    }, POLLING_INTERVAL);

    // Cleanup
    return () => clearInterval(intervalId);
  }, [pollingStartTime]);

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

  return (
    <S.Container>
      <S.Navbar>
        <S.NavTitle>
          Welcome to <S.TitleSpan>VisioGen</S.TitleSpan>
        </S.NavTitle>
      </S.Navbar>

      <S.MainContent>
        <S.PreviewContainer>
          <S.PreviewHeader>
            <S.PreviewText>
              {isLoading ? 'Generating Your Video...' : 'Your Generated Video'}
            </S.PreviewText>
          </S.PreviewHeader>

          <S.VideoPreview>
            {isLoading ? (
              <S.LoaderContainer>
                <S.LoaderSpinner />
                <S.LoaderText>
                  Please wait while we generate your video...<br/>
                  This may take several minutes
                </S.LoaderText>
              </S.LoaderContainer>
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
                <S.DownloadButton onClick={handleDownload}>
                  Download Video
                </S.DownloadButton>
              </>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px' }}>
                Video not found
              </div>
            )}
          </S.VideoPreview>
        </S.PreviewContainer>
        
        <S.GenerateAnotherButton onClick={() => router.push('/')}>
          Generate Another Video
        </S.GenerateAnotherButton>
      </S.MainContent>
    </S.Container>
  );
};

export default DownloadPage;