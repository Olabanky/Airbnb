/* 
Due to error encountered when you refresh page, we decided to create this 
file to handle when we are on the client side or server side.

Though i didnt get the error, the tutor got the error..i guess the error was next 13 still being test run (beta stage) so its not stable yet

THIS COMPONENT WILL NOW SERVE AS A WRAPPER TO ALL COMPONENTS WE WANT TO PROTECT FROM THE HYDRATION ERROR
This has been fixed for both development and production*/

"use client";

import {
  useEffect,
  useState,
} from "react"; /* since we are using useState, then this is a client component */

interface ClientOnlyProps {
  children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    /* the moment this loads, then it has finished server side rendering. then setHasMounted to true */
    setHasMounted(true);
  }, []);

  //conditionals
  if (!hasMounted) {
    return null;
  }

  // else
  return <>{children}</>;
};

export default ClientOnly;
