const mainCards = document.querySelector("main");
const selectProducts = document.getElementById("select-products");

//modal
const modal = document.getElementById("myModal");
const btn = document.getElementById("myBtn");
const closeM = document.getElementsByClassName("close")[0];
const creatProduct = document.getElementById('btnLoad');
const newImage = document.getElementById('imgNew');

//filters
const filterProduct = document.getElementById("filtersP");
filterProduct.addEventListener('change', filter);


window.addEventListener('load', listSelect);
selectProducts.addEventListener('change', renderCards);

//modal

const newNameP = document.querySelector('#newNameProduct');
const newPriceP = document.querySelector('#newPriceProduct');
let id=0;

btn.addEventListener('click', openModal);
closeM.addEventListener('click', closeModal);
creatProduct.addEventListener('click', carSale);
newImage.addEventListener('change', importImg);
let selectImage = "";

//cart
const btnC = document.getElementById('cart');
const modalCart = document.getElementById('myModalCart');
modalCart.classList.add('modal');
const closeC = document.getElementsByClassName('closeMc')[0];
btn.addEventListener('click', addProduct);

btnC.addEventListener('click', openModalCart);
closeC.addEventListener('click', closeModalCart);


function filter(e){
  const respFiltersP = e.target.value === '<_1000' 
  ? fruits.filter( i=> i.price < 1000)
  : e.target.value === '>500_&_3500'
  ? fruits.filter(i => i.price >= 500 && i.price <= 1500)
  : e.target.value === 'may4000'
  ? fruits.filter(i => i.price > 4000) : null;

  mainCards.innerHTML="";
  respFiltersP.map( i => createCards(i));
  
}


function renderCards() {
  fruits.map(element =>{
    if (element.product === selectProducts.value) {
      createCards(element)
    }
  })
}

function listSelect() {
  selectProducts.innerHTML="";
  const selectProduct = document.createElement('option');
  selectProducts.appendChild(selectProduct);
  selectProduct.textContent="Select Product";
  fruits.map(element => {
    const product =  document.createElement('option');
    product.value = element.product;
    product.textContent = element.product;
    selectProducts.appendChild(product);

  });

}
function createCards(fruits) {
  const {product, image,id,price} = fruits;
  const card = document.createElement('div');
        card.classList.add('card-product');
        mainCards.appendChild(card);

  const img = document.createElement('img');
        img.classList.add('img-product');
        img.setAttribute('src',image);
        img.setAttribute('alt',product);
        card.appendChild(img);

  const h1 = document.createElement('h1');
        h1.classList.add('name-product');
        h1.textContent = product;
        card.appendChild(h1);

  const p = document.createElement('p');
        p.classList.add('price-product');
        p.textContent = price;
        card.appendChild(p);

  const btn = document.createElement('button');
        btn.classList.add('btn-add');
        btn.addEventListener('click',cart);
        btn.setAttribute('id',id);
        btn.textContent = 'Add Product';
        card.appendChild(btn);

  const btn1 = document.createElement('button');
        btn1.classList.add('btn-close');
        btn1.textContent = 'Delete';
        card.appendChild(btn1);
        btn1.addEventListener('click', event =>{
          btn1.parentElement.remove(card);
        });

}



function importImg(event) {
  const current_img =	event.target.files[0];
	const objectURL = URL.createObjectURL(current_img);
	selectImage = objectURL;
  // console.log(selectImage);
  console.log(objectURL);
  // fruits.push(newImage);
}

function carSale(){
  if(newNameP.value == "" && newPriceP.value == ""){
    alert("Complete los datos");
  }else{
    const newProducto = {
      id: id++,
      product: newNameP.value,
      price: newPriceP.value,
      image: selectImage
    }
    console.log(newProducto);
    console.log(newImage.value);
    selectProducts.innerHTML="";
    fruits.push(newProducto);
    listSelect();
    console.log(fruits);
  }
  closeModal();
}


function openModal() {
  modal.style.display = "block";
}

function closeModal(){
    modal.style.display = "none";
}

function openModalCart() {
  modalCart.style.display = "block";
}

function closeModalCart(){
    modalCart.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }

function cart(e){
  console.log(e.target.id);
  fruits.find(i =>{
    i.id === e.target.id ? addProduct(i):null; 
  })

}
let listProduct =[];
let count = 0;

function addProduct(fruits){
  const {product, image,id,price} = fruits;
  listProduct.push(id);
  listProduct.map((i) => {
    if(i === id){
      count++;
    }
  })
  
  const containerCart = document.createElement('div');
        containerCart.classList.add('modal-bodyCart');

  const contenTitle = document.createElement('div');
  const titleProduct = document.createElement('h3');
        titleProduct.classList.add('titlesCart');
        titleProduct.textContent = 'Product';
  const nameProduct = document.createElement('p');
        nameProduct.textContent = product;

  const contenPrice = document.createElement('div');
  const titlePrice = document.createElement('h3');
        titlePrice.classList.add('titlesCart');
        titlePrice.textContent = 'Price';
  const priceProduct = document.createElement('p');
        priceProduct.textContent = price;


  // const contenCan = document.createElement('div');
  // const titleCan = document.createElement('h3');
  //       titleCan.classList.add('titlesCart');
  //       titleCan.textContent = 'Quantity';
  // const canProduct = document.createElement('p');
  //       canProduct.textContent = count;

  
  const contenIgm = document.createElement('div');
  const imgProduct = document.createElement('img');
        imgProduct.classList.add('img-product-cart')
        imgProduct.setAttribute('src',image);

  const contenDele = document.createElement('div');
  const deleteCart = document.createElement('button');
        deleteCart.classList.add('btn-close');
        deleteCart.textContent = 'Delete';
        deleteCart.addEventListener('click', event =>{
          containerCart.innerHTML= "";
        });
    
          // contenCan.appendChild(titleCan);
          // contenCan.appendChild(canProduct);
          // containerCart.appendChild(contenCan);
          contenTitle.appendChild(titleProduct);
          contenTitle.appendChild(nameProduct);
          containerCart.appendChild(contenTitle);
          contenPrice.appendChild(titlePrice);
          contenPrice.appendChild(priceProduct);
          containerCart.appendChild(contenPrice);
          contenIgm.appendChild(imgProduct);
          containerCart.appendChild(contenIgm);
          contenDele.appendChild(deleteCart);
          containerCart.appendChild(contenDele);
          modalCart.appendChild(containerCart);




}