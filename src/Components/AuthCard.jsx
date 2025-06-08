export default function AuthCard({ title, children }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#4F6F52]">
        <h2 className="text-2xl font-bold text-center text-[#4F6F52] mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
}
