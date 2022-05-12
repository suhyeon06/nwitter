import React, { useState } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { authService } from 'fbase';
import AuthForm from 'components/AuthForm';

const Auth = () => {
  const onSocialClick = async (event) => {
    const {
      target: { name },
    } = event;
    let provider;
    if (name === 'google') {
      provider = new GoogleAuthProvider();
    }
    await signInWithPopup(authService, provider);
  };
  return (
    <div>
      <AuthForm />
      <button onClick={onSocialClick} name="google">
        Continue with Google
      </button>
    </div>
  );
};
export default Auth;
