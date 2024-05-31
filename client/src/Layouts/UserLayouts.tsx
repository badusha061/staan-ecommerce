import React, { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface UserLayoutsProps {
  children: ReactNode;
}

const UserLayouts: React.FC<UserLayoutsProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default UserLayouts;
