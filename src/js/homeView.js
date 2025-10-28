import api from '../config/axios.config';

export default {
  name: "HomePage",
  data() {
    return {
      categories: [],
      productosRecomendados: [],
      userId: null
    }
  },
  methods: {
    async loadData() {
      try {
        // Obtener categorías desde la API
        const catRes = await api.get('/categories/getAll');
        this.categories = catRes.data
          .slice(0, 3) // Tomar solo las primeras 3
          .map(cat => ({
            id: cat.id,
            title: cat.name,
            description: cat.description || "",
            image: cat.imageUrl || `https://picsum.photos/400/250?random=${Math.floor(Math.random()*100)}`
          }));

        // Obtener productos desde la API
        const prodRes = await api.get('/products/getAll');
        // Mezclar productos y tomar 3 aleatorios
        const shuffledProducts = prodRes.data.sort(() => 0.5 - Math.random());
        this.productosRecomendados = shuffledProducts.slice(0, 3).map(prod => ({
          id: prod.id,
          title: prod.name,
          precio: prod.price,
          image: prod.imageUrl || `https://picsum.photos/400/250?random=${Math.floor(Math.random()*100)}`
        }));

        // Obtener primer usuario y guardar su id en localStorage
        const usersRes = await api.get('/users');
        if (usersRes.data.length > 0) {
          this.userId = usersRes.data[0].id;
          localStorage.setItem('userId', this.userId);
        }
      } catch (error) {
        console.error("Error cargando datos:", error);
      }
    },

    async addToCart(productId) {
      try {
        const id = this.userId || localStorage.getItem('userId');
        if (!id) throw new Error("Usuario no definido");
        await api.post(`/cart/${id}/add`, {
          productId,
          quantity: 1
        });
        alert("Producto agregado al carrito");
      } catch (error) {
        console.error("Error agregando al carrito:", error);
        alert("No se pudo agregar el producto al carrito");
      }
    }
  },
  mounted() {
    this.loadData();
  }
}
