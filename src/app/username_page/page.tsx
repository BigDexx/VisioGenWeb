'use client'
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { Container, Panel, FormContainer, UsernameInput, UsernameLabel, InputWrapper, ArrowButton} from './styles';

const UsernamePage: React.FC = () => {
  const [username, setUsername] = useState('');
  const router = useRouter();
  
  const handleSubmit = () => {
    if (username.trim()) {
      console.log('Username submitted:', username);
      // Navigate to main page
      router.push('/main_page');
    }
  };

  return (
    <Container>
      <Panel>
        <FormContainer>
          <UsernameLabel>
            Enter username
          </UsernameLabel>
          <InputWrapper>
            <UsernameInput
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type your username..."
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <ArrowButton onClick={handleSubmit}>
              <ChevronRight />
            </ArrowButton>
          </InputWrapper>
        </FormContainer>
      </Panel>
    </Container>
  );
};

export default UsernamePage;