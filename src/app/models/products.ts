export interface ProductsResponse {
    products: ProductModel[];
}

export interface ProductModel {
    id: number;
    title: string;
    price: number;
    discount: number;
    quantity: number;
    description?: string;
    categoryName?: string;
    imageUrl: string;
}

const ELEMENT_DATA: ProductModel[] = [
    {
        id: 100, title: "iPhone X", discount: 0, categoryName: "Electronics", price: 3400, quantity: 10, imageUrl: "https://applehome.te.ua/wp-content/uploads/2021/04/apple-iphone-x-64gb-used-silver-2.1000x.jpg"
    },
    {
        id: 103, title: "Xiaomi GT56", discount: 0, categoryName: "Electronics", price: 445, quantity: 10, imageUrl: "https://applehome.te.ua/wp-content/uploads/2021/04/apple-iphone-x-64gb-used-silver-2.1000x.jpg"
    },
    {
        id: 105, title: "iPhone XS", discount: 0, categoryName: "Electronics", price: 234, quantity: 1, imageUrl: "https://applehome.te.ua/wp-content/uploads/2021/04/apple-iphone-x-64gb-used-silver-2.1000x.jpg"
    }
];