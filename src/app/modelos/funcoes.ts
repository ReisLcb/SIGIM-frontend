export function tratarCpf(cpf: string) {
  cpf.replace(/\.|\-/g, '') // Remove todos os caracteres não numéricos
  let cpf_tratado = "";
  
  for (let i = 0; i < cpf.length; i++) {
    cpf_tratado += cpf[i];
    
    if (i == 2 || i == 5) cpf_tratado += ".";
    if (i == 8) cpf_tratado += "-";
  }

  return cpf_tratado;
}

export function tratarTelefone(numero:string) {
  let numero_formatado = ""

  for (let i = 0; i < numero.length; i++) {
    if (i == 0) numero_formatado += "("
    if (i == 2) numero_formatado += ") "
    if (i == 7) numero_formatado += '-'
    numero_formatado += numero[i]
  } 

  return numero_formatado
}

export function formatarData(data:string):string{
    let dataFormatada = ""
    let dataArray = data.split("-")
    
    for (let i = dataArray.length-1; i > -1; i--) {
      if(i == 2) dataFormatada += dataArray[i].split("T")[0]
      else dataFormatada += dataArray[i]

      if(i != 0) dataFormatada += "/"
    }

    return dataFormatada
}
