let labal = document.getElementById('labal');
let shoppingCart = document.getElementById('shopping-cart');

//console.log(shopItemData);

let basket = JSON.parse(localStorage.getItem("Vinayak")) ||[];

let calculation = () => {
    cartIcon = document.getElementById("cartAmount");
    //console.log(basket);
    let upadtedCartValue = (basket.map((x) => x.item).reduce((x,y) => x + y, 0));
     cartIcon.innerHTML= upadtedCartValue;
};

calculation();

let generateCartItems = () => {
    if( basket.length !== 0){
        return shoppingCart.innerHTML = basket.map((x) => {
            //console.log(x);
            let {id , item} = x;
            let search = shopItemData.find((y) => y.id === id) || [];
          return `<div class="cart-item">

          
             <img  height="120" width="300" src=" ${search.img}" alt="" />

             
             <div class="details">
             <div class="title-price-x">
             <h4>
             <p class="name" >${search.name}</p>
             </h4>
             <p class="price"> $ ${search.price}</p>
             <i onclick=removeItem(${id}) class="bi bi-x"></i>

             <div class="dash"></div>
             <i onclick="increment(${id})" class="bi bi-plus"></i>
             <div id=${id} class="quantity">${item}</div>
              
             <i onclick="decrement(${id})" class="bi bi-dash"></i>
         </div>
             </div>

             <div class="buttons">
             
             </div>

             <h3></h3>
           
          </div>`;
        }).join("");
    }
    else{
        shoppingCart.innerHTML = ``;
        labal.innerHTML=` 
        <h2>Cart is empty</h2>
        <a href="index.html">
        <button class="HomeBtn">Back to Home</button>
        </a>`;
    }
};

generateCartItems();

let increment=(id)=>{
    let selectedItem = id;
    //console.log(selectedItem);

    let search = basket.find((x)=> x.id === selectedItem.id);
    
    if(search === undefined) {
        basket.push({
            id:selectedItem.id,
            
            item:1,
        });
        //console.log(id);
    }
   
    else{
        search.item += 1;
    }

     update(selectedItem.id);

     localStorage.setItem("Vinayak" , JSON.stringify(basket));

 //console.log(basket);
};


let decrement= (id) => {
    let selectedItem = id;
    //console.log(selectedItem);
    let search = basket.find((x)=> x.id === selectedItem.id);
     
    if(search === undefined) return;
    else if(search.item === 0) return;
    else{
        search.item -= 1;
    }

    localStorage.setItem("Vinayak" , JSON.stringify(basket));

    update(selectedItem.id);

    basket= basket.filter((x) => x.item !== 0);
    generateCartItems();
    localStorage.setItem("Vinayak" , JSON.stringify(basket));

 //console.log(basket);

};

let update = (id) => {
    // console.log(id);
   let search = basket.find((x) => x.id === id);
   
   console.log(search.item); //this console print number of added or decresed count on console and below innerHTML actually update this value on the screen.
 //First check is id is null if not then attache the number of item to element to actually print on the screen.
 let element = document.getElementById(id);
 if (element !== null) {
   element.innerHTML = search.item;
 } else {
   console.log("Element with id '" + id + "' not found.");
 }
 
     calculation();
     TotalAmount();
 };

 let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    TotalAmount();
    calculation();
    localStorage.setItem("Vinayak" , JSON.stringify(basket));
 }

 let TotalAmount = () => {
    if(basket.length !== 0) {
     let amount = basket.map((x) => 
     {
        let {item, id} = x;
        let search = shopItemData.find((y)=> y.id === id) || [];
         return (item) * (search.price);
     }).reduce((x,y)=> x+y ,0);
     labal.innerHTML=`<h2 class="TotalBill">Total Bill = $ ${amount}</h2>
     <button class="checkout">Checkout</button>
     <button onclick="clearCart()" class="removeAll">Clear Cart</button>
     `;


     console.log(amount);
 }else return;
};

TotalAmount();



let clearCart = () => {
        basket = [];
        generateCartItems();
         calculation();
        localStorage.setItem("Vinayak" , JSON.stringify(basket));
};
