import React, { createContext, useState, useContext } from 'react';

const RentalContext = createContext(undefined);

export const RentalProvider = ({ children }) => {
  const [rentals, setRentals] = useState([]);

  const addRental = (rental) => {
    const newRental = { ...rental, id: Date.now().toString() };
    setRentals((prevRentals) => [...prevRentals, newRental]);
  };

  return (
    <RentalContext.Provider value={{ rentals, addRental }}>
      {children}
    </RentalContext.Provider>
  );
};

export const useRentals = () => {
  const context = useContext(RentalContext);
  if (context === undefined) {
    throw new Error('useRentals must be used within a RentalProvider');
  }
  return context;
};
