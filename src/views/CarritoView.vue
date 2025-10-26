<template>
  <div class="container my-5">
    <h1 class="mb-4">Carrito de Compras</h1>

    <div v-if="carrito.length === 0" class="alert alert-info">
      Tu carrito está vacío 😢
    </div>

    <!-- Lista de productos en el carrito -->
    <div v-else class="row g-3">
      <div class="col-12" v-for="(producto, index) in carrito" :key="producto.id">
        <div class="card p-3 d-flex flex-row align-items-center shadow-sm">
          <img :src="producto.image" alt="producto" class="img-thumbnail me-3" style="width: 100px; height: 100px; object-fit: cover;">
          
          <div class="flex-grow-1">
            <h5>{{ producto.title }}</h5>
            <p class="text-muted mb-2">Precio: ${{ producto.price.toFixed(2) }}</p>
            
            <!-- Controles de cantidad -->
            <div class="d-flex align-items-center" style="gap: 0.5rem;">
              <button class="btn btn-outline-secondary btn-sm" @click="producto.cantidad = Math.max(1, producto.cantidad - 1)">-</button>
              <input type="number" class="form-control text-center" v-model.number="producto.cantidad" min="1" style="width: 60px;">
              <button class="btn btn-outline-secondary btn-sm" @click="producto.cantidad++">+</button>
            </div>
          </div>

          <button class="btn btn-danger ms-3" @click="eliminarProducto(index)">
            <i class="fa-solid fa-trash"></i> Eliminar
          </button>
        </div>
      </div>
    </div>

    <!-- Total y proceder al pago -->
    <div v-if="carrito.length > 0" class="mt-4 text-end">
      <h4>Total: ${{ total.toFixed(2) }}</h4>
      <button class="btn btn-success btn-lg mt-2" @click="procederPago">
        Proceder al Pago
      </button>
    </div>
  </div>
</template>

<script src="../js/carritoView.js"></script>

<style scoped>
.card {
  border-radius: 1rem;
}
input[type="number"] {
  height: 36px;
}
</style>
