import BouncingBalls from "@/components/bouncingballs";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BouncingBalls />
      <div className="relative z-10 p-10 text-white">
        <h1 className="text-4xl font-bold">Welcome to My Blog</h1>
        <p>This is where cool stuff happens.</p>
      </div>
    </div>
  );
}
