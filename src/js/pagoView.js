import { ref, computed } from 'vue';
import api from '@/config/axios.config';
import Swal from '@/config/swal.config';
import { useRouter } from 'vue-router';
export function usePayment(carrito) { const router = useRouter();
    // Datos de envío
    const direccion = ref('');
    const ciudad = ref('');
    // Datos de pago
    const tarjeta = ref('');
    const expiracion = ref('');
    const cvc = ref('');
    // Total
    const total = computed(() => carrito.value.reduce((acc, p) => acc + p.price * p.quantity, 0) );
    // Función para validar todos los campos
    const validarCampos = () => {
    if ( !direccion.value.trim() ||
        !ciudad.value.trim() ||
        !tarjeta.value.trim() ||
        !expiracion.value.trim() ||
        !cvc.value.trim() )
        {
            Swal.alert({
                type: 'error',
                title: 'Faltan datos',
                text: 'Por favor completa todos los campos requeridos'
            });
        return false;
    }
        return true;
    };
    const confirmarPago = async () => {
    // Validación de campos
    if (!validarCampos()) return;

    try {
    // Mostrar alerta de procesamiento
        await Swal.alert({
            type: 'info',
            title: 'Procesando pago',
            text: 'Espere mientras se procesa su pago...',
            showLoading: true,
            timer: 1500
        });
        // Enviar datos al backend
        await api.post('/payments', {
            userId: localStorage.getItem('userId'),
            address: direccion.value,
            city: ciudad.value,
            cardNumber: tarjeta.value,
            expirationDate: expiracion.value,
            cvc: cvc.value
        })
        // Pago exitoso
        await Swal.alert({
            type: 'success',
            title: 'Pago realizado',
            text: 'Gracias por tu compra!',
            timer: 2000
        });
        // Redirigir al home
        router.push({ name: 'Home' });
    } catch (error) {
        console.error(error);
        Swal.alert({
            type: 'error',
            title: 'Error',
            text: error.message || 'No se pudo procesar el pago'
        });
    }};
    return {
        direccion,
        ciudad,
        tarjeta,
        expiracion,
        cvc,
        total,
        confirmarPago
    };
}