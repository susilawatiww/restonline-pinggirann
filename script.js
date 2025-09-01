let cart = [];

// Filter Kategori
function filterMenu(kategori,event){
  const items=document.querySelectorAll('.menu-item');
  const buttons=document.querySelectorAll('.kategori button');
  buttons.forEach(btn=>btn.classList.remove('active'));
  event.target.classList.add('active');
  items.forEach(item=>{
    item.style.display=(kategori==='all'||item.getAttribute('data-kategori')===kategori)?'block':'none';
  });
}

// Search Menu
function searchMenu(){
  const input=document.getElementById('searchInput').value.toLowerCase();
  const items=document.querySelectorAll('.menu-item');
  items.forEach(item=>{
    let namaMenu=item.querySelector('h3').innerText.toLowerCase();
    item.style.display=namaMenu.includes(input)?'block':'none';
  });
}

// Add to Cart
function addToCart(nama,harga,imgSrc){
  let exist=cart.find(item=>item.nama===nama);
  if(exist){exist.qty+=1; exist.total=exist.harga*exist.qty;}
  else{cart.push({nama,harga,img:imgSrc,qty:1,total:harga});}
  updateCart();
}

// Update Cart
function updateCart(){
  let cartList=document.getElementById('cartItems');
  cartList.innerHTML='';
  let total=0;
  cart.forEach((item,index)=>{
    total+=item.total;
    let li=document.createElement('li');
    li.innerHTML=`<div class="cart-item">
      <img src="${item.img}" alt="${item.nama}">
      <div style="flex:1;">
        <span>${item.nama}</span><br>
        <span>Rp ${item.total}</span>
      </div>
      <div class="qty-controls">
        <button onclick="changeQty(${index},-1)">-</button>
        <span>${item.qty}</span>
        <button onclick="changeQty(${index},1)">+</button>
      </div>
      <button onclick="removeFromCart(${index})" class="remove">❌</button>
    </div>`;
    cartList.appendChild(li);
  });
  document.getElementById('cartTotal').innerText=total;
  document.getElementById('cartCount').innerText=cart.reduce((a,b)=>a+b.qty,0);
}

// Remove Item
function removeFromCart(index){cart.splice(index,1); updateCart();}

// Change Quantity
function changeQty(index,delta){
  cart[index].qty+=delta;
  if(cart[index].qty<=0){cart.splice(index,1);}
  else{cart[index].total=cart[index].harga*cart[index].qty;}
  updateCart();
}

// Toggle Cart
function toggleCart(){document.getElementById('cart').classList.toggle('active');}

// Checkout
function checkout(){
  if(cart.length===0){alert("Keranjang masih kosong!"); return;}
  let total=cart.reduce((sum,item)=>sum+item.total,0);
  alert("Pesanan berhasil! Total Rp "+total);
  cart=[]; updateCart(); document.getElementById('cart').classList.remove('active');
}
