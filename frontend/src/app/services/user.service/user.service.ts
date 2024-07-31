// Importations des modules et services nécessaires
import { Injectable } from '@angular/core';
import { User } from '../../shared/models/User';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../../shared/interfaces/IUserRegister';

// Clé pour stocker l'utilisateur dans le localStorage
const USER_KEY = "User";

// Annotation pour indiquer qu'il s'agit d'un service injectable
@Injectable({
  providedIn: 'root'  // Indique que le service est fourni à la racine de l'application
})
export class UserService {

  // Sujet de comportement pour stocker et émettre l'état actuel de l'utilisateur
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  // Observable pour permettre à d'autres composants de s'abonner aux changements de l'utilisateur
  public userObservable!: Observable<User>;

  // Constructeur du service
  constructor(private http: HttpClient, private toastrService: ToastrService) {
    // Assigne l'Observable du sujet à userObservable
    this.userObservable = this.userSubject.asObservable();
  }

  // Méthode pour gérer la connexion de l'utilisateur
  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        // En cas de succès, mettre à jour l'utilisateur
        next: (user: User) => {
          this.setUserToLocalStorage(user); // Stocke l'utilisateur dans le localStorage
          this.userSubject.next(user); // Met à jour le sujet de comportement avec le nouvel utilisateur
          this.toastrService.success(
            `Bienvenu au International Eats ${user.name}!`,
            "Vous êtes connecté"
          ); // Affiche un message de succès
        },
        // En cas d'erreur, afficher un message d'erreur
        error: (errorResponse: HttpErrorResponse) => {
          this.toastrService.error(errorResponse.error, "Connection échouée");
        }
      })
    );
  }

  register(userRegister:IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
        tap({
            next: (user) => {
                this.setUserToLocalStorage(user);
                this.userSubject.next(user);
                this.toastrService.success(
                    "Bienvenu au International Eats ${user.name}",
                    "Inscription réussie!"
                )
            },
            error: (errorResponse: HttpErrorResponse) => {
                this.toastrService.error(errorResponse.error,
                    "Inscription échouée"
                )
            }
        }   
      )
    )
  }

  // Méthode pour gérer la déconnexion de l'utilisateur
  logout() {
    this.userSubject.next(new User()); // Réinitialise l'utilisateur à un nouvel objet vide
    localStorage.removeItem(USER_KEY); // Supprime l'utilisateur du localStorage
    window.location.reload(); // Recharge la page pour réinitialiser l'état de l'application
  }

  // Méthode privée pour stocker l'utilisateur dans le localStorage
  private setUserToLocalStorage(user: User): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(USER_KEY, JSON.stringify(user)); // Stocke les données de l'utilisateur en format JSON
    }
  }

  // Méthode privée pour récupérer l'utilisateur du localStorage
  private getUserFromLocalStorage(): User {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = localStorage.getItem(USER_KEY); // Récupère l'utilisateur depuis le localStorage
      if (userJson) return JSON.parse(userJson) as User; // Si les données existent, les parse en un objet User
    }
    return new User(); // Si aucune donnée n'est trouvée, retourne un nouvel objet User vide
  }
}
