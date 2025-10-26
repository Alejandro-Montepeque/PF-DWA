<template>
  <div class="card base-card h-100 shadow-sm" @click="handleClick">
    <!-- Imagen -->
    <img
      v-if="image"
      :src="image"
      class="card-img-top"
      :alt="title"
    />

    <div class="card-body text-center">
      <!-- Título -->
      <h5 class="card-title">{{ title }}</h5>

      <!-- Subtítulo / Descripción corta -->
      <p v-if="subtitle" class="text-muted small mb-2">{{ subtitle }}</p>

      <!-- Precio (si aplica) -->
      <p v-if="price !== null" class="text-success fw-bold mb-2">
        ${{ price.toFixed(2) }}
      </p>

      <!-- Slot para botones o contenido extra -->
      <slot name="actions">
        <button
          v-if="showDefaultButton"
          class="btn btn-outline-primary btn-sm"
          @click.stop="handleClick"
        >
          {{ buttonText }}
        </button>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DataCards",
  props: {
    title: String,
    subtitle: String,
    image: String,
    price: {
      type: Number,
      default: null,
    },
    showDefaultButton: {
      type: Boolean,
      default: false,
    },
    buttonText: {
      type: String,
      default: "Ver más",
    },
  },
  emits: ["action"],
    methods: {
        handleClick() {
            this.$emit("action");
        },
    },
};
</script>

<style scoped>
.base-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-radius: 1rem;
  overflow: hidden;
  cursor: pointer;
}
.base-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}
.card-img-top {
  height: 200px;
  object-fit: cover;
}
</style>
