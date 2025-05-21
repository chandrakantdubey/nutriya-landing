import RootLayout from "./layouts/RootLayout";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import TabsSection from "./components/TabsSection";
import HowToStart from "./components/HowToStart";

function App() {
  return (
    <RootLayout>
      <HeroSection />
      <FeaturesSection />
      <TabsSection />
      <HowToStart />
    </RootLayout>
  );
}

export default App;
