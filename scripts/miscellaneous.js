export const discountedPopular = (dataAPI) => {
    let popularItems, discountedItems,array
    // Search for discounted items
    discountedItems = dataAPI.filter(item => item.discount !=="")
    //Search for 'popular' items
    popularItems = dataAPI.filter(item => item.discount ==="")
    array = [discountedItems, popularItems] 
    return array
}
    