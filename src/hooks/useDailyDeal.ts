'use client';

import { useState, useEffect } from 'react';
import type { Product as DataProduct } from '@/lib/data';

type Product = Omit<DataProduct, 'name'|'description'|'longDescription'> & {
  name: string;
  description: string;
  longDescription: string;
}

// Simple pseudo-random number generator based on date
const getDailySeed = () => {
    const date = new Date();
    // Use year, month, and day to create a seed that changes daily
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
    let x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
};


export const useDailyDeal = (products: Product[]) => {
    const [dealProduct, setDealProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (products.length > 0) {
            const dailySeed = getDailySeed();
            const randomIndex = Math.floor(dailySeed * products.length);
            setDealProduct(products[randomIndex]);
        }
    }, [products]);

    return { dealProduct };
};
