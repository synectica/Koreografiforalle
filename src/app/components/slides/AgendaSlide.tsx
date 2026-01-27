import { agendaItems } from "./slideData";
import agendaImage from "figma:asset/fb32d39a0c8b7068c2e921088d8a80b2c976a22b.png";

export function AgendaSlide() {
  return (
    <div className="w-full h-full bg-slate-50 p-16 flex gap-12">
      <div className="w-1/2">
        <img
          src={agendaImage}
          alt="Collection preview"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="w-1/2 flex flex-col justify-center">
        <h2 className="text-5xl mb-12 text-slate-900">
          Agenda
        </h2>
        <ul className="space-y-3">
          {agendaItems.map((item, index) => (
            <li
              key={index}
              className="text-slate-800 text-xl flex items-center gap-3"
            >
              <span className="w-2 h-2 bg-slate-900 rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}