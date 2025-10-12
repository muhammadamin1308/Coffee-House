// Coffee Slider Functionality

let burger = document.querySelector('#burger')
let menu = document.querySelector('#menu')

let burgerDefault = document.querySelector(".burger-default")
let burgerActive = document.querySelector(".burger-active")


burger.addEventListener("click", () => {
  if (burgerDefault.style.display === 'block') {
    burgerActive.style.display = 'block'
    burgerDefault.style.display = 'none'
  } else {
    burgerActive.style.display = 'none'
    burgerDefault.style.display = 'block'
  }

  burger.classList.toggle("open");
  menu.classList.toggle("open");
  document.body.classList.toggle("no-scroll");

})










let products = [];
let activeCategory = 'coffee'; // Default to coffee category
let isMobile = window.innerWidth <= 768;

// Load data
async function loadData() {
  try {
    const response = await fetch("products.json")
    const data = await response.json()
    products = data

    renderCategories(data);
    renderProducts(activeCategory); // default category
    setActiveCategoryButton(activeCategory)
  } catch (error) {
    console.log("Failed to load", error)
  }
}

function renderCategories(products) {
  const categories = [...new Set(products.map(p => p.category))]
  const container = document.querySelector(".tabs");

  if (!container) {
    console.error('Tabs container not found');
    return;
  }
  console.log('Found categories:', categories);
  container.innerHTML = categories.map(cat => `
    <button class="tab-button ${cat === activeCategory ? 'active' : ''}" data-category="${cat}">
      <span>${cat}</span>
    </button>
    `).join('')


  container.addEventListener('click', e => {
    const button = e.target.closest('.tab-button')
    if (button) {
      activeCategory = button.dataset.category;
      renderProducts(activeCategory);
      setActiveCategoryButton(activeCategory)
    }
  })
}


// get product image

function getProductImage(product){
  const category = product.category.toLowerCase();

  switch(category){
    case 'coffee':
      return `assets/coffee/coffee-${product.id}.jpg`
    case 'tea':
      return `assets/coffee/tea/tea-${product.id}.png`
    case 'dessert':
      return `assets/coffee/dessert/dessert-${product.id}.png`
    default: return `assets/coffee/coffee-1.jpg`
  }
}

//render all products
function renderProducts(category) {
  const container = document.querySelector(".menu-grid");

   if (!container) {
    console.error('Menu container not found');
    return;
  }

  container.innerHTML = "" //clear old content
  const filtered = products.filter(p => p.category === category) //gets filters by category from all products

  const productLimit = isMobile ? 4 : 8;
  const productsToShow = filtered.slice(0, productLimit);
  console.log(productsToShow)
  container.innerHTML = productsToShow.map(p => `
    <article class="menu-card" data-product-id="${p.id}" style="cursor: pointer;">
      <div class="menu-card-image">
        <img src="${getProductImage(p)}" alt="${p.name}" />
      </div>
      <div class="menu-card-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
      </div>
    </article>
    `).join('')
    
  // Add click event listeners to product cards
  container.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      const product = products.find(p => p.id == productId);
      if (product) {
        openModal(product);
      }
    });
  });
    
  handleLoadMoreButton(filtered, productsToShow.length);
}

function handleLoadMoreButton(filtered, currentCount) {
  // Remove existing load more button
  const existingBtn = document.querySelector(".load-more-btn");
  if (existingBtn) {
    existingBtn.remove();
  }

  // Add load more button if needed (only on mobile and if there are more than 4 products)
  if (isMobile && filtered.length > 4 && currentCount < filtered.length) {
    const loadMoreContainer = document.querySelector(".load-more-container");
    if (loadMoreContainer) {
      const btn = document.createElement("button");
      btn.className = 'load-more-btn';
      btn.innerHTML = `<img src="assets/coffee/load-more.svg" alt="Load more">`;
      
      btn.addEventListener('click', () => {
        renderAllProducts(filtered);
      });
      
      loadMoreContainer.appendChild(btn);
    }
  }
}


//render all products after load more clicked
function renderAllProducts(filtered) {
  const container = document.querySelector(".menu-grid");
  container.innerHTML = "" //clear old content

  container.innerHTML = filtered.map(p => `
    <article class="menu-card" data-product-id="${p.id}" style="cursor: pointer;">
      <div class="menu-card-image">
        <img src="${getProductImage(p)}" alt="${p.name}" />
      </div>
      <div class="menu-card-content">
        <h3>${p.name}</h3>
        <p>${p.description}</p>
        <p class="price">$${p.price}</p>
      </div>
    </article>
    `).join('')
    
  // Add click event listeners to product cards
  container.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const productId = card.getAttribute('data-product-id');
      const product = products.find(p => p.id == productId);
      if (product) {
        openModal(product);
      }
    });
  });
}

//highlight active category button
function setActiveCategoryButton(category) {
  document.querySelectorAll('.tab-button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category)  //puts proper category name to dataset
  })
}

//handle screen resize
let resizeTimeout;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(() => {
    const nowMobile = window.innerWidth <= 768;
    if (nowMobile !== isMobile) {
      isMobile = nowMobile;
      renderProducts(activeCategory);// rerender with new limit
    }
  }, 200)
})

// Modal functionality
let currentProduct = null;

function openModal(product) {
  currentProduct = product;
  
  // Populate modal with product data
  document.getElementById('modal-product-image').src = getProductImage(product);
  document.getElementById('modal-product-image').alt = product.name;
  document.getElementById('modal-product-name').textContent = product.name;
  document.getElementById('modal-product-description').textContent = product.description;
  
  // Populate size options with product-specific data
  if (product.sizes) {
    document.getElementById('size-s-text').textContent = product.sizes.s?.size || '200 ml';
    document.getElementById('size-m-text').textContent = product.sizes.m?.size || '300 ml';
    document.getElementById('size-l-text').textContent = product.sizes.l?.size || '400 ml';
    
    // Update data-price attributes
    document.querySelector('input[value="s"]').setAttribute('data-price', product.sizes.s?.['add-price'] || '0.00');
    document.querySelector('input[value="m"]').setAttribute('data-price', product.sizes.m?.['add-price'] || '0.50');
    document.querySelector('input[value="l"]').setAttribute('data-price', product.sizes.l?.['add-price'] || '1.00');
  }
  
  // Populate additive options with product-specific data
  if (product.additives) {
    document.getElementById('additive-1-text').textContent = product.additives[0]?.name || 'Sugar';
    document.getElementById('additive-2-text').textContent = product.additives[1]?.name || 'Cinnamon';
    document.getElementById('additive-3-text').textContent = product.additives[2]?.name || 'Syrup';
  }
  
  // Reset modal state
  resetModalState();
  
  // Calculate initial price
  updateTotalPrice();
  
  // Show modal
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.classList.add('active');
  document.body.classList.add('modal-open');
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.classList.remove('active');
  document.body.classList.remove('modal-open');
  currentProduct = null;
}

function resetModalState() {
  // Reset size selection to S
  document.querySelector('input[name="size"][value="s"]').checked = true;
  
  // Reset all additive selections
  document.querySelectorAll('input[name="additive"]').forEach(input => {
    input.checked = false;
  });
}

function updateTotalPrice() {
  if (!currentProduct) return;
  
  let totalPrice = parseFloat(currentProduct.price);
  
  // Add size price
  const selectedSize = document.querySelector('input[name="size"]:checked');
  if (selectedSize) {
    totalPrice += parseFloat(selectedSize.getAttribute('data-price'));
  }
  
  // Add additive prices
  const selectedAdditives = document.querySelectorAll('input[name="additive"]:checked');
  selectedAdditives.forEach(additive => {
    totalPrice += parseFloat(additive.getAttribute('data-price'));
  });
  
  // Update total price display
  document.getElementById('modal-total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

// Modal event listeners
document.addEventListener('DOMContentLoaded', () => {
  // Close modal when clicking close button
  document.getElementById('modal-close').addEventListener('click', closeModal);
  
  // Close modal when clicking overlay (but not the modal itself)
  document.getElementById('modal-overlay').addEventListener('click', (e) => {
    if (e.target === document.getElementById('modal-overlay')) {
      closeModal();
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && document.getElementById('modal-overlay').classList.contains('active')) {
      closeModal();
    }
  });
  
  // Size option change listeners
  document.querySelectorAll('input[name="size"]').forEach(input => {
    input.addEventListener('change', updateTotalPrice);
  });
  
  // Additive option change listeners
  document.querySelectorAll('input[name="additive"]').forEach(input => {
    input.addEventListener('change', updateTotalPrice);
  });
});

loadData()

