<template>
  <nav class="navbar navbar-expand-md bg-primary px-3">
    <a class="navbar-brand" href="#" >
      <i class="fa-solid fa-shop me-2 d-md-none"></i>
      BuySmart
    </a>

    <!-- Botón hamburguesa solo visible en móvil -->
    <button
      class="navbar-toggler d-md-none"
      type="button"
      data-bs-toggle="offcanvas"
      data-bs-target="#offcanvasNavbar"
      aria-controls="offcanvasNavbar"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <!-- Menú horizontal para desktop -->
    <div class="collapse navbar-collapse d-none d-md-flex justify-content-end">
      <ul class="navbar-nav">
        <li class="nav-item">
          <a class="nav-link" href="/">Inicio</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Catalogue">Catalogo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/Shop">Carrito</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/UserInfo">Usuario</a>
        </li>
      </ul>
    </div>

    <!-- Offcanvas lateral para móvil -->
    <div
      class="offcanvas offcanvas-end bg-primary d-md-none"
      tabindex="-1"
      id="offcanvasNavbar"
      aria-labelledby="offcanvasNavbarLabel"
    >
      <div class="offcanvas-header">
        <h5 class="offcanvas-title text-white" id="offcanvasNavbarLabel">Menú</h5>
        <button
          type="button"
          class="btn-close btn-close-white"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>

      <div class="offcanvas-body">
        <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
          <li class="nav-item">
            <a class="nav-link active text-white" href="/">
              <i class="fa-solid fa-house me-2"></i> Inicio
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Catalogue">
              <i class="fa-solid fa-folder-open me-2"></i> Catalogo
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/Shop">
              <i class="fa-solid fa-cart-shopping me-2"></i> Carrito
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/UserInfo">
              <i class="fa-solid fa-user me-2"></i> Usuario
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
a{
  color: white
}
/* Offcanvas ancho reducido al 25% solo en móvil */
@media (max-width: 767.98px) {
  .offcanvas.offcanvas-end {
    width: 100% !important;
    max-width: 35% !important;
  }

  .offcanvas-body {
    padding: 1rem;
  }
}
</style>
