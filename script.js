//função do menu
const menuToggle = document.getElementById('menu-toggle');
const menu = document.querySelector('.menu');
let cart = JSON.parse(localStorage.getItem('cart')) || [];
menuToggle.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Função de formulario 
const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
  event.preventDefault(); 
  if (validateForm()) {
    alert("Formulário enviado com sucesso!");
  }
});
function validateForm() {
    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const assunto = document.getElementById('assunto').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();
    
   let errors = [];
    if (nome === "") {
      errors.push("O campo Nome é obrigatório.");
    }
    
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (email === "") {
      errors.push("O campo Email é obrigatório.");
    } else if (!emailRegex.test(email)) {
      errors.push("O formato do Email é inválido.");
    }
    
    if (assunto === "") {
      errors.push("O campo Assunto é obrigatório.");
    }
    
    if (mensagem === "") {
      errors.push("O campo Mensagem é obrigatório.");
    } else if (mensagem.length < 10) {
      errors.push("A mensagem deve conter pelo menos 10 caracteres.");
    }
    
    if (errors.length > 0) {
      alert(errors.join("\n"));
      return false;
    }
    
    return true;
  }


//Script do carrinho de compras

document.addEventListener('DOMContentLoaded', function() {
  cart = JSON.parse(localStorage.getItem('cart')) || [];
  updateCart();
});


//Função para atualizar e minimizar o carrinho
function toggleCart() {
  const cartSidebar = document.getElementById('cartSidebar');
  cartSidebar.classList.toggle('minimized');
  updateCart(); 
  
}

// Função para atualizar o contador do carrinho
function updateCartCount() {
  const cartCount = document.getElementById('cartCount');
  cartCount.textContent = cart.length;
}

// Função para adicionar um item ao carrinho
function addToCart() {
var a =  document.querySelector(".product img").alt;
var priceText = document.querySelector(".product-details p:nth-of-type(5)").textContent;
var price = priceText.replace("Preço: R$ ", "").replace(/\./g, "").replace(",", ".");
console.log(price); 
console.log(a);
  const product = {
    name: a,
    price: parseFloat(price)
  };

  cart.push(product);
  
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();

  
  const cartSidebar = document.getElementById('cartSidebar');
  if (cartSidebar.classList.contains('minimized') ) {
    cartSidebar.classList.remove('minimized');
    console.log("Script.js carregado!")
  }
  alert(product.name + " adicionado ao carrinho!");
}

// Função para atualizar a exibição dos itens do carrinho
function updateCart() {
  const cartItems = document.getElementById('cartItems');
  cartItems.innerHTML = ""; // Limpa a lista atual
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement('div');
    itemDiv.className = "cart-item";

    const itemText = document.createElement('span');
    itemText.textContent = `${item.name} - R$ ${item.price.toLocaleString('pt-BR')}`;

    // Botão para remover o item
    const removeBtn = document.createElement('button');
    removeBtn.textContent = "Remover";
    removeBtn.onclick = function() {
      removeFromCart(index);
    };

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(removeBtn);
    cartItems.appendChild(itemDiv);
  });

  // Atualiza o total do carrinho
  const cartTotal = document.getElementById('cartTotal');
  cartTotal.innerHTML = `<strong>Total:</strong> R$ ${total.toLocaleString('pt-BR')}`;
  updateCartCount();
}

// Função para remover um item do carrinho
function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCart();
}

document.addEventListener('DOMContentLoaded', function() {
  updateCart();
});




