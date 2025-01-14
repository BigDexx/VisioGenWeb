'use client'
import React from 'react';
import * as S from './styles';
import { GoogleAuthProvider,signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';

const LoginPage: React.FC = () => {

  const handleGoogle = async () => {
    const provider = await new GoogleAuthProvider();
    return signInWithPopup(auth,provider)
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

          {/* <S.LoginText>
            Have an account?{' '}
            <S.StyledLink href="#">Login</S.StyledLink>
          </S.LoginText> */}
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

export default LoginPage;