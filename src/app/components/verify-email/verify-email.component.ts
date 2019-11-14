import { Component, OnInit } from '@angular/core';
import { AuthService} from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  email: string = '';
  name: string = '';
  linkSentAgain: boolean = false;
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authService.getAuth().subscribe( (auth) => {
      if (auth) {
        this.email = auth.email;
        this.name = auth.displayName;
      } else {
        this.router.navigate(['']);
      }
    });
  }
  SendVerificationLink() {
    this.authService.sendVerificationMail(this.email).then ( _ => {
      this.linkSentAgain = true;
    });
  }

}
