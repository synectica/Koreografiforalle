export function OurCollectionSlide() {
  const products = [
    {
      name: "Essential Blazer",
      category: "Outerwear",
      price: "$295",
      image: "https://images.unsplash.com/photo-1672935027091-e442f174e6c8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmFtZWwlMjBwaW5zJTIwYmFkZ2VzfGVufDF8fHx8MTc2Njk0MzU4OHww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Relaxed Trousers",
      category: "Bottoms",
      price: "$185",
      image: "https://images.unsplash.com/photo-1704253801130-4ce99cd0447c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNlYmFsbCUyMGNhcHMlMjBoYXRzfGVufDF8fHx8MTc2Njk0MzU5MXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Organic Tee",
      category: "Basics",
      price: "$68",
      image: "https://images.unsplash.com/photo-1575111507952-2d4f371374f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwdGFyZ2V0JTIwbWFya2V0fGVufDF8fHx8MTc2Njk0NDMxMnww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Structured Coat",
      category: "Outerwear",
      price: "$425",
      image: "https://images.unsplash.com/photo-1762430815233-e945ec621270?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYXNoaW9uJTIwY29sbGVjdGlvbiUyMHJ1bndheXxlbnwxfHx8fDE3NjY5NDQzMTR8MA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-50 to-white p-16">
      <h2 className="text-5xl mb-4 text-slate-900">Our Collection</h2>
      <div className="w-24 h-1 bg-slate-900 mb-12"></div>
      
      <div className="grid grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="group cursor-pointer">
            <div className="aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden mb-4">
              <img 
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="space-y-1">
              <p className="text-sm text-slate-500">{product.category}</p>
              <h3 className="text-lg text-slate-900">{product.name}</h3>
              <p className="text-slate-700">{product.price}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <p className="text-slate-600 text-lg">
          Each piece is crafted with care, designed to last, and made to be loved.
        </p>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-slate-600 text-sm">
          [Edit: Add your product images, names, prices, and categories in OurCollectionSlide.tsx]
        </p>
      </div>
    </div>
  );
}
