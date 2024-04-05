const menu = document.getElementById ("menu")
const cartBtn = document.getElementById ("cart-btn")
const cartModal = document.getElementById ("cart-modal")
const cartItemsContainer = document.getElementById ("cart-items")
const cartTotal = document.getElementById ("cart-total")
const checkoutBtn = document.getElementById ("checkout-btn")
const closeModalBtn = document.getElementById ("close-modal-btn")
const cartCounter = document.getElementById ("cart-count")
const addressInput = document.getElementById ("address")
const addressWarn = document.getElementById ("address-warn")
const confimationName= document.getElementById ("conf-name")
const nameWarn = document.getElementById ("name-warn")
  //add listing

let cart = [];
//Modifications const

//Abrir o carrinho
cartBtn.addEventListener ("click",function () {
    cartModal.style.display = "flex"
})
//Fechar o carrinho
cartModal.addEventListener ("click",function (event) {
    if (event.target == cartModal) {
        cartModal.style.display = "none"
    }
})
//fechar pelo button ''fechar''
closeModalBtn.addEventListener ("click",function () {
    cartModal.style.display = "none"
})

menu.addEventListener("click",function(event){
    let parentButton=event.target.closest(".add-to-cart-btn")
    if(parentButton){
       const name = parentButton.getAttribute("data-name")
       const price = parseFloat(parentButton.getAttribute("data-price"))

       //adicionar no carrinho
    addToCart(name,price)   

    }
    

})

///functions

function addToCart(name, price){
    const existingItem = cart.find(item=> item.name === name)

    if(existingItem){
        existingItem.quantity += 1;
    }else{
        cart.push({
            name: name,
            price: price,
            quantity: 1,
        })
    }
    updateCartModal()
}

//atualizando o carrinho

function updateCartModal(){
    cartItemsContainer.innerHTML="";
    let total = 0;
    
    cart.forEach(item => {
     const cartItemElement = document.createElement("div");
       cartItemElement.classList.add("flex","justify-between","mb-4","flex-col")
     
       cartItemElement.innerHTML=`
        <div class="flex items-center justify-between">
     
            <div>
            <p class="font-medium">${item.name}</p>
            <p class="font-normal"> Qtd : ${item.quantity}</p>
            <p class="font-medium mt-2">R$${item.price.toFixed(2)}</p>
            </div>
            
            <button class="remove-from-btn" data-name="${item.name}">X</button>
            
     
     
     
     
        </div>
     `
        total += item.price * item.quantity;

        
    cartItemsContainer.appendChild(cartItemElement)
     
    })
    cartTotal.textContent = total.toLocaleString("pt-BR",{
        style: "currency",
        currency: "BRL"
    });
    cartCounter.innerHTML = cart.length;
}
//remover itens 

cartItemsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains("remove-from-btn")){
        const name = event.target.getAttribute("data-name")
        
    removeItemCart(name);
    }   
})

function removeItemCart(name){
    const index= cart.findIndex(item => item.name === name);
    
    if(index !== -1){
        const item = cart[index];
      if(item.quantity > 1){
        item.quantity -= 1;
    updateCartModal();
        return;
      }
    cart.splice(index, 1); 
    updateCartModal();
    }

}
//confirmaçao de end
addressInput.addEventListener("input",function(event){
    let inputValue = event.target.value;
    if(inputValue!=="")
    addressInput.classList.remove("border-red-500")
    addressWarn.classList.add("hidden")
})

 //confirmaçao de nome

 confimationName.addEventListener("input",function(event){
    let inputValue = event.target.value;
    if(inputValue!=="")
    confimationName.classList.remove("border-red-500")
    nameWarn.classList.add("hidden")
})
//checkout button name
checkoutBtn.addEventListener("click",function(){
if(cart.length===0)
    return ;
    if(confimationName.value === ""){
        nameWarn.classList.remove("hidden");
        confimationName.classList.add("border-red-500")
        updateCartModal();
    return;
 }
})

//checkoutbuton endereço
checkoutBtn.addEventListener("click",function(){

    //verificando se esta aberto
   //const isOpen = checkOpen();
   //if(!isOpen){
    //   Toastify({
  //text: "Estamos Fechados no Momento",
  //duration: 3000, 
  //close: true,
  //gravity: "top", // `top` or `bottom`
  //position: "right", // `left`, `center` or `right`
  //stopOnFocus: true, // Prevents dismissing of toast on hover
  //style: {
  //background: "linear-gradient(to right, #ef4444, #96c93d)",
  //}
 //}).showToast();
//return;
 
   if(cart.length===0)
    return ;
    if(addressInput.value === ""){
        addressWarn.classList.remove("hidden");
        addressInput.classList.add("border-red-500")
        updateCartModal();
    return;
 }

 // enviar para api do whatss

const cartItems=cart.map((item)=>{
    return (
       ` ${item.name} Quantidade: (${item.quantity}) Preço:R$${item.price} |`
    )
}).join("")

const message= (encodeURIComponent)(cartItems)
const phone = "15998315479"

window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value} | Nome: ${confimationName.value} `,"_blank")

cart=[];
updateCartModal();
})


//Caso vc tenha um horario de funcionamento:

function checkOpen(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 22 && hora< 22  ;
}

const spanItem=document.getElementById("date-span");
const isOpen = checkOpen();

if(isOpen){
    spanItem.classList.remove("bg-red-400");
    spanItem.classList.add("bg-green-600")
}else{
    spanItem.classList.remove("bg-green-600")
    spanItem.classList.add("bg-red-400")
}