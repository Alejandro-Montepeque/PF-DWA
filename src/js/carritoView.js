import swal from '@/config/swal.config'

export default {
  name: "CarritoView",
  data() {
    return {
      carrito: [
        { id: 1, title: "Laptop Lenovo", price: 899.99, cantidad: 1, image: "https://picsum.photos/100/100?random=10" },
        { id: 2, title: "Camisa Casual", price: 29.99, cantidad: 2, image: "https://picsum.photos/100/100?random=11" },
        { id: 3, title: "Taza de Cerámica", price: 12.50, cantidad: 1, image: "https://picsum.photos/100/100?random=12" }
      ]
    };
  },
  computed: {
    total() {
      return this.carrito.reduce((acc, prod) => acc + prod.price * prod.cantidad, 0);
    }
  },
  methods: {
    eliminarProducto(index) {
      this.carrito.splice(index, 1);
    },
    procederPago() {
       swal.alert({
        type: 'info',
        title: 'Espere...',
        text: `Procesando su pago de $${this.total.toFixed(2)}`,
        showLoading: true,
        timer: 1500
      }).then(() => {
        // Redirigir al Checkout
        this.$router.push({ name: 'Checkout' })
      })
    }
  }
};