export const getSystemStatus = () => {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
    framework: "Fastify",
    architecture: "Clean Code (Layered)",
  };
};
