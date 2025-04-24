
export const RevolverImage = () => {
  return (
    <svg width="100%" height="100%" viewBox="0 0 300 200" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Revolver Barrel */}
      <rect x="165" y="92" width="120" height="18" rx="3" fill="#444444" />
      <rect x="165" y="92" width="120" height="18" rx="3" stroke="#333333" strokeWidth="2" />
      
      {/* Cylinder */}
      <circle cx="160" cy="100" r="30" fill="#555555" />
      <circle cx="160" cy="100" r="30" stroke="#333333" strokeWidth="2" />
      <circle cx="160" cy="100" r="20" fill="#444444" stroke="#333333" />
      
      {/* Cylinder chambers */}
      <circle cx="160" cy="70" r="6" fill="#111111" />
      <circle cx="180" cy="85" r="6" fill="#111111" />
      <circle cx="180" cy="115" r="6" fill="#111111" />
      <circle cx="160" cy="130" r="6" fill="#111111" />
      <circle cx="140" cy="115" r="6" fill="#111111" />
      <circle cx="140" cy="85" r="6" fill="#111111" />
      
      {/* Handle */}
      <path d="M120 100 L130 100 L130 140 C130 148 120 148 120 140 Z" fill="#5E3A22" />
      <path d="M120 100 L130 100 L130 140 C130 148 120 148 120 140 Z" stroke="#3A2A1A" strokeWidth="1" />
      
      {/* Trigger guard */}
      <path d="M130 100 Q130 110 140 115" stroke="#444444" strokeWidth="3" fill="none" />
      
      {/* Trigger */}
      <rect x="134" y="105" width="2" height="8" rx="1" fill="#333333" />
      
      {/* Hammer */}
      <path d="M130 90 L125 85 L125 82 L135 82 L135 85 Z" fill="#444444" stroke="#333333" />
      
      {/* Highlights */}
      <line x1="165" y1="96" x2="280" y2="96" stroke="#666666" strokeWidth="0.5" />
      <path d="M160 80 A20 20 0 0 1 180 100" stroke="#666666" strokeWidth="0.5" fill="none" />
    </svg>
  );
};

export const BloodOverlay = () => {
  return (
    <>
      {Array.from({length: 20}).map((_, i) => (
        <div 
          key={i}
          className="absolute bg-red-700"
          style={{
            width: `${10 + Math.random() * 20}px`,
            height: `${50 + Math.random() * 100}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.8,
            borderRadius: '50%',
            animation: `bloodSpray 0.5s ease-out forwards`,
            animationDelay: `${Math.random() * 0.2}s`
          }}
        ></div>
      ))}
      {Array.from({length: 15}).map((_, i) => (
        <div 
          key={i + 'splash'}
          className="absolute bg-red-800 rounded-full"
          style={{
            width: `${20 + Math.random() * 40}px`,
            height: `${20 + Math.random() * 40}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.7,
            animation: `bloodSplash 0.8s ease-out forwards`,
            animationDelay: `${Math.random() * 0.3}s`
          }}
        ></div>
      ))}
    </>
  );
};

export const RoomBackground = () => {
  return (
    <>
      {/* Room decor with enhanced graphics */}
      <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-[#231B15] opacity-20 rounded-full blur-3xl"></div>
      
      {/* Wooden floor */}
      <div className="absolute bottom-0 w-full h-40 bg-[#3A2A1A] bg-opacity-70 grid grid-cols-8">
        {Array.from({length: 32}).map((_, i) => (
          <div key={i} className="border-t border-r border-[#4A3A2A] h-full"></div>
        ))}
      </div>
      
      {/* Walls texture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full opacity-20">
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} className="absolute border-b border-[#2A2016] w-full h-[5%]" style={{top: `${i * 5}%`}}></div>
          ))}
          {Array.from({length: 20}).map((_, i) => (
            <div key={i} className="absolute border-r border-[#2A2016] h-full w-[5%]" style={{left: `${i * 5}%`}}></div>
          ))}
        </div>
      </div>
      
      {/* Room edges */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-[#0A0806] to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#0A0806] to-transparent"></div>
        <div className="absolute top-0 left-0 h-full w-20 bg-gradient-to-r from-[#0A0806] to-transparent"></div>
        <div className="absolute top-0 right-0 h-full w-20 bg-gradient-to-l from-[#0A0806] to-transparent"></div>
      </div>
      
      {/* Table */}
      <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 w-[28rem] h-4 bg-[#3A2E20] rounded-t-md"></div>
      <div className="absolute bottom-44 left-1/2 transform -translate-x-1/2 w-[26rem] h-10 bg-[#2A1E10] shadow-xl rounded">
        <div className="absolute inset-0 bg-[#4A3A20] bg-opacity-20 rounded"></div>
      </div>
      
      {/* Lamp */}
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2">
        <div className="w-1 h-40 bg-[#2C2217]"></div>
        <div className="w-40 h-20 bg-[#4A3A20] rounded-full -mt-2 relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 h-36 bg-[#F9D777] opacity-20 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-[#F9D777] opacity-80 rounded-full blur-md"></div>
        </div>
        <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-40 h-[300px] bg-[#F9D777] opacity-10 blur-xl" style={{clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)'}}></div>
      </div>
      
      {/* Smoke effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({length: 10}).map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-[#AAAAAA] opacity-5 blur-xl"
            style={{
              width: `${20 + Math.random() * 50}px`,
              height: `${20 + Math.random() * 50}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `floating ${10 + Math.random() * 10}s infinite ease-in-out`
            }}
          ></div>
        ))}
      </div>
    </>
  );
};
