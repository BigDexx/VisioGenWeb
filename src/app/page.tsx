'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  PageContainer,
  Container,
  LogoSection,
  Logo,
  HeroSection,
  TrianglePattern,
  Dot,
  ContentWrapper,
  Title,
  Subtitle,
  Button,
  SignUpButton
} from './styles';

const createTrianglePattern = (isInverted: boolean) => {
  const pattern = [];
  const rows = 10;
  const cols = 10;
  
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (isInverted) {
        if (j >= i && j < cols - i+5) {
          pattern.push({ row: i + 1, col: j + 1, delay: (i + j) * 100 });
        }
      } else {
        if (j >= (rows - 1 - i)-5 && j < cols - (rows - 1 - i)) {
          pattern.push({ row: i + 1, col: j + 1, delay: (i + j) * 100 });
        }
      }
    }
  }
  
  return pattern;
};

export default function Page() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = () => {
    router.push('/login_page');
  };

  const handleSignup = () => {
    router.push('/signup_page');
  };

  if (!mounted) return null;

  const leftTriangle = createTrianglePattern(false);
  const rightTriangle = createTrianglePattern(true);

  return (
    <PageContainer>
      <Container>
        <LogoSection style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          padding: '2rem',
          zIndex: 1000,
          backgroundColor: '#1a1a1a'
        }}>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'flex-start',
            maxWidth: '1200px',
            margin: '0 auto',
            width: '100%'
          }}>
            <Logo style={{ margin: 0 }}>VisioGen</Logo>
            <div style={{ 
              display: 'flex', 
              gap: '1rem',
              marginTop: '-0.5rem'
            }}>
              <SignUpButton 
                onClick={handleSignup}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem',
                  background: '#1a1a1a',
                  color: '#2563eb',
                  border: '1px solid #2563eb'
                }}
              >
                SIGNUP
              </SignUpButton>
              <Button 
                onClick={handleLogin}
                style={{
                  padding: '0.75rem 2rem',
                  fontSize: '1rem'
                }}
              >
                LOGIN
              </Button>
            </div>
          </div>
        </LogoSection>

        <HeroSection style={{
          padding: '2rem 0',
          minHeight: 'calc(85vh - 60px)',
          marginTop: '60px'
        }}>
          <TrianglePattern position="left">
            {leftTriangle.map((dot, i) => (
              <Dot 
                key={`left-${i}`}
                style={{ 
                  gridRow: dot.row,
                  gridColumn: dot.col 
                }}
                delay={dot.delay}
              />
            ))}
          </TrianglePattern>

          <ContentWrapper>
            <Title>
              Generate viral-ready clips in seconds
            </Title>
            <Subtitle>
              Your all-in-one tool for creating AI voiceovers, engaging subtitles
              optimized gameplay, and more.
            </Subtitle>
            <Button>
              Try VisioGen now
            </Button>
          </ContentWrapper>

          <TrianglePattern position="right">
            {rightTriangle.map((dot, i) => (
              <Dot 
                key={`right-${i}`}
                style={{ 
                  gridRow: dot.row,
                  gridColumn: dot.col 
                }}
                delay={dot.delay}
              />
            ))}
          </TrianglePattern>
        </HeroSection>
      </Container>
    </PageContainer>
  );
}
