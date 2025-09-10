"use strict";
"use client";
Object.defineProperty(exports, "__esModule", { value: true });
const halls = [
    { id: 1, name: "Royal Palace Hall", location: "Hyderabad", capacity: 500 },
    { id: 2, name: "Grand Lotus", location: "Bangalore", capacity: 300 },
    { id: 3, name: "Diamond Convention", location: "Chennai", capacity: 700 },
    { id: 4, name: "Emerald Hall", location: "Delhi", capacity: 450 },
];
function ConventionGrid() {
    return (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {halls.map((hall) => (<div key={hall.id} className="p-4 border rounded-lg shadow hover:shadow-lg transition bg-gray">
          <h2 className="text-xl font-semibold">{hall.name}</h2>
          <p className="text-gray-600">{hall.location}</p>
          <p className="text-sm text-gray-500">
            Capacity: {hall.capacity} people
          </p>
        </div>))}
    </div>);
}
exports.default = ConventionGrid;
//# sourceMappingURL=ConventionGrid.js.map