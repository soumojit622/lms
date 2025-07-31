import { ModeToggle } from "@/components/ModeToggle";
import { Navbar } from "./components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      <ModeToggle />
      <main className="container mx-auto px-4 md:px-6 lg:px-8 mb-32">
        {children}
      </main>
    </div>
  );
};

export default Layout;
