export default {
  name: "HomePage",
  data() {
    return {
      categories: [
        {
          title: "Tecnología",
          description: "Encuentra los últimos gadgets y dispositivos inteligentes.",
          image: "https://picsum.photos/400/250?random=4"
        },
        {
          title: "Moda",
          description: "Ropa, zapatos y accesorios de las mejores marcas.",
          image: "https://picsum.photos/400/250?random=5"
        },
        {
          title: "Hogar",
          description: "Todo lo que necesitas para tu casa y cocina.",
          image: "https://picsum.photos/400/250?random=6"
        }
      ],
      productosRecomendados: [
        {
          title: "Producto 1",
          precio: "9.99",
          image: "https://picsum.photos/400/250?random=7"
        },
        {
          title: "Producto 2",
          precio: "15.99",
          image: "https://picsum.photos/400/250?random=8"
        },
        {
          title: "Producto 3",
          precio: "16.18",
          image: "https://picsum.photos/400/250?random=9"
        }
      ]
    }
  }
}