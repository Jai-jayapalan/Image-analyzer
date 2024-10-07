import Header from "@/components/Header";
import MainContainer from "@/components/Main-Container";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header section */}
      <Header />

      {/* main container */}
      <MainContainer />
    </div>
  );
}