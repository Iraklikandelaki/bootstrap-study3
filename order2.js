// Get the current date 

  let year = document.querySelector('#year');
  
  year.innerHTML += new Date().getFullYear();





  // Cart

  let cart = {

   
    hItems : null, 
  
   
    items : {}, // Current items in cart
  
    
    products : {
      123: {
        name : "Zagareli Black",
        desc : "Greatest properly off ham exercise all.",
        color : "black",
        img : "./img/tea1.jpg",
        caffeineLvl: "Low",
        price : 550
      },
      124: {
        name : "Zagareli Black Morning",
        desc : "Unsatiable invitation its possession nor off.",
        color : "black",
        img : "./img/tea1.jpg",
        caffeineLvl: "Medium",
        price : 600
      },
      125: {
        name : "Zagareli Black Premium",
        desc : "All difficulty estimating unreserved increasing the solicitude.",
        color : "black",
        img : "./img/tea1.jpg",
        caffeineLvl: "High",
        price : 950
      },
      126: {
        name : "Zagareli Green",
        color : "green",
        desc : "Had judgment out opinions property the supplied. ",
        img : "./img/tea2.jpg",
        caffeineLvl: "Low",
        price : 550
      },
      127: {
        name : "Zagareli Green Morning",
        color : "green",
        desc : "Had judgment out opinions property the supplied. ",
        img : "./img/tea2.jpg",
        caffeineLvl: "Medium",
        price : 600
      },
      128: {
        name : "Zagareli Green Premium",
        color : "green",
        desc : "Had judgment out opinions property the supplied. ",
        img : "./img/tea2.jpg",
        caffeineLvl: "High",
        price : 1050
      },
      129: {
        name : "Zagareli Mixed",
        color : "mixed",
        desc : "Had judgment out opinions property the supplied. ",
        img : "./img/tea3.jpg",
        caffeineLvl: "Low",
        price : 850
      },
      130: {
        name : "Zagareli Mixed Morning",
        color : "mixed",
        desc : "Had judgment out opinions property the supplied. ",
        img : "./img/tea3.jpg",
        caffeineLvl: "Medium",
        price : 700
      },
      131: {
        name : "Zagareli Mixed Premium",
        color : "mixed",
        desc : "Had judgment out opinions property the supplied. ",
        img : "./img/tea3.jpg",
        caffeineLvl: "Very High",
        price : 1250
      },
    },
  
    
    save : function () {
      localStorage.setItem("cart", JSON.stringify(cart.items));
    },
  
   
    load : function () {
      cart.items = localStorage.getItem("cart");
      if (cart.items == null) { cart.items = {}; }
      else { cart.items = JSON.parse(cart.items); }
    },
    
   
    completeRmv : function () {
     
        cart.items = {};
        localStorage.removeItem("cart");
        cart.list();
        cart.cartChecker();
    },
  
    
    init : function () {
   

      cart.hItems = document.getElementById("cart-items");
      
  
      
      // LOAD CART FROM PREVIOUS SESSION
      cart.load();
      
      // LIST CURRENT CART ITEMS
      cart.list();
    },
    

    cartChecker : function(){
      let cartAmount = document.querySelector('.amount');
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { 
          empty = false; 
          break; 
        }
      }
  
     
      if (empty) {
        cartAmount.innerHTML = `0`;
      } 
    },


    // LIST CURRENT CART ITEMS 
    list : function () {
      
      cart.hItems.innerHTML = "";
      let item, part, pdt;
      let empty = true;
      for (let key in cart.items) {
        if(cart.items.hasOwnProperty(key)) { 
          empty = false; 
          break; 
        }
      }
  
      
      if (empty) {
        cart.hItems.innerHTML = `
        <div class="empty text-center font-weight-bold h5 my-4">The Cart is Empty.</div>
        `;
      } else {
        let p, total = 0, subtotal = 0;
        for (let id in cart.items) {
          // ITEM
          p = cart.products[id];

          itemContent = `
          <div class="in-cart my-4">
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <img src=${p.img} alt="" style="height: 150px; width: 150px;">
                </div>
                <div class="col-md-8">
                  <div class="item-title h6 font-weight-bold my-4">${p.name}</div>

                  <div class="input-group mb-3">
                  <span class="remove-button input-group-text" data-id=${id} style="cursor: pointer;"><i class="fas fa-trash"></i></span>
                 
                  <input type="number" class="change-quantity form-control form-control-lg rounded-0 border-0" value=${cart.items[id]} data-id=${id}>
                  <div class="incr-decr d-flex flex-column">
                  <span class="plus pb-2" data-id=${id} style="cursor: pointer;"><i class="fas fa-arrow-up"></i></span>
                  <span class="minus"  data-id=${id} style="cursor: pointer;"><i class="fas fa-arrow-down"></i></span>
                  </div>
                  </div>
                </div>
              </div>
            </div>
          `;

          
          
          subtotal = cart.items[id] * p.price;
          total += subtotal;

          cart.hItems.insertAdjacentHTML("afterbegin", itemContent);
          
          let cartAmount = document.querySelector('.amount');
        

          if (cart.items){
            
            cartAmount.innerHTML = `${total / 100}$`;
          } 
          
          
          

          

       
          let plus = document.querySelectorAll('.plus');
          plus.forEach(btn => {
            btn.addEventListener("click", cart.increment );
            
          });
       
          
          let minus = document.querySelectorAll('.minus');
          minus.forEach(btn => {
            btn.addEventListener("click", cart.decrement);
          })

          let changeQty = document.querySelectorAll(".change-quantity");
          changeQty.forEach(input => {
          input.addEventListener("change", cart.change);

          
           })


          removeBtn = document.querySelectorAll(".remove-button");
          removeBtn.forEach(btn => {
            btn.addEventListener("click", cart.remove);
          })
        }
        
  
        const emptyBtnDiv = `
        <button class="empty-button mt-5 py-2 mx-auto d-block mb-3 font-weight-bold h5 px-2">Remove Items</button>
        
        `;

       cart.hItems.insertAdjacentHTML("beforeend", emptyBtnDiv);
       const emptyBtn = document.querySelector(".empty-button");
       emptyBtn.addEventListener("click", cart.completeRmv);
  

        const checkoutTotal = `
        <button class="checkout-total py-2 mx-auto d-block font-weight-bold h5 px-2">Checkout $${total / 100}</button>
        
        
        `;

        cart.hItems.insertAdjacentHTML("beforeend", checkoutTotal);
        let totalButton = document.querySelector(".checkout-total");
        totalButton.addEventListener("click", cart.checkout);
      }
    },
  
    

    
    add : function () {
      if (cart.items[this.dataset.id] == undefined) {
        cart.items[this.dataset.id] = 1;
      } else {
        cart.items[this.dataset.id]++;
      }
      cart.save();
      cart.list();
    },
  
    // CHANGE THE QUANTITY BY TYPING THE NUMBER (INNER ARROWS ARE DISABLED IN THE CSS FILE)
    change : function () {
      if (this.value == 0) {
        delete cart.items[this.dataset.id];
      } else {
        let parsed = parseInt(this.value);
        cart.items[this.dataset.id] = parsed;

        console.log(parsed)
      }
      cart.save();
      cart.list();
    },

      // INCREMENT WITH THE ARROW-UP 
      increment : function() {
          
        cart.items[this.dataset.id]++;
        cart.save();
        cart.list();
    
      },
      // DECREMENT WITH THE ARROW-DOWN
    decrement : function() {
       

      cart.items[this.dataset.id]--;
      if(cart.items[this.dataset.id] == 0){
      delete cart.items[this.dataset.id];
     }
      
      cart.save();
      cart.list();
      cart.cartChecker();
    },
  
    
    // REMOVE A SINGLE ITEM FROM CART
    remove : function () {
      delete cart.items[this.dataset.id];
      cart.save();
      cart.list();
      cart.cartChecker();
    },
    
    // BUY
    checkout : function () {
      alert("NO BACK-END FOR THIS YET");
    }
  };

 


       


  window.addEventListener("DOMContentLoaded", cart.init);
  window.addEventListener("DOMContentLoaded", cart.cartChecker);

