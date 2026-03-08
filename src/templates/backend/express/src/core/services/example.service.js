export const getSystemStatus = () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Zecoryx Backend (Express) is running with Clean Architecture!",
  };
};
