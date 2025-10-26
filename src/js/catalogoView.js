import { ref, computed } from 'vue';
import { Modal } from 'bootstrap';

export function useCatalogue(initialProducts = []) {
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const sortOrder = ref('');
  const currentPage = ref(1);
  const products = ref(initialProducts);
  const productsPerPage = 15;
  const selectedProduct = ref(null);
  const modalInstance = ref(null);
  const productModal = ref(null);

  const categories = computed(() => [...new Set(products.value.map(p => p.category))]);
  const filteredProducts = computed(() => {
    let result = products.value.filter(p =>
      p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
    if (selectedCategory.value)
      result = result.filter(p => p.category === selectedCategory.value);
    if (sortOrder.value === "asc")
      result.sort((a, b) => a.price - b.price);
    else if (sortOrder.value === "desc")
      result.sort((a, b) => b.price - a.price);
    return result;
  });

  const totalPages = computed(() => Math.ceil(filteredProducts.value.length / productsPerPage));
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * productsPerPage;
    return filteredProducts.value.slice(start, start + productsPerPage);
  });

  const showProduct = (product) => {
    selectedProduct.value = product;
    if (!modalInstance.value) {
      modalInstance.value = new Modal(productModal.value);
    }
    modalInstance.value.show();
  };

  return {
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
  };
}
