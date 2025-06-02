import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInputPasswordToggle, IonLabel, IonButton, IonIcon, IonDatetime, IonInput, IonSelectOption, IonSelect, IonHeader, ToastController, IonToolbar, IonTitle, IonList, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente.service';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonModal, IonDatetimeButton, IonInputPasswordToggle, IonDatetime, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, FormsModule,  ReactiveFormsModule, IonList, IonItem, IonLabel, IonButton, IonIcon, IonInput, IonSelectOption, IonSelect]
})

export class CadastroPage {

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
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    data_nascimento: [new Date().toISOString()],
    estado_civil: ['', [Validators.required]],
    telefone: ['', [Validators.required, Validators.minLength(15)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });


  protected cadastrar(){
    this.clienteService.cadastrar(this.clienteForm.value).subscribe({
      next: () => {
        this.exibirMensagem(`Muito prazer em te conhecer, ${this.clienteForm.value.nome?.split(" ")[0]}`)
        this.router.navigate(['/home'])
      },

      error: (erro) => this.exibirMensagem(erro.error)
    })
  }

  protected excluir(id:number){

  }

}
