import React from 'react'
import { RouterProvider } from 'react-router-dom';
import router from './routes/AppRouter';

import { Toaster } from 'react-hot-toast';
import  AuthProvider  from './shared/context/AuthContext'


export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster />
      
    
    </AuthProvider>
  )
}
