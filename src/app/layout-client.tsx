'use client'

import { createGlobalStyle } from 'styled-components';
import StyledComponentsRegistry from './lib/registry';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gilroy';
    src: url('/fonts/Gilroy-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
    font-display: swap;
  }

  body {
    font-family: 'Gilroy', -apple-system, BlinkMacSystemFont, sans-serif;
  }
`;

type ClientLayoutProps = {
  children: React.ReactNode;
  fontClasses: string;
};

export default function ClientLayout({ children, fontClasses }: ClientLayoutProps) {
  return (
    <StyledComponentsRegistry>
      <GlobalStyle />
      <body className={`${fontClasses} antialiased`}>
        {children}
      </body>
    </StyledComponentsRegistry>
  );
}