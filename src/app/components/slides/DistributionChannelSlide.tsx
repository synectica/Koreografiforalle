export function DistributionChannelSlide() {
  const channels = [
    {
      type: "E-commerce",
      description: "Primary sales channel through branded website",
      percentage: "60%"
    },
    {
      type: "Flagship Stores",
      description: "Premium retail experience in major cities",
      percentage: "25%"
    },
    {
      type: "Select Retailers",
      description: "Curated partnerships with luxury boutiques",
      percentage: "10%"
    },
    {
      type: "Pop-ups",
      description: "Seasonal and event-based temporary locations",
      percentage: "5%"
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-white to-slate-50 p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Distribution Channel</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-2 gap-8">
        {channels.map((channel, index) => (
          <div key={index} className="bg-white p-8 rounded-lg shadow-sm border border-slate-200 relative overflow-hidden">
            <div className="absolute top-0 right-0 text-8xl font-light text-slate-100">
              {channel.percentage}
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl text-slate-900 mb-4">{channel.type}</h3>
              <p className="text-slate-700 leading-relaxed">{channel.description}</p>
              <div className="mt-6">
                <div className="w-full bg-slate-100 rounded-full h-3">
                  <div 
                    className="bg-slate-900 h-3 rounded-full"
                    style={{ width: channel.percentage }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Modify distribution channels and percentages in DistributionChannelSlide.tsx]
        </p>
      </div>
    </div>
  );
}
