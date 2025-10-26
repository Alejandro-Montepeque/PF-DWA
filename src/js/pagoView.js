import swalConfig from '@/config/swal.config'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

export default {
  name: "PagoView",
  setup() {
    const router = useRouter()

    // Datos de envío
    const direccion = ref('')
    const ciudad = ref('')

    // Datos de pago
    const tarjeta = ref('')
    const expiracion = ref('')
    const cvc = ref('')

    // Supongamos que el carrito lo traemos de algún store o mock
    const carrito = ref([
      { title: 'Producto 1', price: 9.99, cantidad: 2 },
      { title: 'Producto 2', price: 15.5, cantidad: 1 },
    ])

    const total = computed(() =>
      carrito.value.reduce((acc, item) => acc + item.price * item.cantidad, 0)
    )

    const confirmarPago = async () => {
      // Validar datos mínimos
      if (!direccion.value || !ciudad.value || !tarjeta.value || !expiracion.value || !cvc.value) {
        swalConfig.alert({
          type: 'error',
          title: 'Faltan datos',
          text: 'Por favor completa todos los campos'
        })
        return
      }

      // Alerta de procesando
      await swalConfig.alert({
        type: 'info',
        title: 'Procesando pago',
        text: 'Espere mientras se procesa su pago...',
        showLoading: true,
        timer: 5000
      })

      // Después de 5 segundos mostrar pago exitoso
      swalConfig.alert({
        type: 'success',
        title: 'Pago realizado correctamente',
        text: 'Gracias por tu compra!',
        timer: 3000
      }).then(() => {
        router.push({ name: 'Home' })
      })
    }

    return {
      direccion,
      ciudad,
      tarjeta,
      expiracion,
      cvc,
      carrito,
      total,
      confirmarPago
    }
  }
}