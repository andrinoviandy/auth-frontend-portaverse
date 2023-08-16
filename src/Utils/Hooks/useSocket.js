/* eslint-disable no-restricted-syntax */
/* eslint-disable consistent-return */
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

/** Socket initialization */
import { io } from "socket.io-client";
// "undefined" means the URL will be computed from the `window.location` object

const useSocket = (url, path) => {
  const token = Cookies.get("smartkmsystemAuthClient");

  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  /** Map of event name and event data */
  const [data, setData] = useState({});

  /** List of event name to be listened */
  const [events, setEvents] = useState([]);

  const [error, setError] = useState(null);

  // INITIALIZE SOCKET WITH USER TOKEN
  const initiate = () => {
    setSocket(
      io(url, {
        path,
        extraHeaders: {
          authorization: token,
        },
        secure: true,
      }),
    );
  };

  // CONNECT SOCKET
  const connect = () => {
    if (socket) {
      socket.connect();
    }
  };

  // DISCONNECT SOCKET
  const disconnect = () => {
    if (socket && isConnected) {
      socket.disconnect();
    }
  };

  // DEFAULT LISTEN SOCKET
  useEffect(() => {
    if (!socket) return;
    console.log("LISTENING SOCKET...");
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent(value) {
      setEvents((previous) => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on(token, onEvent);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off(token, onEvent);
    };
  }, [socket]);

  // REGISTER EVENT
  const _resetEvents = () => {
    socket.removeAllListeners();
    setData([]);
  };

  const register = (eventName) => {
    if (!socket) return;
    console.log("REGISTERING ", eventName);
    _resetEvents();

    if (events.includes(eventName)) return;

    setEvents((previous) => [...previous, eventName]);
  };

  // LISTEN EVENTS
  useEffect(() => {
    if (!socket) return;
    for (const event of events) {
      console.log("EVENT", event);
      socket.on(event, (eventData) => {
        setData((prev) => {
          console.log("EVENT DATA", eventData);
          let temp = {};

          temp[event] = eventData;

          console.log("TEMP", temp);
          return temp;
        });
      });
    }
    return () => {
      for (const event of events) {
        socket.off(event, function (eventData) {
          setData((prev) => {
            let temp = { ...prev };
            if (temp[event]) {
              temp[event].push(eventData);
            } else {
              temp[event] = [eventData];
            }
            return temp;
          });
        });
      }
    };
  }, [events]);

  return {
    data,
    events,
    isConnected,
    error,
    connect,
    disconnect,
    initiate,
    register,
  };
};

export default useSocket;
