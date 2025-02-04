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

const Loader = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
    <div style={{
      border: '8px solid #f3f3f3',
      borderTop: '8px solid #3498db',
      borderRadius: '50%',
      width: '60px',
      height: '60px',
      animation: 'spin 1s linear infinite'
    }} />
    <style jsx>{`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const DownloadPage = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount] = useState(0);

  useEffect(() => {
    const checkForVideo = async () => {
      const MAX_RETRIES = 60; // 10 minutes total (10s intervals)
      let retryCount = 0;

      const checkVideoStatus = async () => {
        try {
          const response = await fetch('https://dexxtech.xyz/endpoint/video', {
            method: 'HEAD'
          });

          if (response.ok) {
            setVideoUrl('https://dexxtech.xyz/endpoint/video');
            setIsLoading(false);
            return;
          }

          if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(checkVideoStatus, 10000);
          } else {
            setError('Video generation took too long. Try refreshing the page.');
            setIsLoading(false);
          }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          if (retryCount < MAX_RETRIES) {
            retryCount++;
            setTimeout(checkVideoStatus, 10000);
          } else {
            setError('Error checking video status');
            setIsLoading(false);
          }
        }
      };

      checkVideoStatus();
    };

    checkForVideo();
  }, [retryCount]);

  const handleDownload = async () => {
    if (!videoUrl) return;
    try {
      const response = await fetch(videoUrl, {
        headers: {
          'Accept': 'video/mp4',
          'Origin': 'https://visiogenweb.vercel.app'
        }
      });

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
    } catch (error: unknown) {
      let errorMessage = 'Failed to download video';
      if (error instanceof Error) {
        errorMessage += ': ' + error.message;
      }
      setError(errorMessage);
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
              <Loader />
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
          {!isLoading && !error && videoUrl && (
            <DownloadButton onClick={handleDownload}>
              Download Video
            </DownloadButton>
          )}
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