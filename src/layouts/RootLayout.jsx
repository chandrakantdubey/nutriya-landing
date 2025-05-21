const RootLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white flex justify-center">
      <main className="w-full max-w-[1366px] px-4">{children}</main>
    </div>
  );
};

export default RootLayout;
