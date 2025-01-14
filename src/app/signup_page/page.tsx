/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import React from 'react';
import * as S from './styles';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/navigation';

const SignUpPage: React.FC = () => {
  const router = useRouter();
  const handleCreateAccount = (e:any) => {
    router.push('/create_account_page');
  }
  const handleGoogle = async (e: any) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
        router.push('/username_page');
      }
    catch (error) {
      console.error('Error:', error);
    }
  }
  return (
    <S.Container>
      <S.Panel>
        <S.FormContainer>
          <S.LogoContainer>
            <S.Logo />
            <S.Title>
              Welcome to <S.BlueText>VisioGen</S.BlueText>
            </S.Title>
          </S.LogoContainer>

          <S.SocialButton onClick={handleGoogle}> 
            <img src="/api/placeholder/20/20" alt="Google icon" />
            <span>Join with Google</span>
          </S.SocialButton>

          
          <S.SocialButton onClick={handleCreateAccount}> 
            <span>Create new Account</span>
          </S.SocialButton>

        </S.FormContainer>
      </S.Panel>

      <S.Panel>
        <S.PreviewTitle>
          <S.TealText>Create an </S.TealText><S.BlueText>instant short</S.BlueText>{' '}
        </S.PreviewTitle>
        <S.PreviewText>
          With VisioGen, you can convert any story to a short video, instantly 🔥
        </S.PreviewText>
        <S.PreviewContainer>
          <S.PreviewImage 
            src="/api/placeholder/450/800" 
            alt="Preview"
          />
          <S.PlayButton />
        </S.PreviewContainer>
      </S.Panel>
    </S.Container>
  );
};

export default SignUpPage;