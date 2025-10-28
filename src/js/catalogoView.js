import { ref, computed, onMounted } from 'vue';
import { Modal } from 'bootstrap';
import api from '@/config/axios.config'
import Swal from '@/config/swal.config';

export function useCatalogue() {
  const searchQuery = ref('');
  const selectedCategory = ref('');
  const sortOrder = ref('');
  const currentPage = ref(1);
  const products = ref();
  const categories = ref();
  const productsPerPage = 18;
  const selectedProduct = ref(null);
  const modalInstance = ref(null);
  const productModal = ref(null);

    const loadCatalogueData = async () =>{
        try {
            const [productsRes, categoriesRes ] = await Promise.all([
                api.get('/products/getAll'),
                api.get('/categories/getAll')
            ]);
            products.value = productsRes.data.map(p => ({
                ...p,
                images: p.imageUrl ? [p.imageUrl, p.imageUrl, p.imageUrl ] : []
            }));
            categories.value = categoriesRes.data.map(cat => ({
                id: cat.id,
                name: cat.name
            }));
        } catch (error) {
            console.error("🚀 ~ loadCatalogueData ~ error:", error)
        }
    };

    const filteredProducts = computed(() => {
        let result = (products.value || []).filter(p => 
            p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );

        if (selectedCategory.value)
            result = result.filter(p => p.categoryId === selectedCategory.value);

        if (sortOrder.value === 'asc')
            result.sort((a, b) => a.price - b.price);
        else if (sortOrder.value === 'desc')
            result.sort((a, b) => b.price - a.price);

        return result;
    });

    const paginatedProducts = computed(() => {
        const start = (currentPage.value - 1) * productsPerPage;
        return filteredProducts.value.slice(start, start + productsPerPage);
    });


    const totalPages = computed(()=> Math.ceil(filteredProducts.value.length / productsPerPage));

    const showProduct = (product) => {
        selectedProduct.value = product;
        if (!modalInstance.value) {
            modalInstance.value = new Modal(productModal.value);
        }
        modalInstance.value.show();
    };

    const addToCart = async (product) => {
        try {
            const userId = (localStorage.getItem('userId') || '').trim();
            console.log('ID DEL USUSARIO:',userId)
            if (!userId){
                Swal.alert({
                    type: 'error',
                    title: 'Error',
                    text: "Error al obtener el Id de usuario porfavor intente nuevamente"
                })
                return;
            }

            await api.post(`/cart/${userId}/add`, {
                productId: product.id,
                name: product.name,
                price: product.price,
                quantity: 1,
                imageUrl: product.imageUrl
            });
            Swal.alert({
                type: 'success',
                title: 'Producto Agregado correctamente',
                text: 'Producto agregado correctamente a su carrito, puede proceder con el pago!',
                timer: 3000
            })

        } catch (error) {
            console.error("🚀 ~ addToCart ~ error:", error)
            Swal.alert({
                type: 'error',
                title: 'Error',
                text: "Ah ocurrido un error, intente nuevamente"
            })
        }
    }


    onMounted(()=>{
        loadCatalogueData();
    });

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
    addToCart
  };
}
