import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { IonContent, IonItem, IonInputPasswordToggle, IonLabel, IonButton, IonIcon, IonDatetime, IonInput, IonSelectOption, IonSelect, IonHeader, ToastController, IonToolbar, IonTitle, IonList, IonDatetimeButton, IonModal, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { Cliente } from 'src/app/modelos/cliente';
import { addIcons } from 'ionicons';
import{checkmarkOutline} from 'ionicons/icons'

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
  standalone: true,
  imports: [IonModal, IonDatetimeButton, IonIcon, IonInputPasswordToggle, IonDatetime, IonList, IonTitle, IonToolbar, IonHeader, IonContent, CommonModule, FormsModule,  ReactiveFormsModule, IonList, IonItem, IonLabel, IonButton, IonIcon, IonInput, IonSelectOption, IonSelect,IonCard, IonCardContent, IonCardHeader,IonCardTitle]
})

export class CadastroPage {

    
  private clienteService = inject(ClienteService);
  private router = inject(Router)
  private id: number=-1

  private formBuilder = inject(NonNullableFormBuilder);
  protected clienteForm = this.formBuilder.group({
    nome: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
    cpf: ['', [Validators.required, Validators.minLength(11)]],
    data_nascimento: [new Date().toISOString(), [Validators.required]],
    estado_civil: ['', [Validators.required]],
    telefone: ['', [Validators.required, Validators.minLength(11)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(private toastController: ToastController) {
       addIcons({checkmarkOutline}) 
    const currentNav = this.router.getCurrentNavigation();
    if (currentNav?.extras.state) {
      const extras = currentNav.extras;
      // console.log(extras.state);
      let cliente = extras.state as Cliente;
      this.id = cliente.id;

      let clienteSemId: Partial<Cliente> = cliente;

      delete clienteSemId.id;

      console.log(this.id, cliente, clienteSemId);

      this.clienteForm.setValue(cliente);
      this.clienteForm.controls.data_nascimento.setValue(
        new Date(Number(cliente.data_nascimento)).toISOString()
      );
    }
  }

  async exibirMensagem(mensagem:string) {
    const toast = await this.toastController.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  protected cadastrar(){
    if (this.id==-1) {
      this.clienteService.cadastrar(this.clienteForm.value).subscribe({
      next: () => {
        this.exibirMensagem(`Muito prazer em te conhecer, ${this.clienteForm.value.nome?.split(" ")[0]}`)
        this.router.navigate(['/cliente-list'])
      },

      error: (erro) => this.exibirMensagem(erro.error.error)
    })
    }else{
      this.clienteService.alterar(this.clienteForm.value, this.id).subscribe({
      next: () => {
        this.router.navigate(['/cliente-list'])
      },

      error: (erro) => this.exibirMensagem(erro.error.error)
    })
    }
    
  }
}
