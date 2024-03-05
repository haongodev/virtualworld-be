// @ts-nocheck
import React from 'react';
import createAvatar from '../utils/createAvatar';
import Avatar from './Avatar';
import useAuth from '../hooks/useAuth';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const {user} = useAuth();

  return (
    <Avatar
      src={user?.avatar}
      alt={`${user.first_name} ${user.last_name}`}
      color={user?.avatar ? 'default' : createAvatar(`${user.first_name} ${user.last_name}`).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
