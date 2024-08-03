import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { User } from '../shared/models/User';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { USER_LOGIN_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { isPlatformBrowser } from '@angular/common';

const USER_KEY = "User";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable = this.userSubject.asObservable();

  constructor(
    private http: HttpClient, 
    private toastrService: ToastrService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  public get currentUser(): User {
    return this.userSubject.value;
  }

  public fetchCurrentUser(): Observable<User | null> {
    if (isPlatformBrowser(this.platformId)) {
      const userJson = localStorage.getItem(USER_KEY);
      if (userJson) {
        const user = JSON.parse(userJson) as User;
        if (user.token) {
          const headers = new HttpHeaders({
            'Authorization': `Bearer ${user.token}`
          });
          return this.http.get<User>(`${USER_LOGIN_URL}/current`, { headers }).pipe(
            tap(response => {
              this.userSubject.next(response);
            })
          );
        } else {
          this.toastrService.error('No se encontró el token en el local storage');
          return of(null);
        }
      } else {
        this.toastrService.error('No se encontró el usuario en el local storage');
        return of(null);
      }
    } else {
      this.toastrService.error('No se puede acceder al local storage');
      return of(null);
    }
  }

  login(userLogin: IUserLogin): Observable<User> {
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user: User) => {
          console.log('User received from login:', user); // Log adicional
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bienvenu au International Eats ${user.name}!`,
            "Vous êtes connecté"
          );
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.toastrService.error(errorResponse.error, "Connection échouée");
        }
      })
    );
  }

  register(userRegister: IUserRegister): Observable<User> {
    return this.http.post<User>(USER_REGISTER_URL, userRegister).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Bienvenu au International Eats ${user.name}`,
            "Inscription réussie!"
          );
        },
        error: (errorResponse: HttpErrorResponse) => {
          this.toastrService.error(errorResponse.error, "Inscription échouée");
        }
      })
    );
  }

  logout() {
    this.userSubject.next({} as User); // Resetea el usuario a un objeto vacío
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      console.log('User set to localStorage:', user); // Log adicional
    }
  }

  private getUserFromLocalStorage(): User {
    if (typeof window !== 'undefined' && window.localStorage) {
      const userJson = localStorage.getItem(USER_KEY);
      console.log('User from localStorage:', userJson); // Log adicional
      if (userJson) return JSON.parse(userJson) as User;
    }
    return {} as User; // Devuelve un objeto vacío si no hay datos
  }
}
