export function CommunicationsPlanSlide() {
  const channels = [
    { name: "Instagram", frequency: "Daily", content: "Product shots, Stories, Reels" },
    { name: "TikTok", frequency: "3x/week", content: "Trend videos, BTS content" },
    { name: "Email", frequency: "Weekly", content: "Newsletter, Promotions" },
    { name: "Website Blog", frequency: "2x/month", content: "Style guides, Sustainability" },
    { name: "PR", frequency: "Monthly", content: "Press releases, Media kits" }
  ];

  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Communications Plan</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="mb-8">
        <h3 className="text-3xl text-slate-900 mb-6">Channel Strategy</h3>
        <div className="space-y-4">
          {channels.map((channel, index) => (
            <div key={index} className="flex items-center gap-6 bg-slate-50 p-6 rounded-lg">
              <div className="w-1/4">
                <p className="text-xl text-slate-900">{channel.name}</p>
              </div>
              <div className="w-1/4">
                <p className="text-sm text-slate-500">Frequency</p>
                <p className="text-slate-800">{channel.frequency}</p>
              </div>
              <div className="w-1/2">
                <p className="text-sm text-slate-500">Content Type</p>
                <p className="text-slate-800">{channel.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-lg">
          <h4 className="text-xl mb-3">Key Message</h4>
          <p>Sustainable luxury that doesn't compromise on style or ethics.</p>
        </div>
        <div className="bg-slate-100 p-6 rounded-lg">
          <h4 className="text-xl mb-3 text-slate-900">Tone of Voice</h4>
          <p className="text-slate-700">Sophisticated, authentic, inspiring, and conscious.</p>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Update communication channels, frequencies, and messaging in CommunicationsPlanSlide.tsx]
        </p>
      </div>
    </div>
  );
}
