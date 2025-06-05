import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInputPasswordToggle, IonButton, IonIcon, IonInput, ToastController, IonList } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
imports: [IonIcon, IonInputPasswordToggle, IonList, CommonModule, FormsModule, IonContent, ReactiveFormsModule, IonList, IonItem, IonButton, IonIcon, IonInput]
})
export class LoginPage {

  private clienteService = inject(ClienteService);
  private router = inject(Router)

  constructor(private toastController: ToastController) {}

  async exibirMensagem(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  private formBuilder = inject(NonNullableFormBuilder);
  protected clienteForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  protected login(){
    this.clienteService.login(this.clienteForm.value).subscribe({
      next: () => {
        this.exibirMensagem("Login efetuado com sucesso")
        this.router.navigate(['/cliente-list'])
        console.log(222);
        
      },

      error: (erro) => this.exibirMensagem(erro.error.error)
    })
  }

}
