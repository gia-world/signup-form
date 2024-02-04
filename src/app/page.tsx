import FormContainer from "@/components/FormContainer";

export default function Home() {
  return (
    <main className="bg-slate-200 px-3 py-8 min-h-screen">
      <section className="mx-auto max-w-xl bg-white border border-slate-400 shadow-md rounded-md px-7 py-6">
        <div className="mb-4">
          <h1 className="text-xl font-bold">회원가입</h1>
          <p>회원이 되어 다양한 혜택을 경험해 보세요!</p>
        </div>
        <FormContainer />
      </section>
    </main>
  );
}
