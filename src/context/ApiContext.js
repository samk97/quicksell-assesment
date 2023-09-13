import { createContext, useContext, useEffect, useState } from 'react';

const DataApiContext = createContext();

export const useDataApi= ()=> {
  return useContext(DataApiContext);
}






export const DataApiProvider = ({ children }) => {
    const [userData, setUserData] = useState();
    const [ticketData, setTicketData] = useState();

  const [groupBy, setGroupBy] = useState('user')
  const [OrderBy, setOrderBy] = useState('priority')

    const updateGroupFilter = (key)=>{
        setGroupBy(key);
    }

    const updateOrderFilter = (key)=>{
        setOrderBy(key);
    }


  useEffect(() => {
    const fetchData = async () => {
        try {
          const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
          
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const res = await response.json();
          setUserData(res.users);
          setTicketData(res.tickets);
        } catch (error) {
          console.error('An error occurred:', error);
        }
    };

    fetchData();
  }, []);

  return (
    <DataApiContext.Provider value={{ userData,ticketData,groupBy,updateGroupFilter,OrderBy,updateOrderFilter }}>
      {children}
    </DataApiContext.Provider>
  );
}
