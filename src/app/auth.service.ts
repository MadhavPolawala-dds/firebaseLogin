import { Injectable, signal } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  user,
} from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import { UserInterface } from './user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private firebaseAuth: Auth) {}

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  register(
    username: string,
    email: string,
    password: string
  ): Observable<void> {
    const promise = createUserWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then((Response) =>
      updateProfile(Response.user, { displayName: username })
    );
    return from(promise);
  }

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = this.firebaseAuth.signOut();
    return from(promise);
  }
}
