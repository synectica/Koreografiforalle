export function SustainablePackagingSlide() {
  const packagingFeatures = [
    {
      icon: "♻️",
      title: "100% Recyclable",
      description: "All packaging materials can be recycled or composted"
    },
    {
      icon: "🌱",
      title: "Biodegradable",
      description: "Plant-based materials that break down naturally"
    },
    {
      icon: "📦",
      title: "Minimal Design",
      description: "Reduced packaging waste without compromising quality"
    },
    {
      icon: "🔄",
      title: "Reusable",
      description: "Designed for second life as storage or gift packaging"
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-50 to-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Sustainable Packaging</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <p className="text-xl text-slate-700 leading-relaxed">
            Our commitment to sustainability extends beyond our products to every touchpoint 
            of the customer experience, starting with our packaging.
          </p>

          <div className="grid grid-cols-2 gap-4">
            {packagingFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg border border-slate-200">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="text-lg text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="aspect-square bg-slate-100 rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1585221330389-24fb30535ec7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHBhY2thZ2luZyUyMGVjb3xlbnwxfHx8fDE3NjY5NDQzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Sustainable packaging"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="bg-slate-900 text-white p-6 rounded-lg">
        <p className="text-lg">
          <span className="font-semibold">Materials:</span> FSC-certified paper, organic cotton bags, 
          water-based inks, and compostable mailers
        </p>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Add your packaging images and update sustainability features in SustainablePackagingSlide.tsx]
        </p>
      </div>
    </div>
  );
}
