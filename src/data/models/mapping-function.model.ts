import { GenericEntity } from "projects/design-lib/src/lib/models/generic-entity.model";

export class MappingFunction extends GenericEntity {
  function?: FunctionText;
  index?: number;
  configuration?: string;

  //Transient Values
  active?: boolean = false;
  textInformation?:any = {};
}

export enum FunctionText {
  RSC = 'RSC', //REMOVE_SPECIAL_CHARACTERS
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  RSC[A,'~'] // Vai remover os caracteres especiais da coluna A menos o ~
  //  RSC[A,'~^&'] // Vai remover os caracteres especiais da coluna A menos o ~, ^ e &
  //  RSC[A] // Vai remover os caracteres especiais da coluna A

  RL = 'RL', //REMOVE_LETTERS
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  RL[A] // Vai remover as letras da coluna A
  //  RL[A,'akoh'] // Vai remover appenas as letras a, k, o e h da coluna A

  RD = 'RD', //REMOVE_DIGITS
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  RD[A] // Vai remover os dígitos da coluna A
  //  RD[A,'0-9'] // Vai remover os dígitos da coluna A menos os dígitos de 0 a 9


  RLC = 'RLC', //REMOVE_LEFT_CHARACTERS
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  RLC[A,'l'] // Vai remover todos os primeiros caracteres l da coluna A exemplo lllllvidro = vidro
  //  RLC[A] // Vai remover os primeiros caracteres brancos da coluna A exemplo '  vidro' = 'vidro'


  RRC = 'RRC', //REMOVE_RIGHT_CHARACTERS
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  RRC[A,'l'] // Vai remover todos os últimos caracteres l da coluna A exemplo vidrolll = vidro
  //  RRC[A] // Vai remover os caracteres brancos da coluna A exemplo 'vidro  ' = 'vidro'


  TSW = 'TSW', //TRIM_SIDE_WHITESPACE
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  TSW[A] // Vai remover os caracteres brancos das laterais da coluna A exemplo '  vidro  ' = 'vidro'


  RAW = 'RAW', //REMOVE_ALL_WHITESPACE
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  RAW[A] // Vai remover todos os caracteres brancos da coluna A exemplo 'O vidro quebrou' = 'Ovidroquebrou'


  FMT = 'FMT', //APPLY_FORMATTING
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  FMT[A,'dd/MM/yyyy'] // Vai formatar a coluna A para o formato dd/MM/yyyy exemplo '03/06/2025' = '03/06/2025'
  //  FMT[A,'dd/MM/yyyy HH:mm:ss'] // Vai formatar a coluna A para o formato dd/MM/yyyy HH:mm:ss exemplo '03/06/2025 10:00:00' = '03/06/2025 10:00:00'
  //  FMT[A,'dd/MM/yyyy HH:mm:ss.SSS'] // Vai formatar a coluna A para o formato dd/MM/yyyy HH:mm:ss.SSS exemplo '03/06/2025 10:00:00.000' = '03/06/2025 10:00:00.000'
  //  FMT[A,'dd/MM/yyyy HH:mm:ss.SSS'] // Vai formatar a coluna A para o formato dd/MM/yyyy HH:mm:ss.SSS exemplo '03/06/2025 10:00:00.000' = '03/06/2025 10:00:00.000'

  TUP = 'TUP', //TO_UPPERCASE
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  TUP[A] a = A

  TLW = 'TLW', //TO_LOWERCASE
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  TLW[A] A = a

  TEW = 'TEW', //TITLE_EACH_WORD
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  TEW[A] a b cK = A B Ck

  FIE = 'FIE', //FIRST_INFORMATION_EXISTS
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  FIE[A,B,C] // Vai pegar a primeira informação que existe na coluna A, B ou C

  CPT = 'CPT', //COPY_PART_OF_TEXT
  // Formas de uso quando DYNAMIC_INFORMATION:
  //  CPT[A,1,3] // Vai copiar as 3 primeiras letras da coluna A exemplo 'vidro' = 'vid'
  //  CPT[A,2,4] // Vai copiar as 3 letras da coluna A a partir da segunda letra exemplo 'vidro' = 'dro'

}
