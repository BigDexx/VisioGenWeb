'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import * as S from './styles';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [emailid, setemailID] = useState('');
  const router = useRouter();
  
  const handleSubmit = () => {
    if (username.trim()) {
      console.log('Details submitted:', username);
      // Navigate to main page
      router.push('/main_page');
    }
  };

  return (
    <S.Container>
      <S.Panel>
        <S.FormContainer>
          <S.UsernameLabel>
            Enter username
          </S.UsernameLabel>
          <S.InputWrapper>
            <S.UsernameInput
              type="text"
              value={emailid}
              onChange={(e) => setemailID(e.target.value)}
              //Verificaiton process of email required
              placeholder="Type your emailid..."
            />
             <S.UsernameInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              // this is also to be sent to the database
              placeholder="Type your username..."
            />
            <S.ArrowButton onClick={handleSubmit}>
              <ChevronRight />
            </S.ArrowButton>
          </S.InputWrapper>
        </S.FormContainer>
      </S.Panel>
    </S.Container>
  );
};

export default LoginPage;