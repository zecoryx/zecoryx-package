export const getStatus = (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Zecoryx Backend is running smoothly!",
  });
};
