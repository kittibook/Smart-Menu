import type { Product } from "../types/cart.type";

export const ProductMock : Product[] = [
    {
        id : 0,
        name : 'ขนมปัง',
        image : '',
        price : 10,
        topping : [
            {
                id : 2,
                name : 'ระดับความเผ็ด',
                type : 'list',
                detail : [
                    {
                        id : 1,
                        name : 'น้อย',
                        price : 0
                    },
                    {
                        id : 2,
                        name : 'มาก',
                        price : 50
                    }
                ]
            },
            {
                id : 3,
                name : 'ท็อปปิ้ง',
                type : 'checkbox',
                detail : [
                    {
                        id : 4,
                        name : 'ทาเนย',
                        price : 5
                    },
                    {
                        id : 3,
                        name : 'แยม',
                        price : 10
                    }
                ]
            }
        ]
    }
]