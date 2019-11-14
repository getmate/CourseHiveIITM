import { Injectable} from '@angular/core';
import { CanActivate } from '@angular/router';
import {Router } from '@angular/router';

import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService} from '../services/auth.service';
import { FirebaseService} from '../services/firebase.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private router: Router,
                public afAuth: AngularFireAuth,
                public authServive: AuthService,
                private firebaseS: FirebaseService
                ) {

    }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.pipe(map(auth => {
            if (!auth ) {
                    this.router.navigate(['']);
                    return false;
            }
            else {
                
                return true;
            }
        }));
    }
}
