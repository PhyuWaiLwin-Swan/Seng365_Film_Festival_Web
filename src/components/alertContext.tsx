// import {createContext, useState} from "react";
//
// export interface AlertContextValue {
//     alert: { message: string; severity: string };
//     showAlert: (message: string, severity: string) => void;
// }
//
// export const AlertContext = createContext<AlertContextValue>({
//     alert: { message: '', severity: '' },
//     showAlert: () => {},
// });
//
// export const AlertProvider: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
//     const [alert, setAlert] = useState<{ message: string; severity: string }>({ message: '', severity: '' });
//
//     const showAlert = (message: string, severity: string) => {
//         setAlert({ message, severity });
//
//         setTimeout(() => {
//             setAlert({ message: '', severity: '' });
//         }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
//     };
//
//     return (
//         <AlertContext.Provider value={{ alert, showAlert }}>
//             {children}
//         </AlertContext.Provider>
//     );
// };
//
//
//
// export default {AlertContext,AlertProvider}



import React, { createContext, useState } from 'react';

export interface AlertContextValue {
    alert: { message: string; severity: string };
    showAlert: (message: string, severity: string) => void;
}

export const AlertContext = createContext<AlertContextValue>({
    alert: { message: '', severity: '' },
    showAlert: () => {},
});

interface AlertProviderProps {
    children: React.ReactNode;
}

export const AlertProvider: React.FC<AlertProviderProps> = ({ children }) => {
    const [alert, setAlert] = useState<{ message: string; severity: string }>({
        message: '',
        severity: '',
    });

    const showAlert = (message: string, severity: string) => {
        setAlert({ message, severity });

        setTimeout(() => {
            setAlert({ message: '', severity: '' });
        }, 3000); // Hide the alert after 3 seconds (3000 milliseconds)
    };

    return (
        <AlertContext.Provider value={{ alert, showAlert }}>
            {children}
        </AlertContext.Provider>
    );
};

export default {AlertProvider,AlertContext};