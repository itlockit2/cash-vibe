import CurrencyInput from "./components/CurrencyInput";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-dominant">
      <h1 className="text-4xl font-bold text-accent">초코네 환전가게</h1>
      <CurrencyInput />
    </div>
  );
}
