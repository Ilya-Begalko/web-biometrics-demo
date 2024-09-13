import { Component } from '@angular/core';
import { WebAuthnService } from './services/webauthn.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <div class="auth-container">
      <h1>Web Biometrics in Angular</h1>
      <h1>Веб-биометрия в Angular</h1>
      <button (click)="register()">Register with Fingerprint / Регистрация по отпечатку пальца</button>
      <button (click)="login()">Login with Face ID / Войти с помощью Face ID</button>
      <p *ngIf="message" [ngClass]="{'success': isSuccess, 'error': !isSuccess}">{{ message }}</p>
    </div>
  `,
  styles: [`
    .auth-container {
      text-align: center;
      padding: 50px;
    }
    .success {
      color: green;
    }
    .error {
      color: red;
    }
    button {
      margin: 10px;
      padding: 10px 20px;
      font-size: 16px;
    }
    p {
      margin: 10px;
      font-size: 16px;
    }
  `],
  imports: [
    FormsModule,
    ReactiveFormsModule, 
    CommonModule]
})

export class AppComponent {
  message: string | null = null; // Message to display feedback to the user || Сообщение для отображения обратной связи с пользователем
  isSuccess: boolean = false; // Indicates if the last action was successful || Указывает, было ли последнее действие успешным

  constructor(private webAuthnService: WebAuthnService) { }

  //* Trigger registration process and update the UI based on the outcome
  //* Запустить процесс регистрации и обновить пользовательский интерфейс в зависимости от результата
  async register() {
    try {
      await this.webAuthnService.register();
      this.message = "Registration successful! || Регистрация прошла успешно!";
      this.isSuccess = true;
    } catch (err) {
      this.message = "Registration failed. Please try again. || Регистрация не удалась. Попробуйте еще раз."
      this.isSuccess = false;
    }
  }

  //* Trigger authentication process and update the UI based on the outcome
  //* Запустить процесс аутентификации и обновить пользовательский интерфейс в зависимости от результата
  async login() {
    try {
      await this.webAuthnService.authenticate();
      this.message = "Authentication successful! || Аутентификация прошла успешно!";
      this.isSuccess = true;
    } catch (err) {
      this.message = "Authentication failed. Please try again. || Аутентификация не удалась. Попробуйте еще раз.";
      this.isSuccess = false;
    }
  }
}