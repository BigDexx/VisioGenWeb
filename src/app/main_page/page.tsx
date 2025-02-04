'use client'
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import * as S from './styles';

const VisioGenEditor: React.FC = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [font, setFont] = useState('naname-goma');
  const [videoType, setVideoType] = useState('Minecraft');
  const [voiceType, setVoiceType] = useState('Male');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const requestData = {
        text: text,
        font: font,
        videoType: videoType,
        voiceType: voiceType,
        speechSpeed: 1.0
      };

      const response = await fetch('https://dexxtech.xyz/start_generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { job_id } = await response.json();

      // Store generation data
      const generationData = {
        ...requestData,
        job_id,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('generationData', JSON.stringify(generationData));

      router.push('/download_page');
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Failed to start video generation. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>

      {isLoading && (
        <S.LoaderOverlay>
          <S.LoaderContainer>
            <S.LoaderSpinner />
            <S.LoaderText>
              Starting video generation...<br/>
              Please wait
            </S.LoaderText>
          </S.LoaderContainer>
        </S.LoaderOverlay>
      )}

      <S.Navbar>
        <S.NavTitle>
          Welcome to <S.TitleSpan>VisioGen</S.TitleSpan>
        </S.NavTitle>
      </S.Navbar>

      <S.MainContent>
        <S.Title>
          <S.TitleAccent>Create an</S.TitleAccent> instant short
        </S.Title>

        {error && (
          <div style={{ color: 'red', marginBottom: '1rem' }}>
            {error}
          </div>
        )}

        <S.EditorLayout>
          <S.TextInputSection>
            <S.Label>Enter your story:</S.Label>
            <S.TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here..."
            />
          </S.TextInputSection>

          <S.OptionsSection>
            <S.OptionGroup>
              <S.Label>Choose a Font:</S.Label>
              <S.Select
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option value="naname-goma">naname-goma</option>
                <option value="Handscript">Handscript</option>
                <option value="Shikaku-serif">Shikaku-serif</option>
                <option value="Arvo-Bold">Arvo-Bold</option>
              </S.Select>
            </S.OptionGroup>

            <S.OptionGroup>
              <S.Label>Choose Video Type:</S.Label>
              <S.Select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
              >
                <option value="Minecraft">Minecraft</option>
                <option value="GTA">GTA</option>
                <option value="Dragon Ball">Dragon Ball</option>
                <option value="COD">COD</option>
              </S.Select>
            </S.OptionGroup>

            <S.OptionGroup>
              <S.Label>Choose Voice Type:</S.Label>
              <S.Select
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </S.Select>
            </S.OptionGroup>

            <S.Button
              onClick={handleGenerate}
              disabled={isLoading || !text.trim()}
            >
              {isLoading ? 'Starting Generation...' : 'Generate Video'}
            </S.Button>
          </S.OptionsSection>
        </S.EditorLayout>
      </S.MainContent>
    </S.Container>
  );
};

export default VisioGenEditor;