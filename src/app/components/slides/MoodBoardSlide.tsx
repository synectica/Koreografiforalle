export function MoodBoardSlide() {
  const moodImages = [
    "https://images.unsplash.com/photo-1696483797754-45c7aa913724?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb29kJTIwYm9hcmQlMjBkZXNpZ258ZW58MXx8fHwxNzY2OTQ0MzEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1629030386603-84ce2892830e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFuZCUyMGlkZW50aXR5JTIwbG9nb3xlbnwxfHx8fDE3NjY5NDQzMTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1701964619775-b18422290cf9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYWJyaWMlMjB0ZXh0dXJlJTIwY2xvdGh8ZW58MXx8fHwxNzY2OTQzNTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    "https://images.unsplash.com/photo-1575111507952-2d4f371374f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGFyZ2V0JTIwbWFya2V0fGVufDF8fHx8MTc2Njk0NDMxMnww&ixlib=rb-4.1.0&q=80&w=1080"
  ];

  const colorPalette = [
    { name: "Primary", color: "#1e293b" },
    { name: "Secondary", color: "#f8fafc" },
    { name: "Accent 1", color: "#64748b" },
    { name: "Accent 2", color: "#cbd5e1" }
  ];

  return (
    <div className="w-full h-full bg-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Mood Board</h2>
      <div className="w-24 h-1 bg-slate-900 mb-8"></div>
      
      <div className="grid grid-cols-4 gap-4 mb-8">
        {moodImages.map((image, index) => (
          <div key={index} className="aspect-square overflow-hidden rounded-lg">
            <img 
              src={image} 
              alt={`Mood ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="text-2xl text-slate-900 mb-4">Color Palette</h3>
        <div className="flex gap-4">
          {colorPalette.map((item, index) => (
            <div key={index} className="flex-1">
              <div 
                className="h-24 rounded-lg mb-2"
                style={{ backgroundColor: item.color }}
              ></div>
              <p className="text-sm text-slate-700 text-center">{item.name}</p>
              <p className="text-xs text-slate-500 text-center font-mono">{item.color}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Replace mood board images and color palette in MoodBoardSlide.tsx]
        </p>
      </div>
    </div>
  );
}
