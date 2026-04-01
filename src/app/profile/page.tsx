import { ClipboardList, ExternalLink } from 'lucide-react';

export default function UserProfile() {
  // Mock data - Replace with MongoDB fetch in production
  const myApplications = [
    { id: "FP-2026-T9K2-1102", type: "Tech", status: "Paid", date: "2026-04-01" }
  ];

  return (
    <div className="min-h-screen bg-white py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-[#0A192F] mb-8">User Dashboard</h2>
        <div className="grid gap-4">
          {myApplications.map((app) => (
            <div key={app.id} className="p-6 border rounded-2xl flex justify-between items-center hover:bg-slate-50 transition">
              <div className="flex items-center gap-4">
                <div className="bg-blue-100 p-3 rounded-xl text-blue-600"><ClipboardList /></div>
                <div>
                  <p className="font-bold text-slate-900">{app.type} Application</p>
                  <p className="text-sm font-mono text-slate-500">{app.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase">{app.status}</span>
                <ExternalLink size={18} className="text-slate-400 cursor-pointer hover:text-blue-600" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
