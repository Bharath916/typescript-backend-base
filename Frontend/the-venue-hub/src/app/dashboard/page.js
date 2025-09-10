"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const navigation_1 = require("next/navigation");
function DashboardPage() {
    const router = (0, navigation_1.useRouter)();
    // ✅ Protect route: redirect to login if no token
    (0, react_1.useEffect)(() => {
        const token = localStorage.getItem("authToken");
        if (!token) {
            router.push("/login");
        }
    }, [router]);
    return (<main className="p-9 bg-slate-900 min-h-screen text-white">
      <h2 className="text-xl font-bold mb-6">Dashboard</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">Royal Palace Hall</h3>
          <p>Hyderabad</p>
          <p className="text-sm text-white-600">Capacity: 500 people</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">Grand Lotus</h3>
          <p>Bangalore</p>
          <p className="text-sm text-white-600">Capacity: 300 people</p>
        </div>
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold">Diamond Convention</h3>
          <p>Chennai</p>
          <p className="text-sm text-white-600">Capacity: 700 people</p>
        </div>
      </div>
    </main>);
}
exports.default = DashboardPage;
//# sourceMappingURL=page.js.map