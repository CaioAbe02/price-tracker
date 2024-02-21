/* eslint-disable */

import ITag from '@/interfaces/ITag';

export default interface IProduct {
    id: number,
    name: string,
    new_prices: number[],
    new_prices_dates: string[],
    original_price: number,
    tags: ITag[],
    url: string,
    available: boolean,
}