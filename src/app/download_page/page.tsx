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

const DownloadPage = () => {
  const router = useRouter();
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkForVideo = async () => {
      const generationData = localStorage.getItem('generationData');
      if (!generationData) {
        setError('No video generation data found');
        setIsLoading(false);
        return;
      }

      const data = JSON.parse(generationData);
      if (data.videoUrl) {
        setVideoUrl(data.videoUrl);
        setIsLoading(false);
        return;
      }

      setVideoUrl(data.videoUrl);
      setIsLoading(false);
    };

    checkForVideo();
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
