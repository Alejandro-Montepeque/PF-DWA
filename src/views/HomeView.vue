<template>
  <div class="container text-center my-5">
    <h1 class="mb-3">Bienvenido a BuySmart</h1>
    <p class="mb-5">¡Aquí encontrarás todo lo que necesitas comprar!</p>

    <!-- Carrusel -->
    <div id="carouselExampleIndicators" class="carousel slide mb-5" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
      </div>
      <div class="carousel-inner rounded-4 shadow">
        <div class="carousel-item active">
          <img src="https://picsum.photos/1200/400?random=1" class="d-block w-100" alt="Banner 1">
        </div>
        <div class="carousel-item">
          <img src="https://picsum.photos/1200/400?random=2" class="d-block w-100" alt="Banner 2">
        </div>
        <div class="carousel-item">
          <img src="https://picsum.photos/1200/400?random=3" class="d-block w-100" alt="Banner 3">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

    <h2>Categorias Populares</h2>

    <!-- Categorías -->
    <div class="row justify-content-center">
      <div class="col-md-4 mb-4" v-for="(category, index) in categories" :key="index">
        <div class="card category-card h-100 shadow-sm border-0">
          <img :src="category.image" class="card-img-top" :alt="category.title">
          <div class="card-body">
            <h5 class="card-title">{{ category.title }}</h5>
            <p class="card-text text-muted">{{ category.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <h2 class="mt-5">Productos Recomendados</h2>

    <div class="row justify-content-center">
         <div class="col-md-4 mb-4" v-for="(productosRecomendados, index) in productosRecomendados" :key="index">
        <div class="card category-card h-100 shadow-sm border-0">
          <img :src="productosRecomendados.image" class="card-img-top" :alt="productosRecomendados.title">
          <div class="card-body">
            <h5 class="card-title">{{ productosRecomendados.title }}</h5>
            <p class="card-text text-muted">${{ productosRecomendados.precio }}</p>
            <button class="btn btn-secondary"><i class="fa-solid fa-cart-shopping"> </i> Agregar al carrito</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../js/homeView.js"> </script>



<style scoped>
.category-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  border-radius: 1rem;
  overflow: hidden;
}

.category-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0,0,0,0.15);
}

.card-img-top {
  object-fit: cover;
  height: 200px;
}
</style>
