import { fetchAPI } from './api.js'
import {loadContainers,loadCards,loadElements, loadBlock} from './loadingElements.js'
import {discountedPopular} from './miscellaneous.js'
// DEFINITIONS
let shoppingProducts = []
let locationAddress = ""
let statusProductSlider1 = 0
let statusProductSlider2 = 0
let statusProductSlider3 = 0
let cardsAmount = 4
//LOADED BY DEFAULT
//this checks out if there's something in the local storage
document.addEventListener('DOMContentLoaded', async () => {
    //Definitions
    let dataAPI
    let startCards = 0
    let dummyCard
    //loads local storage
    if (localStorage.getItem("productsTiendita") !== null) {
        shoppingProducts = JSON.parse(localStorage.getItem("productsTiendita"))
    }
    if (localStorage.getItem("addressTiendita") !== null) {
        locationAddress = localStorage.getItem("addressTiendita")
    }
    //update number in cart
    updateCart()
    loadAddress()

    dataAPI = await fetchAPI('https://tienditaapp.herokuapp.com/products')

    //load cards
    loadCards(discountedPopular(dataAPI)[0],cardsAmount,statusProductSlider1,".productSlider1")
    loadCards(discountedPopular(dataAPI)[1],cardsAmount,statusProductSlider2,".productSlider2")
    //load dummycard in modal 2
    dataAPI[0].quantity = 1
    dummyCard = dataAPI[0] 
    loadCards([dummyCard],1,0,".product-card-main")
    //load shopping cart
    loadCart()
    //load suggested in modal 2
    loadCards(discountedPopular(dataAPI)[0],cardsAmount,statusProductSlider3,".productSlider3")
    //load elements
    loadElementsMain(dataAPI,shoppingProducts)
})


function addEventListenersModal2(dataAPI){
    let plusMinusModal= document.querySelector(".plusminus")
    let addButton = document.querySelector(".btn-add-modal-2")
    plusMinusModal.addEventListener('click',e => clickPlusMinus(e))
    addButton.addEventListener('click',e => clickButtonSet(e,dataAPI))
}

function loadElementsMain(dataAPI) {
    //load elements
    let mainSliderContainer = document.querySelector(".mainSlider")
    let buttonShopping = document.getElementById("shop")
    let productSlider3main = document.querySelector(".producSlider3main")
    let cartContainer = document.querySelector(".cart-container")
    let addressInput = document.querySelector(".address-input")
    let searchButton = document.querySelector('.search-btn')

    //add event listeners
    //event listeners of modal 2
    addEventListenersModal2(dataAPI)
    //unchanged event listeners until loading
    buttonShopping.addEventListener('click', () => clickCart(shoppingProducts))
    mainSliderContainer.addEventListener('click',e => clickMainSlider(e,dataAPI)) 
    productSlider3main.addEventListener('click',e => clickModalSlider(e,dataAPI)) 
    cartContainer.addEventListener('click',e => clickPlusMinusId(e))
    addressInput.addEventListener('input',addressInputListener)
    searchButton.addEventListener('click',clickSearch)
} 

// HANDLING EVENT LISTENERS
const clickSearch = () => {
    let addressInput = document.querySelector(".address-input")
    let addresShow = document.querySelector(".address")
    addresShow.innerHTML = addressInput.value
    locationAddress = addressInput.value
    localStorage.setItem("addressTiendita",locationAddress)
    window.location.href = "#"
}

function addressInputListener() {
    let searchButton = document.querySelector('.search-btn')
    if (this.value === "") {searchButton.disabled = true; return null}
    searchButton.disabled = false
}


function clickMainSlider(e,dataAPI) {
    // DEFINITIONS
    let currentProduct , id , targetId, discountedItems, popularItems
    //get id
    targetId = e.target.id
    if (targetId === "") return null
    //getting target Id
    if (targetId.match(/left/) || targetId.match(/right/)){
        if (targetId.match(/ofertas/)){
            if (statusProductSlider1 === 0) statusProductSlider1 = 4
            else statusProductSlider1 = 0
            loadCards(discountedPopular(dataAPI)[0],cardsAmount,statusProductSlider1,".productSlider1")
            return null
        }
        if (targetId.match(/populares/)){
            if (statusProductSlider2 === 0) statusProductSlider2 = 4
            else statusProductSlider2 = 0
            loadCards(discountedPopular(dataAPI)[1],cardsAmount,statusProductSlider2,".productSlider2")
            return null
        } 
    }
    id = targetId.match(/\d{1,}/)
    id = id[0]
    currentProduct = setUpCurrentProduct(id,dataAPI)
    //rendering out the card
    loadCards(currentProduct,1,0,".product-card-main");
    [discountedItems, popularItems]=discountedPopular(dataAPI);
    //Check what kind of items to load
    if (currentProduct[0].discount === "") {
        loadCards(popularItems,4,0,".productSlider3")
        addEventListenersModal2(dataAPI)
        return null
    }
    loadCards(discountedItems,4,0,".productSlider3")
    addEventListenersModal2(dataAPI)
}

function clickModalSlider(e,dataAPI) {
    let currentProduct , id , targetId, discountedItems
    //get id
    targetId = e.target.id
    console.log(targetId)
    if (targetId === "") return null
    if (targetId.match(/left/) || targetId.match(/right/)){
        if (statusProductSlider3 === 0) statusProductSlider3 = 4
        else statusProductSlider3 = 0
        loadCards(discountedPopular(dataAPI)[1],cardsAmount,statusProductSlider3,".productSlider3")
        return null
    }
    //getting target Id
    id = targetId.match(/\d{1,}/)
    id = id[0]
    currentProduct = setUpCurrentProduct(id,dataAPI)
    currentProduct[0].quantity = 1
    loadCards(currentProduct,1,0,".product-card-main")
    addEventListenersModal2(dataAPI)
}

function clickCart(shoppingProducts) {
    let productsAmount = shoppingProducts.length
    if (shoppingProducts.length !== 0){
        loadCart()
    }
}

//
function clickPlusMinusId(e){
    //definition
    let quantityNumber, quantityString, quantityChange,selector
    let classNamePM = e.target.className
    let id = (e.target.id).match(/\d+/)[0]
    let currentProduct
    if (classNamePM.match(/(plus|minus)/) === null) {return null}
    currentProduct = setUpCurrentProduct(id,shoppingProducts)
    selector = ".quantityChange"+id
    quantityChange = document.querySelector(selector)
    quantityString = quantityChange.innerHTML.match(/\d{1,}/)
    quantityNumber = parseInt(quantityString[0])

    if (classNamePM.match(/plus/) !== null) {
        quantityNumber +=1
    }
    else {
        quantityNumber -=1
        if (quantityNumber <= 0) {
            deleteProductFunction(id)
            loadCart()
            return null
        }
    }
    currentProduct[0].quantity = quantityNumber
    quantityChange.innerHTML = quantityChange.innerHTML.replace(quantityString,quantityNumber.toString())
    setProductFunction(currentProduct[0])
    loadCart()
}

function clickPlusMinus(e){
    //get the class name
    //definition
    let quantityNumber, quantityString, quantityChange
    let classNamePM = e.target.className
    let id = (e.target.id).match(/\d+/)
    //checks if the object is a plus or minus object and load corresnponding element according to selection
    if (classNamePM.match(/(plus|minus)/) === null) return null

    quantityChange = document.querySelector(".quantityChange")
    quantityString = quantityChange.innerHTML.match(/\d{1,}/)
    quantityNumber = parseInt(quantityString)
    
    if (classNamePM.match(/plus/) !== null) quantityNumber +=1
    else {
        quantityNumber -=1
        if (quantityNumber < 0) quantityNumber = 0
    }
    quantityChange.innerHTML = quantityChange.innerHTML.replace(quantityString,quantityNumber.toString())
}
function clickButtonSet(e,dataAPI){
    let targetId,id,setQuantity,currentProduct,quantityString, quantityChange
    targetId = e.target.id
    id = targetId.match(/\d{1,}/)
    quantityChange = document.querySelector(".quantityChange")
    quantityString = quantityChange.innerHTML.match(/\d{1,}/)
    setQuantity = parseInt(quantityString)
    if (setQuantity === 0) return deleteProductFunction(id[0])
    currentProduct = [dataAPI.find(item => item.id === id[0])]
    console.log(currentProduct)
    currentProduct[0].quantity = setQuantity
    console.log(currentProduct[0])
    setProductFunction(currentProduct[0])
}

const updateCart = () => {
    let shopQuantity = document.querySelector(".quantity-cart-number")
    shopQuantity.innerHTML=(shoppingProducts.length).toString()
}
const loadAddress = () => {
    let addresShow = document.querySelector(".address")
    let addressCart = document.querySelector('.address-cart')
    if (locationAddress === "" ) {return null}
    addresShow.innerHTML = locationAddress
    addressCart.innerHTML = locationAddress
}
const calculatingShopping = () => {
    let billToPay, billArray,priceMatch,priceNumber
    billArray = shoppingProducts.map(item => {
        priceMatch = item.price.match(/\d{1,}.\d*/)
        priceNumber = parseFloat(priceMatch[0])
        return priceNumber*item.quantity
    })
    billToPay = 0
    billArray.forEach(element => {
        billToPay += element        
    });
    billToPay = parseFloat(billToPay.toFixed(2))
    billToPay = billToPay.toLocaleString()
    return billToPay
}

const clickGoBack = () => {
    let previousModal = document.querySelector('#modal-cart')
    let currentModal = document.querySelector('.modal-payment')
    currentModal.classList.remove("modal-payment-active")
}

async function validateForm(e) {
    window.location.href = '#modal-thanks'
    let finalThanks = document.querySelector('.final-thanks')
    finalThanks.addEventListener('click',() => {
        //DELETE SHOPPING PRODUCTS AND LOCAL STORAGE
        console.log("this is final");
        shoppingProducts = []
        localStorage.setItem('productsTiendita', JSON.stringify(shoppingProducts))
        window.location.href="#"
        //Reload the page
        document.location.reload()
    })
}

function paymentAction(){
    let billTotal
    let finalPayment = document.querySelector('.final-payment')
    let formLast = document.querySelector('.form-last')
    if (locationAddress === "") {showMessage("Añade una direccion!");return null}
    let modalPaymentWindow = document.querySelector('.modal-payment')
    let btnGoBack = document.querySelector('.btn-goback')
    modalPaymentWindow.classList.add("modal-payment-active")
    billTotal = this.innerHTML.match(/\$.*(?=<)/)
    finalPayment.value = "Pagar "+ billTotal
    loadCards(shoppingProducts,shoppingProducts.length,0,".print-products")
    btnGoBack.addEventListener('click',clickGoBack)
    formLast.addEventListener('submit', e => validateForm (e.preventDefault()))
}

//CRUD

// Setting Function

export const setProductFunction = (product) => {
    let id, index

    id = product.id
    console.log(shoppingProducts)
    if (shoppingProducts.find(item => item.id === id) !== undefined ) {
        index = shoppingProducts.findIndex(item => item.id === id)
        shoppingProducts[index] = product
        console.log(shoppingProducts)
    }
    else {
        shoppingProducts.push(product)
        console.log(shoppingProducts)
    }
    localStorage.setItem("productsTiendita",JSON.stringify(shoppingProducts))
    showMessage("Producto añadido")
    updateCart()
}


// Delete function
export const deleteProductFunction = (id) => {
    let index
    console.log(id)
    if (shoppingProducts.find(item => item.id === id) !== undefined ) {
        
        index = shoppingProducts.findIndex(item => item.id === id)
        shoppingProducts.splice(index,1)
        localStorage.setItem("productsTiendita",JSON.stringify(shoppingProducts))
        showMessage("Producto eliminado")
        updateCart()
        return null
    }
    console.log(shoppingProducts)
    return null
}

// miscellaneous

const setUpCurrentProduct = (id,dataAPI) => {
    let currentProduct
    //setting up currentProduct
    if (shoppingProducts.find(item => item.id === id) !== undefined) {
        currentProduct = [shoppingProducts.find(item => item.id === id)]
    }
    else {
        //getting item and creating property for the item
        currentProduct = [dataAPI.find(item => item.id === id)]
        currentProduct[0].quantity = 1
    }
    return currentProduct
}

const showMessage = (message) => {
    let modalMessage = document.querySelector(".modal-message")
    let setMessage = document.querySelector(".messageSet")
    setMessage.innerHTML = message
    modalMessage.classList.add("modal-message-active")       
    setTimeout(() => {modalMessage.classList.remove("modal-message-active")},1500)
}
const loadCart = async () => {
    let par
    let quantity, billTotal
    let elementsCart0 = document.querySelector('.elements-cart-0')
    let cartContainer = document.querySelector('.cart-container')
    let cartFooter = document.querySelector('.cart-footer')
    const config = {childList: true};
    const observer = new MutationObserver(loadEvents)
    function loadEvents() {
        let emptyCart, goToPayment

        if (document.querySelector('.empty-cart') === null || document.querySelector('.btn-billing') === null)  return null;
        emptyCart = document.querySelector('.empty-cart')
        goToPayment = document.querySelector('.btn-billing')
        emptyCart.addEventListener('click', emptyCartAction)
        goToPayment.addEventListener('click',paymentAction)
            
    }
    if (shoppingProducts.length === 0) {
        loadElements('.elements-cart-0',1)
        loadCards(shoppingProducts,shoppingProducts.length,0,".cart-container")
        loadElements(".cart-footer",2)
        cartContainer.classList.remove('fg-1')
        elementsCart0.classList.add('fg-1')
        return null
    }

    elementsCart0.classList.remove('fg-1')
    cartContainer.classList.add('fg-1')
    loadElements('.elements-cart-0',2)
    loadCards(shoppingProducts,shoppingProducts.length,0,".cart-container")
    //loading other container
    quantity = shoppingProducts.length
    billTotal = calculatingShopping()
    par = [quantity, billTotal]
    observer.observe(cartFooter,config)
    loadElements(".cart-footer",0,par)
}

const emptyCartAction = ()=> {
    shoppingProducts = []
    localStorage.setItem("productsTiendita",JSON.stringify(shoppingProducts))
    loadCart()
}