export function TargetMarketSlide() {
  const targetSegments = [
    {
      title: "Demographics",
      points: [
        "Age: 25-40 years",
        "Urban professionals",
        "Middle to upper income",
        "Fashion-conscious consumers"
      ]
    },
    {
      title: "Psychographics",
      points: [
        "Values sustainability",
        "Seeks quality over quantity",
        "Appreciates minimalist design",
        "Active on social media"
      ]
    },
    {
      title: "Behaviors",
      points: [
        "Online shopping preference",
        "Brand loyalty",
        "Influencer-driven purchases",
        "Conscious consumption"
      ]
    }
  ];

  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Target Market</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-3 gap-8">
        {targetSegments.map((segment, index) => (
          <div key={index} className="space-y-4">
            <h3 className="text-2xl text-slate-900 pb-2 border-b-2 border-slate-200">
              {segment.title}
            </h3>
            <ul className="space-y-3">
              {segment.points.map((point, idx) => (
                <li key={idx} className="text-slate-700 flex items-start gap-2">
                  <span className="text-slate-400 mt-1">•</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-lg">
        <p className="text-slate-600 italic">
          [Edit: Customize your target market demographics, psychographics, and behaviors in TargetMarketSlide.tsx]
        </p>
      </div>
    </div>
  );
}
