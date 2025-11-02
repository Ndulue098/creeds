import { House } from "lucide-react";

export default function Loading() {
    return  <div className="flex  items-center justify-center h-screen bg-gradient-to-b from-slate-100 to-slate-300">
      <div className="flex items-end gap-1">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`w-3  bg-purple-500 rounded-t-md animate-building`}
            style={{
              height: `${Math.random() * 60 + 40}px`,
              animationDelay: `${i * 0.15}s`,
            }}
          ></div>
        ))}
      </div>

      {/* <h1><House/></h1> */}
    </div>
}

