let shop = document.getElementById('shop');



let basket = JSON.parse(localStorage.getItem("Vinayak")) ||[];

//Main function to genarate the our clothCards.
let genarateShop = () => {
    return  (shop.innerHTML= shopItemData.map((x)=>{
        let {id, name,price,desc,img} = x
        let search=basket.find((x)=>x.id === id) || [];
        console.log(search);
        return `<div id=product-id-${id} class="item">
        <img width="220" height="260" src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="price-quantity">
                <h2>$ ${price}</h2>
            <div class="button">
                <i onclick="increment(${id})" class="bi bi-plus"></i>
                <div id=${id} class="quantity">
                ${search.item===undefined ? 0 : search.item}
                </div>
                <i onclick="decrement(${id})" class="bi bi-dash"></i>
            </div>
            </div>
        </div>
    </div>  
        `
    }).join(""));
};

genarateShop();

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
};

let calculation = () => {
    cartIcon = document.getElementById("cartAmount");
    //console.log(basket);
    let upadtedCartValue = (basket.map((x) => x.item).reduce((x,y) => x + y, 0));
     cartIcon.innerHTML= upadtedCartValue;
};

calculation();

