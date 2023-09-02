import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as IoIcons from 'react-icons/io';
import LogOut from './LogOut';

export const SidebarData = [
  {
    title: 'Home',
    path: '/',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },
 
  {
    title: 'Login',
    path: '/login',
    icon: <FaIcons.FaSignInAlt />,
    cName: 'nav-text'
  },
  {
    title: 'Sign Up',
    path: '/signup',
    icon: <FaIcons.FaUserPlus />,
    cName: 'nav-text'
  },
  {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />,
    cName: 'nav-text'
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,
    cName: 'nav-text'
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />,
    cName: 'nav-text'
  },
  {
    title: 'Log Out',
    path: '/logout',
    icon: <FaIcons.FaSignOutAlt  onClick={LogOut}/>,
    cName: 'nav-text'
  }
];