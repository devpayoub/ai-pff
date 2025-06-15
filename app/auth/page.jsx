'use client';

import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { supabase } from "@/services/subabaseClient";

function Login() {
  /**
   * sign in google
   */
  const SignInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    
    if (error) {
      console.error('Error signing in with Google:', error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center border rounded-2xl p-8">
        <Image
          src={'/logo.webp'}
          alt='logo'
          width={400}
          height={100}
          className='w-[180px] rounded-2xl'
        />
        <div className="flex items-center flex-col">
          <Image
            src={'/login.webp'}
            alt="login"
            width={600}
            height={400}
            className="w-[400px] h-[250px] rounded-2xl"
          />
          <h2 className='text-2xl font-bold text-center mt-5'>Welcome to AiCruiter</h2>
          <p className='text-gray-500 text-center'>Sign in with Google</p>
          <Button className='mt-7 w-full' onClick={SignInWithGoogle}>
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
