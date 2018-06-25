import React from "react";
// import { CLIENT_RENEG_LIMIT } from "tls";

export default () => {
  return (
    <footer className="bg-dark text-white mt-5 p-4 text-center">
      Copyright &copy; {new Date().getFullYear()} Parking Sniffer
    </footer>
  );
};
