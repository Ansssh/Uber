import React, { useEffect, createContext } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`);

const SocketProvider = ({ children }) => {
    useEffect(() => {
        socket.on("connect", () => {
            console.log("Socket connected:", socket.id);
        });

        socket.on("disconnect", () => {
            console.log("Socket disconnected");
        });

        // return () => {
        //     socket.off("connect");
        //     socket.off("disconnect");
        //     socket.close();
        //     console.log("Socket connection closed");
        // };
    }, []);


    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
}


export { SocketContext }
export default SocketProvider;