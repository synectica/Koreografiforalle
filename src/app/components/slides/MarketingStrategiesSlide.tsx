export function MarketingStrategiesSlide() {
  const strategies = [
    {
      title: "Social Media Marketing",
      points: [
        "Instagram & TikTok campaigns",
        "Influencer partnerships",
        "User-generated content",
        "Behind-the-scenes storytelling"
      ],
      icon: "📱"
    },
    {
      title: "Content Marketing",
      points: [
        "Blog and editorial content",
        "Sustainability stories",
        "Style guides and lookbooks",
        "Email newsletters"
      ],
      icon: "✍️"
    },
    {
      title: "Experiential Marketing",
      points: [
        "Pop-up stores",
        "Fashion events",
        "Collaborations",
        "Community workshops"
      ],
      icon: "🎯"
    }
  ];

  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Marketing Strategies</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-3 gap-8">
        {strategies.map((strategy, index) => (
          <div key={index} className="bg-gradient-to-br from-slate-50 to-white p-8 rounded-lg border border-slate-200">
            <div className="text-5xl mb-4">{strategy.icon}</div>
            <h3 className="text-2xl text-slate-900 mb-6">{strategy.title}</h3>
            <ul className="space-y-3">
              {strategy.points.map((point, idx) => (
                <li key={idx} className="text-slate-700 flex items-start gap-2">
                  <span className="text-slate-400 mt-1">→</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Customize your marketing strategies and tactics in MarketingStrategiesSlide.tsx]
        </p>
      </div>
    </div>
  );
}
