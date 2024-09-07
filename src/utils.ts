import IProduct from "./interfaces/IProduct"

export function getCurrentPrice(prices: number[], available: boolean): string {
    if (!available) {
        return 'Unavailabe'
    }

    return `R$${prices.slice(-1)[0].toFixed(2)}`
}

export function getDiscount(product: IProduct): string {
    const original_price = product.original_price
    const current_price = product.new_prices.slice(-1)[0]
    const discount = (100 - (original_price / current_price) * 100).toFixed(2)

    if (parseFloat(discount) > 0) {
        return (`+${discount}`)
    }

    return (`${discount}`)
}

export function getColor(product: IProduct): string {
    const lowest_price = lowestPrice(product)
    const current_price = product.new_prices.slice(-1)[0]
    const discount = parseFloat(getDiscount(product))

    if (!product.available) {
        return 'product_gray'
    }
    if (discount < 0 && lowest_price == current_price) {
        return 'product_yellow'
    }
    if (discount < 0) {
        return 'product_green'
    }
    if (discount > 0) {
        return 'product_red'
    }

    return 'product_white'
}

export function getIcon(color: string): string {
    if (color == 'product_gray') {
        return 'fa-solid fa-xmark'
    }
    if (color == 'product_yellow' || color == 'product_green') {
        return 'fa-solid fa-arrow-trend-down'
    }
    if (color == 'product_red') {
        return 'fa-solid fa-arrow-trend-up'
    }

    return 'fa-solid fa-minus'
}

export function lowestPrice(product: IProduct): number {
    return Math.min(...product.new_prices)
}

export function highestPrice(product: IProduct): number {
    return Math.max(...product.new_prices)
}

export function averagePrice(product: IProduct): number {
    const size = product.new_prices.length
    let total = 0

    for (let price of product.new_prices) {
        total += price
    }

    return total / size
}