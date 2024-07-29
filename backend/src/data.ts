

export const sample_plat: any[] = [
    {
        id: "0",
        name: "Paella",
        price: 15.00,
        tags: ["espagnol", "riz", "fruits de mer", "traditionnel"],
        favourite: true,
        stars: 5,
        imageUrl: "assets/paella.jpg",
        origins: ["riz", "fruits de mer", "poulet", "safran"],
        cookTime: '60 mins'
    },
    {
        id: "1",
        name: "Tortilla Española",
        price: 8.50,
        tags: ["espagnol", "oeufs", "pommes de terre", "traditionnel", "vegetarien"],
        favourite: false,
        stars: 4,
        imageUrl: "assets/tortilla.jpg",
        origins: ["oeufs", "pommes de terre", "oignons"],
        cookTime: '30 mins'
    },
    {
        id: "2",
        name: "Coq au Vin",
        price: 18.00,
        tags: ["français", "poulet", "vin rouge", "traditionnel"],
        favourite: true,
        stars: 5,
        imageUrl: "assets/coq_au_vin.jpg",
        origins: ["poulet", "vin rouge", "champignons", "oignons"],
        cookTime: '120 mins'
    },
    {
        id: "3",
        name: "Ratatouille",
        price: 12.00,
        tags: ["français", "legumes", "fraditionnel", "vegan", "vegetarien"],
        favourite: false,
        stars: 4,
        imageUrl: "assets/ratatouille.jpg",
        origins: ["tomates", "courgettes", "aubergines", "poivrons"],
        cookTime: '50 mins'
    },
    {
        id: "4",
        name: "Pizza Margherita",
        price: 10.00,
        tags: ["italien", "pizza", "tomates", "mozzarella", "vegetarien"],
        favourite: true,
        stars: 5,
        imageUrl: "assets/pizza_margherita.jpg",
        origins: ["pâte à pizza", "tomates", "mozzarella", "basilic"],
        cookTime: '20 mins'
    },
    {
        id: "5",
        name: "Risotto alla Milanese",
        price: 14.00,
        tags: ["italien", "riz", "safran", "vegetarien"],
        favourite: false,
        stars: 5,
        imageUrl: "assets/risotto.jpg",
        origins: ["riz arborio", "bouillon", "safran", "parmesan"],
        cookTime: '40 mins'
    },
    {
        id: "6",
        name: "Feijoada",
        price: 16.00,
        tags: ["bresilien", "haricots noirs", "viande", "traditionnel"],
        favourite: true,
        stars: 5,
        imageUrl: "assets/feijoada.jpg",
        origins: ["haricots noirs", "porc", "bœuf", "saucisses"],
        cookTime: '150 mins'
    },
    {
        id: "7",
        name: "Moqueca",
        price: 13.50,
        tags: ["bresilien", "poisson", "lait de coco", "traditionnel"],
        favourite: false,
        stars: 4,
        imageUrl: "assets/moqueca.jpg",
        origins: ["poisson", "lait de coco", "tomates", "oignons"],
        cookTime: '45 mins'
    },
    {
        id: "8",
        name: "Moussaka",
        price: 15.00,
        tags: ["grec", "aubergines", "viande", "traditionnel"],
        favourite: true,
        stars: 5,
        imageUrl: "assets/moussaka.jpg",
        origins: ["aubergines", "viande hachée", "bechamel", "tomates"],
        cookTime: '90 mins'
    },
    {
        id: "9",
        name: "Souvlaki",
        price: 10.00,
        tags: ["grec", "viande", "brochette", "traditionnel"],
        favourite: false,
        stars: 4,
        imageUrl: "assets/souvlaki.jpg",
        origins: ["porc ou poulet", "pita", "légumes", "tzatziki"],
        cookTime: '30 mins'
    }
];

 export const sample_tags: any[] = [
    {name: 'espagnol', count: 2},
    {name: 'français', count: 2},
    {name: 'italien', count: 2},
    {name: 'bresilien', count: 2},
    {name: 'grec', count: 2},
    {name: 'fruits de mer', count: 1},
    {name: 'pizza', count: 1},
    {name: 'viande', count: 3},
    {name: 'poisson', count: 1},
    {name: 'traditionnel', count: 8},
    {name: 'vegan', count: 1},
    {name: 'vegetarien', count: 4}
];

export const sample_users: any[] = [
    {
        name: "Paco Lionel",
        email: "paco@paco.es",
        password: "1234",
        adresse: "Badajoz 222",
        isAdmin: true
    },
    {
        name: "Gumersinda",
        email: "gumi@gumi.es",
        password: "1234",
        adresse: "Villa de Arriba 222",
        isAdmin: false
    }
]