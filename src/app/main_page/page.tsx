'use client'
import Head from 'next/head';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

const Container = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  position: relative;
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

const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

const TitleAccent = styled.span`
   color: #2DFFA0; 
`;

const EditorLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  background: #151922;
  padding: 2rem;
  border-radius: 8px;
`;

const TextInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Label = styled.label`
  color: white;
  font-size: 1.2rem;
`;

const TextArea = styled.textarea`
  height: 300px;
  padding: 1rem;
  background: #151922; 
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  color: white;
  font-size: 1rem;
  resize: none;

  &:focus {
    outline: none;
    border-color: #2DFFA0;
  }
`;

const OptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  background: #3d3d3d;
  border: 1px solid #4d4d4d;
  border-radius: 4px;
  color: white;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #2196f3;
  }
`;

const GenerateButton = styled.button`
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

const LoaderOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
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

const ErrorMessage = styled.div`
  color: #ff4444;
  background: rgba(255, 68, 68, 0.1);
  padding: 1rem;
  border-radius: 4px;
  margin-top: 1rem;
`;


const VisioGenEditor: React.FC = () => {
  const router = useRouter();
  const [text, setText] = useState('');
  const [font, setFont] = useState('naname-goma');
  const [videoType, setVideoType] = useState('Minecraft');
  const [voiceType, setVoiceType] = useState('Male');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [progress, setProgress] = useState<string>('');

  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setProgress('Initiating video generation...');

    try {
      const requestData = {
        text: text,
        font: font,
        videoType: videoType,
        voiceType: voiceType,
        speechSpeed: 1.0
      };

      const response = await fetch('https://dexxtech.xyz/endpoint', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.status === 'success' && data.job_id) {
        const generationData = {
          ...requestData,
          jobId: data.job_id,
          status: 'processing'
        };
        localStorage.setItem('generationData', JSON.stringify(generationData));
        router.push('/download_page');
      } else {
        throw new Error('Failed to start video generation');
      }
    } catch (error) {
      console.error('Generation failed:', error);
      setError(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
      {isLoading && (
        <LoaderOverlay>
          <LoaderContainer>
            <LoaderSpinner />
            <LoaderText>
              {progress}<br/>
              Please wait while we process your request
            </LoaderText>
          </LoaderContainer>
        </LoaderOverlay>
      )}

      <Navbar>
        <NavTitle>
          Welcome to <TitleSpan>VisioGen</TitleSpan>
        </NavTitle>
      </Navbar>

      <MainContent>
        <Title>
          <TitleAccent>Create an</TitleAccent> instant short
        </Title>

        <EditorLayout>
          <TextInputSection>
            <Label>Enter your story:</Label>
            <TextArea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type here..."
            />
          </TextInputSection>

          <OptionsSection>
            <OptionGroup>
              <Label>Choose a Font:</Label>
              <Select
                value={font}
                onChange={(e) => setFont(e.target.value)}
              >
                <option value="naname-goma">naname-goma</option>
                <option value="Handscript">Handscript</option>
                <option value="Shikaku-serif">Shikaku-serif</option>
                <option value="Arvo-Bold">Arvo-Bold</option>
              </Select>
            </OptionGroup>

            <OptionGroup>
              <Label>Choose Video Type:</Label>
              <Select
                value={videoType}
                onChange={(e) => setVideoType(e.target.value)}
              >
                <option value="Minecraft">Minecraft</option>
                <option value="GTA">GTA</option>
                <option value="Dragon Ball">Dragon Ball</option>
                <option value="COD">COD</option>
              </Select>
            </OptionGroup>

            <OptionGroup>
              <Label>Choose Voice Type:</Label>
              <Select
                value={voiceType}
                onChange={(e) => setVoiceType(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Select>
            </OptionGroup>

            <GenerateButton
              onClick={handleGenerate}
              disabled={isLoading || !text.trim()}
            >
              {isLoading ? 'Generating...' : 'Generate Video'}
            </GenerateButton>
          </OptionsSection>
        </EditorLayout>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
      </MainContent>
    </Container>
  );
};

export default VisioGenEditor;