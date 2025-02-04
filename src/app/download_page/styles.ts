// styles.ts
import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background: #0B0E14;
  position: relative;
`;

export const Navbar = styled.nav`
  padding: 1rem 2rem;
  background: #000000;
`;

export const NavTitle = styled.h1`
  color: white;
  font-size: 1.5rem;
`;

export const TitleSpan = styled.span`
  color: #2196f3;
`;

export const MainContent = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

export const Title = styled.h2`
  color: white;
  font-size: 2.5rem;
  margin-bottom: 2rem;
`;

export const TitleAccent = styled.span`
  color: #2DFFA0;
`;

export const EditorLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  background: #151922;
  padding: 2rem;
  border-radius: 8px;
`;

export const TextInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const Label = styled.label`
  color: white;
  font-size: 1.2rem;
`;

export const TextArea = styled.textarea`
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

export const OptionsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const OptionGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const Select = styled.select`
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

export const Button = styled.button`
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

export const LoaderOverlay = styled.div`
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

export const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

export const LoaderSpinner = styled.div`
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

export const LoaderText = styled.div`
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
`;

export const PreviewContainer = styled.div`
  background: #151922;
  border-radius: 8px;
  overflow: hidden;
  margin-top: 2rem;
`;

export const PreviewHeader = styled.div`
  background: #1E2430;
  padding: 1.5rem;
  border-bottom: 1px solid #2A3140;
`;

export const PreviewText = styled.h3`
  color: white;
  font-size: 1.5rem;
  margin: 0;
`;

export const VideoPreview = styled.div`
  padding: 2rem;
  min-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const DownloadButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  margin: 1rem auto;
  display: block;
`;

export const GenerateAnotherButton = styled(Button)`
  background: #4CAF50;
  &:hover {
    background: #388E3C;
  }
`;