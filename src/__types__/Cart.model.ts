export interface CartFactory{
    [key: string]: {
        updatedAt: number,
        quantity: number,
        tittle:string,
        image: string,
        price: number,
        id:string;
        finalPrice: number;

    }

}

