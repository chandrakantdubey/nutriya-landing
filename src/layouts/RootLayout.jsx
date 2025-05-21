import Header from "../components/Header";

// src/layouts/RootLayout.jsx
const RootLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="w-full max-w-[1366px] w-[1366px] mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col h-[calc(100vh-4rem)]">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
