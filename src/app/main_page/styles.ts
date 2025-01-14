import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  background-color: #111827;
  color: #f3f4f6;
`;

export const Navbar = styled.nav`
  background-color: #1f2937;
  padding: 1rem;
`;

export const NavTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
`;

export const TitleSpan = styled.span`
  color: #60a5fa;
`;

export const MainContent = styled.main`
  max-width: 1000px;
  margin: 0 auto;
  padding: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2.25rem;
  margin-bottom: 2rem;
`;

export const TitleAccent = styled.span`
  color: #34d399;
`;

export const EditorLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const TextInputSection = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 58%;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 32rem;
  padding: 1rem;
  background-color: #0f172a;
  border: 1px solid #1e3a8a;
  border-radius: 0.5rem;
  color: #f3f4f6;
  resize: none;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 2px rgba(96, 165, 250, 0.2);
  }
`;

export const OptionsSection = styled.div`
  width: 100%;
  
  @media (min-width: 768px) {
    width: 280px;
  }
`;

export const OptionGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem;
  background-color: #1f2937;
  border: 1px solid #374151;
  border-radius: 0.5rem;
  color: #f3f4f6;
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: #60a5fa;
  }
`;

export const GenerateButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #1d4ed8;
  }

  &:disabled {
    background-color: #6b7280;
    cursor: not-allowed;
  }
`;  