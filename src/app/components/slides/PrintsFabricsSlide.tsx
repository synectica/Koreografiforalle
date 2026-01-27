export function PrintsFabricsSlide() {
  const fabricImages = [
    "https://images.unsplash.com/photo-1701964619775-b18422290cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWJyaWMlMjB0ZXh0dXJlJTIwY2xvdGh8ZW58MXx8fHwxNzY2OTQzNTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1720982892132-63039ca02f36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWJyaWMlMjBwYXRjaGVzJTIwdGV4dGlsZXxlbnwxfHx8fDE3NjY5NDM1ODl8MA&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const fabrics = [
    { name: "Organic Cotton", sustainability: "100%", weight: "180gsm" },
    { name: "Recycled Polyester", sustainability: "100%", weight: "140gsm" },
    { name: "Linen Blend", sustainability: "95%", weight: "220gsm" },
    { name: "Hemp Canvas", sustainability: "100%", weight: "300gsm" }
  ];

  const colorways = [
    { name: "Midnight Black", hex: "#0f172a" },
    { name: "Stone Grey", hex: "#64748b" },
    { name: "Natural Cream", hex: "#f8fafc" },
    { name: "Earth Brown", hex: "#78716c" }
  ];

  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Prints and Fabric Colourways</h2>
      <div className="w-24 h-1 bg-slate-900 mb-8"></div>
      
      <div className="grid grid-cols-2 gap-8 mb-8">
        {fabricImages.map((image, index) => (
          <div key={index} className="aspect-video overflow-hidden rounded-lg">
            <img 
              src={image}
              alt={`Fabric ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-8">
        <div>
          <h3 className="text-2xl text-slate-900 mb-4">Fabric Selection</h3>
          <div className="space-y-3">
            {fabrics.map((fabric, index) => (
              <div key={index} className="flex items-center justify-between bg-slate-50 p-4 rounded-lg">
                <span className="text-slate-900">{fabric.name}</span>
                <div className="flex gap-4 text-sm text-slate-600">
                  <span>{fabric.weight}</span>
                  <span className="text-green-600">{fabric.sustainability} Sustainable</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl text-slate-900 mb-4">Color Palette</h3>
          <div className="grid grid-cols-2 gap-4">
            {colorways.map((color, index) => (
              <div key={index} className="space-y-2">
                <div 
                  className="h-24 rounded-lg"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <p className="text-slate-900">{color.name}</p>
                <p className="text-xs text-slate-500 font-mono">{color.hex}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Add your fabric images, materials, and color palette in PrintsFabricsSlide.tsx]
        </p>
      </div>
    </div>
  );
}
