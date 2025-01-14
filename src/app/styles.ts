import styled, { keyframes } from 'styled-components';

const glowEffect = keyframes`
  0% { box-shadow: 0 0 5px #00ffff; }
  50% { box-shadow: 0 0 15px #00ffff; }
  100% { box-shadow: 0 0 5px #00ffff; }
`;

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #1a1a1a;
  color: white;
  font-family: Gilroy, -apple-system, BlinkMacSystemFont, sans-serif;
  overflow-x: hidden;
`;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  position: relative;
  width: 100%;
`;

export const LogoSection = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem;
  background-color: rgba(26, 26, 26, 0.98);
  z-index: 100;
  backdrop-filter: blur(8px);
`;

export const LogoContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
`;

export const Logo = styled.span`
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
  letter-spacing: -0.02em;
`;

export const HeroSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0rem 0;
  position: relative;
  min-height: calc(100vh - 100px);
  margin-top: 80px; /* Add space for fixed logo section */
`;

// Rest of the styled components remain the same
export const TrianglePattern = styled.div<{ position: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position}: -50px;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 400px;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  gap: 8px;
  opacity: 0.8;

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const Dot = styled.div<{ delay?: number }>`
  width: 6px;
  height: 6px;
  background-color: #00ffff;
  border-radius: 50%;
  animation: ${glowEffect} 2s infinite;
  animation-delay: ${props => props.delay || 0}ms;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.5);
    background-color: #fff;
  }
`;

export const ContentWrapper = styled.div`
  text-align: center;
  max-width: 720px;
  margin: 0 auto;
  z-index: 1;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 800;
  margin-bottom: 1.5rem;
  letter-spacing: -0.02em;
  line-height: 1.1;
  background: linear-gradient(to right, #00ffff 10%, #449ff7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Subtitle = styled.p`
  font-size: clamp(1rem, 2vw, 1.25rem);
  color:rgb(90, 117, 121);
  margin-bottom: 3rem;
  line-height: 1.6;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

export const Button = styled.button`
  background: linear-gradient(135deg, #2563eb 0%,rgb(74, 118, 240) 100%);
  color: white;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 4px 12px rgba(0, 176, 215, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(37, 99, 235, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const SignUpButton = styled.button`
  background: #f3f4f6;
  color: #2563eb;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 9999px;
  font-size: 1.125rem;
  border: 2px solid #2563eb;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    background: #f8fafc;
  }

  &:active {
    transform: translateY(0);
  }
`;

export const LogoText = styled.div`
  margin-top: 3rem;
  display: flex;
  gap: 4px;
  justify-content: center;
`;

export const DotChar = styled(Dot)`
  width: 4px;
  height: 4px;
  background-color: #00ffff;
`;