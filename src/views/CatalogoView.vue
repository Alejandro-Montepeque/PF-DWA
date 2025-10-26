<template>
  <div class="container my-5">
    <h1 class="text-center mb-4">Catálogo de Productos</h1>

    <!-- Buscador y filtros -->
    <div class="row mb-4 g-2">
      <div class="col-md-6">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Buscar producto por nombre..."
        />
      </div>
      <div class="col-md-3">
        <select v-model="selectedCategory" class="form-select">
          <option value="">Todas las categorías</option>
          <option v-for="cat in categories" :key="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select v-model="sortOrder" class="form-select">
          <option value="">Ordenar por precio</option>
          <option value="asc">Menor a mayor</option>
          <option value="desc">Mayor a menor</option>
        </select>
      </div>
    </div>

    <!-- Lista de productos -->
    <div class="row g-4">
      <div
        class="col-md-2 col-sm-6"
        v-for="product in paginatedProducts"
        :key="product.id"
      >
      <DataCards 
        :title="product.name"
        :price="product.price"
        :image="product.images[0]"
        showDefaultButton
        buttonText="Ver detalles"
        @action="showProduct(product)"
      />
      </div>
    </div>

    <!-- Paginación -->
    <nav class="mt-4">
      <ul class="pagination justify-content-center">
        <li class="page-item" :class="{ disabled: currentPage === 1 }">
          <button class="page-link" @click="currentPage--" :disabled="currentPage === 1">
            Anterior
          </button>
        </li>

        <li
          class="page-item"
          v-for="page in totalPages"
          :key="page"
          :class="{ active: currentPage === page }"
        >
          <button class="page-link" @click="currentPage = page">{{ page }}</button>
        </li>

        <li class="page-item" :class="{ disabled: currentPage === totalPages }">
          <button
            class="page-link"
            @click="currentPage++"
            :disabled="currentPage === totalPages"
          >
            Siguiente
          </button>
        </li>
      </ul>
    </nav>

    <!-- Modal de detalles -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      aria-hidden="true"
      ref="productModal"
    >
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{ selectedProduct?.name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div class="modal-body">
            <div
              id="carouselProduct"
              class="carousel slide mb-4"
              data-bs-ride="carousel"
            >
              <div class="carousel-inner">
                <div
                  class="carousel-item"
                  v-for="(img, index) in selectedProduct?.images"
                  :key="index"
                  :class="{ active: index === 0 }"
                >
                  <img :src="img" class="d-block w-100 rounded" alt="producto" />
                </div>
              </div>
              <button
                class="carousel-control-prev"
                type="button"
                data-bs-target="#carouselProduct"
                data-bs-slide="prev"
              >
                <span class="carousel-control-prev-icon"></span>
              </button>
              <button
                class="carousel-control-next"
                type="button"
                data-bs-target="#carouselProduct"
                data-bs-slide="next"
              >
                <span class="carousel-control-next-icon"></span>
              </button>
            </div>

            <p><strong>Categoría:</strong> {{ selectedProduct?.category }}</p>
            <p><strong>Precio:</strong> ${{ selectedProduct?.price.toFixed(2) }}</p>
            <p><strong>Stock disponible:</strong> {{ selectedProduct?.stock }}</p>
            <p class="text-muted">{{ selectedProduct?.description }}</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success">Comprar ahora</button>
            <button class="btn btn-outline-secondary">Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataCards from '../components/DataCards.vue'
import { useCatalogue } from '../js/catalogoView.js'

const initialProducts = [
  {
    id: 1,
    name: 'Laptop Lenovo',
    category: 'Tecnología',
    price: 899.99,
    stock: 12,
    description: 'Laptop con procesador Intel Core i7, 16GB RAM y SSD 512GB.',
    images: [
      'https://picsum.photos/500/300?random=10',
      'https://picsum.photos/500/300?random=11',
    ],
  },
  {
    id: 2,
    name: 'Camisa Casual',
    category: 'Moda',
    price: 29.99,
    stock: 35,
    description: 'Camisa cómoda y moderna para toda ocasión.',
    images: [
      'https://picsum.photos/500/300?random=12',
      'https://picsum.photos/500/300?random=13',
    ],
  },
]

const {
  searchQuery,
  selectedCategory,
  sortOrder,
  currentPage,
  products,
  categories,
  filteredProducts,
  totalPages,
  paginatedProducts,
  selectedProduct,
  showProduct,
  productModal,
} = useCatalogue(initialProducts)
</script>
