import React, { createContext, useState } from 'react';

export const AddUserFormContext = createContext();

export const AddUserFormProvider = ({ children }) => {
  const [AddUserForm, setAddUserForm] = useState(false);

  return (
    <AddUserFormContext.Provider value={{ AddUserForm, setAddUserForm }}>
      {children}
    </AddUserFormContext.Provider>
  );
};
