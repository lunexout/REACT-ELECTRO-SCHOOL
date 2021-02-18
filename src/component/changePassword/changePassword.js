import React from 'react';
import ChangePasswordContent from './changePasswordContent/changePasswordContent';
import { useHistory } from 'react-router-dom';

export default function ChangePassword() {
  const history = useHistory();
  return(
    <>
      {localStorage.getItem("ID") === null ? (
        history.push("/")
      ) : (
        <ChangePasswordContent />
      )}
    </>
  )
}
