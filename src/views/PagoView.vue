<template>
  <div class="container my-5">
    <h1 class="mb-4 text-center">Checkout</h1>

    <div class="row">
      <!-- Formulario de envío -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="mb-3">Datos de Envío</h5>
          <div class="mb-3">
            <label class="form-label">Dirección</label>
            <input type="text" class="form-control" v-model="direccion" placeholder="Calle, número, apartamento">
          </div>
          <div class="mb-3">
            <label class="form-label">Ciudad</label>
            <input type="text" class="form-control" v-model="ciudad" placeholder="Ciudad">
          </div>
        </div>
      </div>

      <!-- Formulario de pago -->
      <div class="col-md-6 mb-4">
        <div class="card p-3 shadow-sm">
          <h5 class="mb-3">Datos de Pago</h5>
          <div class="mb-3">
            <label class="form-label">Número de tarjeta</label>
            <input type="text" class="form-control" v-model="tarjeta" placeholder="1234 5678 9012 3456" maxlength="19">
          </div>
          <div class="row">
            <div class="col-6 mb-3">
              <label class="form-label">Fecha de expiración</label>
              <input type="text" class="form-control" v-model="expiracion" placeholder="MM/AA" maxlength="5">
            </div>
            <div class="col-6 mb-3">
              <label class="form-label">CVC</label>
              <input type="text" class="form-control" v-model="cvc" placeholder="123" maxlength="3">
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Resumen del pedido -->
    <div class="card p-3 shadow-sm mb-4">
      <h5>Resumen del Pedido</h5>
      <p>Total a pagar: <strong>${{ total.toFixed(2) }}</strong></p>
      <button class="btn btn-success btn-lg" @click="confirmarPago">Confirmar Pedido</button>
    </div>
  </div>
</template>

<script setup>
import { useCart } from '../js/carritoView.js'
import { usePayment } from '../js/pagoView.js'

const { carrito } = useCart();

const {
    direccion,
    ciudad,
    tarjeta,
    expiracion,
    cvc,
    total,
    confirmarPago
    } = usePayment(carrito);
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
</style>
