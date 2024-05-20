import IProductTag from './IProductTag';

export default interface IProduct {
    id: number,
    name: string,
    new_prices: number[],
    new_prices_dates: string[],
    original_price: number,
    tags: IProductTag[],
    url: string,
    available: boolean,
}