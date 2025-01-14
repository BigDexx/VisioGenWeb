import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const Panel = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 32px;
  max-width: 400px;
  width: 100%;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const UsernameLabel = styled.label`
  font-family: 'Gilroy', sans-serif;
  font-size: 18px;
  font-weight: 500;
  color: #1a1a1a;
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const UsernameInput = styled.input`
  width: 100%;
  margin-top:20px;
  padding: 14px;
  padding-right: 44px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const ArrowButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: transparent;
  border: none;
  cursor: pointer;
  color: #3b82f6;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;

  &:hover {
    color: #2563eb;
    transform: translateY(-50%) scale(1.1);
  }
`;