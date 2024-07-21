import { Plat } from "./Plat";

export class CartItem {
    // La propriété plat est initialisée automatiquement par le constructeur
    quantite: number = 1;
    prix: number;
    static plat: any;

    // Constructeur de la classe CartItem
    constructor(public plat: Plat) {
        // Initialisation de la propriété prix après que plat ait été assigné
        this.prix = this.plat.price;
    }
}
