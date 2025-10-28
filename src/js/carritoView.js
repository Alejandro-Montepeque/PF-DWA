import { ref, computed, onMounted } from 'vue';
import api from '@/config/axios.config'
import Swal from '@/config/swal.config';
import { useRouter } from 'vue-router';

export function useCart(){
    const carrito = ref([]);
    const loading = ref(false);
    const router = useRouter();
    const userId = ref(localStorage.getItem("userId")?.trim() || "");

    const total = computed (()=>
        carrito.value.reduce((acc, p) => acc + p.price * p.quantity, 0
    ));

    const obtenerCarrito = async ()=> {
        if (!userId.value) return;

        try {
            loading.value = true;
            const { data } = await api.get(`/cart/${userId.value}`);
            carrito.value = data.items || [];

        } catch (error){
            console.error("🚀 ~ obtenerCarrito ~ error:", error)
            Swal.alert({
                type: "error",
                title: "Error",
                text: "No se pudo cargar tu carrito.",
            });
        } finally {
            loading.value = false;
        }
    }

    /** Agregar producto o aumentar cantidad */
    const agregarProducto = async (producto) => {
    try {
      await api.post(`/cart/${userId.value}/add`, {
        productId: producto.productId,
        name: producto.name,
        price: producto.price,
        quantity: 1,
        imageUrl: producto.imageUrl,
      });
      await obtenerCarrito();
      Swal.alert({
        type: "success",
        title: "Producto agregado",
        text: `${producto.name} se añadió al carrito`,
        timer: 2000,
      });
    } catch (error) {
      console.error("Error al agregar producto:", error);
    }
  };

  /** Disminuir cantidad */
  const disminuirCantidad = async (producto) => {
    try {
      await api.post(`/cart/${userId.value}/remove`, {
        productId: producto.productId,
        quantity: 1,
      });
      await obtenerCarrito();
    } catch (error) {
      console.error("Error al disminuir cantidad:", error);
    }
  };

  /** Eliminar producto */
  const eliminarProducto = async (producto) => {
    try {
      await api.delete(`/cart/${userId.value}/delete/${producto.productId}`);
      await obtenerCarrito();
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  /** Vaciar carrito */
  const limpiarCarrito = async () => {
    try {
      await api.delete(`/cart/${userId.value}/clear`);
      carrito.value = [];
      Swal.alert({
        type: "success",
        title: "Carrito vaciado",
        text: "Tu carrito ha sido vaciado correctamente.",
      });
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
    }
  };

  const procederPago = () => {
    Swal.alert({
      type: "info",
      title: "Procesando...",
      text: `Procesando tu pago de $${total.value.toFixed(2)}`,
      showLoading: true,
      timer: 1500,
      timerProgressBar: true,
      allowOutsideClick: false,
    });
    router.push({ name: 'Checkout' });
  };

  onMounted(() => obtenerCarrito());

  return {
    carrito,
    total,
    loading,
    obtenerCarrito,
    agregarProducto,
    disminuirCantidad,
    eliminarProducto,
    limpiarCarrito,
    procederPago,
  };
}