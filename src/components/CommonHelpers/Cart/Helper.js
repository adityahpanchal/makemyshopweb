
export const paymentPageTotal = (arr) =>{

    return new Promise((resolve, reject) =>{
        let priceTotal = {
            total: 0,
            products: 0,
            shipping: 0
        }
    
        for (let i = 0; i < arr.length; i++) {
            let x = arr[i];
            
            priceTotal.total = priceTotal.total + (x.finalQuantity * x.finalPrice) + x.finalDcharge
            priceTotal.products = priceTotal.products +  (x.finalQuantity * x.finalPrice)
            priceTotal.shipping = priceTotal.shipping + x.finalDcharge
        }

        resolve(priceTotal)
    })
}

export const validatorAvailibility = (arr) =>{
    return new Promise((resolve, reject) => {

        let finalList = []
        
        let priceTotal = {
            total: 0,
            products: 0,
            shipping: 0
        }


        for (let i = 0; i < arr.length; i++) {

            let x = arr[i]

            if(x.isSingleVariant){
                x.price = x.productId.price
                x.dCharge = x.productId.dCharge
                x.isVariantAvailable = true
                finalList.push(x)

                priceTotal.total = priceTotal.total + x.productId.price + x.productId.dCharge
                priceTotal.products = priceTotal.products + x.productId.price 
                priceTotal.shipping = priceTotal.shipping + x.productId.dCharge
            }
            if(x.isMultiVariant){
                let obj = x.productId.multiVariantStock.filter((y) => y.key === x.mKey)[0]
                if(typeof obj === 'object'){
                    x.price = parseInt(obj.price)
                    x.dCharge = x.productId.dCharge
                    x.isVariantAvailable = true
                    finalList.push(x)

                    priceTotal.total = priceTotal.total + parseInt(obj.price) + x.productId.dCharge
                    priceTotal.products = priceTotal.products + parseInt(obj.price)
                    priceTotal.shipping = priceTotal.shipping + x.productId.dCharge
                }else{
                    // x.isVariantAvailable = false
                    // finalList.push(x)
                    
                }
            }
            if(x.isSubVariant){
                let skeyCheck = x.productId.subVariantStock[x.sKey]
                if(skeyCheck === undefined){
                    // x.isVariantAvailable = false
                    // finalList.push(x)
                }
                if(skeyCheck !== undefined){
                    let validateSub = skeyCheck.filter(z => z.subVariant === x.ssKey)[0]
                    if(typeof validateSub !== 'object'){
                        // x.isVariantAvailable = false
                        // finalList.push(x)
                    }else{
                        x.price = parseInt(validateSub.price)
                        x.dCharge = x.productId.dCharge
                        x.isVariantAvailable = true
                        finalList.push(x)

                        priceTotal.total = priceTotal.total + parseInt(validateSub.price) + x.productId.dCharge
                        priceTotal.products = priceTotal.products + parseInt(validateSub.price)
                        priceTotal.shipping = priceTotal.shipping + x.productId.dCharge
                    }
                }
            }
        }
        resolve({
            finalList: finalList,
            priceTotal: priceTotal
        })
    })
}


// let cartlist = arr.map((x) => {
//     if(x.isSingleVariant){
//         x.price = x.productId.price
//         x.dCharge = x.productId.dCharge
//         x.isVariantAvailable = true
//         return x
//     }
//     if(x.isMultiVariant){
//         let obj = x.productId.multiVariantStock.filter((y) => y.key === x.mKey)[0]
//         if(typeof obj === 'object'){
//             x.price = parseInt(obj.price)
//             x.dCharge = x.productId.dCharge
//             x.isVariantAvailable = true
//             return x
//         }else{
//             x.isVariantAvailable = false
//             return x
//         }
//     }
//     if(x.isSubVariant){
//         let skeyCheck = x.productId.subVariantStock[x.sKey]
//         if(skeyCheck === undefined){
//             x.isVariantAvailable = false
//             return x
//         }
//         if(skeyCheck !== undefined){
//             let validateSub = skeyCheck.filter(z => z.subVariant === x.ssKey)[0]
//             if(typeof validateSub !== 'object'){
//                 x.isVariantAvailable = false
//                 return x
//             }else{
//                 x.price = parseInt(validateSub.price)
//                 x.dCharge = x.productId.dCharge
//                 x.isVariantAvailable = true
//                 return x
//             }
//         }
//     }
// })