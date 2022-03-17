export function loadContainers(id, nameproduct, price, units, image, description, discount, priceDiscounted, pricePerUnit ,quantity ) {
    let containers =
    [
        //ITEMS WITH DISCOUNTS
        `<div class = "flex column">
            <div class = "discountTag as-s">
                ${discount}
            </div>
            <img src="${image}"></img>
            <div>
                <i class="w-sb">\$${priceDiscounted}${units}</i> <strike>${price}</strike>
            </div>
            <div >
                <i class="s-xs">${nameproduct}</i>
            </div>
            <a id = "ofertas${id}" class = "btn-add as-sh" href = "#modal-card">Agregar</a>
        </div>`
        ,
        //ITEMS WITHOUT DISCOUNTS
        `<div class = "flex column">
            <img src="${image}"></img>
            <div>
                <i class="w-sb">${price}</i>
            </div>
            <div>
                <i class="s-xs">${nameproduct}</i>
            </div>
            <div>
                <i class="boulder s-xs">${description} ($${pricePerUnit}/${units})</i>
            </div>  
            <a id = "populares${id}" class = "btn-add as-sh" href = "#modal-card">Agregar</a>
        </div>`
        ,
        //CARD MODAL 1 PERISHABLE PRODUCT
        `<div class = "js-sh fg-1">
            <img class= "of-c mw-100 w-100" src="${image}">
        </div>
        <div class = "cardDescriptionContainer ai-s jc-sa column">
            <p class = "w-sb s-xxl" >${nameproduct}</p>
            <p class = "w-sb s-xl" >${price}</p>
            <p class = "s-xxs">Precio con IVA incluido</p>
            <p class = "description-card">Peso aproximado por pieza, puede variar de acuerdo al peso real</p>
            <p class = "w-b">Seleccionar la madurez que deseas</p>
            <select class = "as-sh">
                <option selected ="selected">Por elegir</option>
                <option>Maduro (Para hoy) </option>
                <option>Normal (3-5 días) </option>
                <option>Verde (7 días) </option>
            </select>
            <div class = "as-sh">
                <div class = "plusminus js-sh fg-0" >
                    <button class = "minus btn-minus">-</button>
                    <p class = "quantityChange ai-c">${quantity} ${units}</p>
                    <button class = "plus btn-plus">+</button>
                </div>
                <a id = "add${id}" class = "btn-add btn-add-modal-2 js-sh fg-1 as-c" href = "#">Agregar</a>
            </div>
        </div>`
        ,
        //CARD MODAL 1 NON PERISHABLE PRODUCT
        `<div class = "js-sh fg-1">
            <img class= "of-c mw-100 w-100" src="${image}">
        </div>
        <div class = "cardDescriptionContainer ai-s mw-50 column">
            <p class = "w-sb s-xxl" >${nameproduct}</p>
            <p class = "w-sb s-xl" >${price}</p>
            <p class = "s-xxs">Precio con IVA incluido</p>
            <p class = "description-card">${description}</p>
            <div class = "as-sh">
                <div class = "plusminus js-sh fg-0" >
                    <button class = "minus btn-minus">-</button>
                    <p class = "quantityChange ai-c">${quantity} ${units}</p>
                    <button class = "plus btn-plus">+</button>
                </div>
                <a id = "add${id}" class = "btn-add btn-add-modal-2 js-sh fg-1 as-c" href = "#">Agregar</a>
            </div>
        </div>`
        ,
        //DISCOUNTED ITEMS SUGGESTED MODAL 1
        `<div class = "suggested-modal flex column">
            <div class = "discountTag as-s">
                ${discount}
            </div>
            <img src="${image}"></img>
            <div>
                <i class="w-sb">\$${priceDiscounted}${units}</i> <strike>${price}</strike>
            </div>
            <div >
                <i class="s-xs">${nameproduct}</i>
            </div>
            <a id = "ofertas${id}" class = "btn-add as-sh" href = "#modal-card">Agregar</a>
        </div>`
        //NON DISCOUNTED ITEMS SUGGESTED MODAL 1
        ,
        `<div class = " suggested-modal flex column">
            <img src="${image}"></img>
            <div>
                <i class="w-sb">${price}</i>
            </div>
            <div>
                <i class="s-xs">${nameproduct}</i>
            </div>
            <div>
                <i class="boulder s-xs">${description} ($${pricePerUnit}/${units})</i>
            </div>  
            <a id = "populares${id}" class = "btn-add as-sh" href = "#modal-card">Agregar</a>
        </div>`
        ,
        //CART ITEMS MODAL 3
        `<div class="card-cart ac-s">
            <img src="${image}" class="js-sh fg-0 imgcart"></img>
            <div class="column as-c js-sh fg-1">
                <p>${nameproduct}</p>
                <p class="w-sb">${price}</p>
            </div>
            <div class = "plusminus as-c js-sh fg-0" >
                <button id="minus${id} " class = "minus btn-minus">-</button>
                <p class = "quantityChange${id} ai-c">${quantity} ${units}</p>
                <button id="plus${id}" class = "plus btn-plus">+</button>
            </div>
        </div>`
        ,
        //CART ITEMS MODAL 4
        `<div class="card-cart ac-s jc-sa">
            <img src="${image}" class="js-sh fg-0 imgcart"></img>
            <div class="column as-c js-sh">
                <p>${nameproduct}</p>
                <p class="w-sb">${price}</p>
            </div>
            <div class = "plusminus as-c js-sh fg-0" >
                <p class = "quantityChange${id} ai-c">${quantity} ${units}</p>
            </div>
        </div>`
    ]
    return containers
}

export const loadBlock = (id,par = [[],[]]) => {
    let containers =
    [
        `<a class = "empty-cart as-c"><u class = "boulder as-c">Vaciar canasta</u></a>
        <a class = "btn-billing btn-add w-b">&emsp;<i class = "quantity-cart-total greenback white w-b">&emsp;${par[0]}&emsp;</i>&emsp;&emsp;ir a pagar&emsp;&emsp;<i class="bill-total white">$${par[1]}</i>&emsp;</a>`
        ,
        `<div class ="h-100 column jc-c">
            <img class="of-c" src="images/shopping.png" alt="">
            <p class="as-c s-m w-sb">Tu canasta esta vacia</p>
            <a class="btn-add" href="#">Agregar productos</a>
        </div>`
        ,
        ``
    ]
    return containers[id]
}

export const loadCards = (cardCollection,numberCards,start,selector) => {
    //definitions
    let containerCards = document.querySelector(selector)
    let priceDiscounted, pricePerUnit
    let id, nameproduct, price, units, image, description, discount, perishable, quantity
    let containersElements , containerElement
    //
    //Reset info
    containerCards.innerHTML = ''
    for(let i = start; i < start + numberCards; i++) {
        //destructuring the object
        ({id , nameproduct , price , units , image , description, discount, perishable, quantity} = cardCollection[i]);
        //converting and calculating information
        ([priceDiscounted, pricePerUnit] = convertReckoningOperations(price,discount,description));
        //load all containers
        containersElements = loadContainers(id, nameproduct, price, units, image, description, discount, priceDiscounted, pricePerUnit, quantity)
        //loading specific container
        if (selector === ".product-card-main" && perishable === "no"){ 
            containerElement = containersElements[3]
        }
        else if (selector === ".product-card-main"){
            containerElement = containersElements[2]
        }
        else if (selector == ".productSlider3" && discount ===""){
            containerElement = containersElements[5]
        }
        else if (selector == ".productSlider3") {
            containerElement = containersElements[4]
        }
        else if(selector == ".cart-container") {
            containerElement = containersElements[6]
        }
        else if(selector == ".print-products") {
            containerElement = containersElements[7]
        }
        else if (discount !== ""){ 
            //discounted item
            containerElement = containersElements[0]
        }
        else if  (discount === ""){
            //non discounted item
            containerElement = containersElements[1]
        }
        containerCards.innerHTML += containerElement
    }
}
export const loadElements = (selector,blockId,par=[[],[]]) => {
    //get selector
    let containerElemtent = document.querySelector(selector)
    containerElemtent.innerHTML = loadBlock(blockId,par)
}

///supportive functions 

const convertReckoningOperations = (price,discount,description) => {
    let priceNumber, discountNumber, priceDiscounted, descriptionNumber, pricePerUnit
    //converting types
    priceNumber = parseFloat(price.match(/\d+(\.\d*)?/)[0]).toFixed(1)
    discountNumber = parseFloat(discount.match(/\d*/)[0])
    priceDiscounted = (priceNumber - (discountNumber/100)*priceNumber).toFixed(1)
    descriptionNumber = description.match(/\d*/)
    pricePerUnit = (priceNumber/descriptionNumber).toFixed(1)
    return [priceDiscounted, pricePerUnit]
}