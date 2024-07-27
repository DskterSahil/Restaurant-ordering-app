import { menuArray } from '/data.js'

const menuEL = document.getElementById('menu')
const addBtnEl = document.getElementById('add-btn')
const checkoutEl = document.getElementById('checkout-container')
const checkoutClass = document.querySelector('.checkout-container')
const totalPriceEl = document.getElementById('total-price')
const removeBtn = document.getElementById('remove-btn')
const formContainer = document.getElementById('form-container')

let totalPrice = 0
let orderArray = []


document.addEventListener('click', function(e){
       if(e.target.dataset.id){
        addItemToArray(e.target.dataset.id)
       }

       if(e.target.dataset.removeId){
        removeItemFromArray(e.target.dataset.removeId)
       }
       if(e.target.id === 'checkout-btn'){
         checkoutHandle()
       }
       if(e.target.id === 'pay-btn'){
            e.preventDefault()
            payHandle()
       }
       if(e.target.id === 'remove-modal'){
        removeForm()
       }
})


function addItemToArray(id){
    const targetItemObj = menuArray.filter(function(item){
        return item.id == id
    })[0]
    if(!orderArray.includes(targetItemObj)){
        orderArray.push(targetItemObj)
        totalPrice += targetItemObj.price
    }
    
    
    renderCheckout()
    renderOrderItems()
}

function removeItemFromArray(id) {
    let targetItemObj = orderArray.find(item => item.id == id)

    if (targetItemObj) {
        orderArray.splice(orderArray.indexOf(targetItemObj),1)
        totalPrice -= targetItemObj.price;
       
    }
   
    renderCheckout()
    renderOrderItems()
    
}

function getMenuHTML(array){
    return array.map(function(item){
      return  `<div class="menu-container">
        <div class="item-graphic">
            ${item.emoji}
        </div>
        <div class="item-details">
            <p class="item-name">${item.name}</p>
            <p class="item-ingredients">${item.ingredients.join(' ')}</p>
            <p class="item-price">$${item.price}</p>
        </div>
        <div class="add-btn-container">
            <button id="add-btn" data-id= "${item.id}">+</button>
        </div>
    </div>`
    })

}

function renderOrderItems() {
    const orderContainer = document.getElementById('order-container')
    orderContainer.innerHTML = ''

    orderArray.forEach(item => {
        orderContainer.innerHTML += `
            <div class="selected-item-container">
                <div class="selected-name-div">
                    <p class="selected-item-name">${item.name}</p> 
                    <button class="remove-btn" data-remove-id='${item.id}'>remove</button>  
                </div>
                <div class="selected-price-div">
                    <p class="selected-item-price">$${item.price}</p>
                </div>          
            </div>
        `
    })
    
}

function renderCheckout() {
    if (orderArray.length === 0) {
        checkoutEl.style.display = 'none'
    } else {
        checkoutEl.style.display = 'block'
        checkoutEl.innerHTML = `
        <div class='checkout-styler'>
            <div class="checkout-title">
                <p>Your Order</p>
            </div>

            <div class="order-container" id="order-container"></div> 

            <div class="total-container">
                <div class="total-details">
                    <p class="total-order">Total</p>
                </div>
                <div class="total-price">
                    <p id="total-price">$${totalPrice}</p>
                </div>
            </div>
            
            <div class="checkout-btn-container">
                <button class="checkout-btn" id='checkout-btn'>Complete Order</button>
            </div>
        </div>`
    }
}

function checkoutHandle(){
    document.querySelector('.paymentBox-container').style.display = 'block'
}

function payHandle(){
    document.querySelector('.paymentBox-container').style.display = 'none'
    // document.getElementById('form-container').reset();
    document.getElementById('thankyou').style.display = 'block'


}

function removeForm(){
    document.querySelector('.paymentBox-container').style.display = 'none'

}

function render(){
    menuEL.innerHTML = getMenuHTML(menuArray)
    
}

render()
