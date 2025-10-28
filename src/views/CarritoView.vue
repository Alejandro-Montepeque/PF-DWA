<template>
  <div class="container my-5">
    <h1 class="mb-4">Carrito de Compras</h1>

    <div v-if="!carrito.length" class="alert alert-info">
      Tu carrito está vacío
    </div>

    <div v-else class="row g-3">
      <div v-for="producto in carrito" :key="producto.productId" class="col-12">
        <div class="card p-3 d-flex flex-row align-items-center shadow-sm">
          <img
            :src="producto.imageUrl"
            class="img-thumbnail me-3"
            style="width: 100px; height: 100px; object-fit: cover;"
          />

          <div class="flex-grow-1">
            <h5>{{ producto.name }}</h5>
            <p class="text-muted mb-2">Precio: ${{ producto.price.toFixed(2) }}</p>

            <div class="d-flex align-items-center" style="gap: 0.5rem;">
              <button class="btn btn-outline-secondary btn-sm" @click="disminuirCantidad(producto)">-</button>
              <input
                type="number"
                class="form-control text-center"
                v-model="producto.quantity"
                style="width: 60px;"
                readonly
              />
              <button class="btn btn-outline-secondary btn-sm" @click="agregarProducto(producto)">+</button>
            </div>
          </div>

          <button class="btn btn-danger ms-3" @click="eliminarProducto(producto)">
            <i class="fa-solid fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>

    <div v-if="carrito.length" class="mt-4 text-end">
      <h4>Total: ${{ total.toFixed(2) }}</h4>
      <button class="btn btn-success btn-lg mt-2" @click="procederPago">
        Proceder al Pago
      </button>
    </div>
  </div>
</template>
<script setup>
import { useCart } from "../js/carritoView.JS";

const {
  carrito,
  total,
  disminuirCantidad,
  eliminarProducto,
  procederPago,
  agregarProducto,
} = useCart();
</script>

<style scoped>
.card {
  border-radius: 1rem;
}
input[type="number"] {
  height: 36px;
}
</style>
