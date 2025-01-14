import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #151517;
`;

export const Panel = styled.div`
  width: 50%;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
// Add this to your styles.ts file
export const ErrorMessage = styled.div`
  color: #dc2626;
  margin: 8px 0;
  font-size: 14px;
  text-align: center;
`;
export const FormContainer = styled.div`
  width: 100%;
  max-width: 28rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

export const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  background-color: #3B82F6;
  border-radius: 9999px;
`;

export const Title = styled.h1`
  font-size: 1.875rem;
  font-weight: bold;
  color: white;
`;

export const BlueText = styled.span`
  color: #3B82F6;
`;

export const TealText = styled.span`
  color: #2DD4BF;
`;

export const DividerText = styled.span`
  padding: 0 1rem;
  color: #6B7280;
`;

export const SocialButton = styled.button`
  width: 100%;
  background-color: #1F2937;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  font-family: Gilroy;
  &:hover {
    background-color: #374151;
  }
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 1.5rem 0;

  &::before,
  &::after {
    content: '';
    flex-grow: 1;
    border-top: 1px solid #374151;
  }
`;

export const Input = styled.input`
  width: 100%;
  background-color: #1F2937;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: none;
  outline: none;

  &:focus {
    box-shadow: 0 0 0 2px #3B82F6;
  }
`;

export const CreateAccountButton = styled.button`
  width: 100%;
  background-color: #3B82F6;
  color: white;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2563EB;
  }
`;

export const StyledLink = styled.a`
  color: #3B82F6;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const TermsLink = styled(StyledLink)`
  color: #9CA3AF;
`;

export const LoginText = styled.p`
  text-align: center;
  color: #6B7280;
`;

export const TermsText = styled.p`
  text-align: center;
  font-size: 0.875rem;
  color: #6B7280;
`;

export const PreviewTitle = styled.h2`
  font-size: 2.25rem;
  font-weight: bold;
  color: white;
  text-align: center;
  margin-bottom: 1rem;
`;

export const PreviewText = styled.p`
  font-size: 1.125rem;
  color: #D1D5DB;
  text-align: center;
  margin-bottom: 2rem;
`;

export const PreviewContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 17rem;
  aspect-ratio: 9/16;
  background-color: #1F2937;
  border-radius: 1rem;
  overflow: hidden;
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const PlayButton = styled.button`
  position: absolute;
  inset: 0;
  margin: auto;
  width: 4rem;
  height: 4rem;
  background-color: #3B82F6;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    content: '';
    width: 0;
    height: 0;
    border-top: 0.5rem solid transparent;
    border-left: 0.75rem solid white;
    border-bottom: 0.5rem solid transparent;
    margin-left: 0.25rem;
  }
`;

export const GenerateButton = styled.button`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background-color: #7C3AED;
  color: white;
  padding: 0.5rem 1.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #6D28D9;
  }
`;