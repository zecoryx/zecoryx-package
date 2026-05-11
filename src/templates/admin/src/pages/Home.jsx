const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-4">Welcome to Zecoryx App</h1>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Your new project is ready! Edit{" "}
        <code className="bg-gray-200 dark:bg-gray-800 p-1 rounded">
          src/pages/Home.jsx
        </code>{" "}
        to get started.
      </p>

      <div className="flex gap-4">
        <a
          href="https://react.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Learn React
        </a>
        <a
          href="https://tailwindcss.com"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
        >
          Tailwind CSS
        </a>
      </div>
    </div>
  );
};

export default Home;
