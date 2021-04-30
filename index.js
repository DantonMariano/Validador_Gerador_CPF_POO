/**
 * Classe que contém método de validar CPF e Primeiro Digito e Segungo Digito
 * como atributos, (PD) e (SD)
 */
class Valida {
  constructor() {
    this.pd = 0;
    this.sd = 0;
  }
  /**
   *  Método que valida CPF.
   *
   * @param {string} cpf
   * @returns boolean
   */
  cpf = function (cpf) {
    let vcpf = this.remove_numero_da_string(cpf);
    let cnt = 10;
    let somatoria = 0;
    for (let n in vcpf) {
      if (n >= 9) break;
      somatoria += vcpf[n] * cnt;
      cnt--;
    }
    const pd = 11 - (somatoria % 11) > 9 ? 0 : 11 - (somatoria % 11);
    cnt = 11;
    somatoria = 0;
    vcpf += pd;
    for (let n in vcpf) {
      if (n >= 10) break;
      somatoria += vcpf[n] * cnt;
      cnt--;
    }
    const sd = 11 - (somatoria % 11) > 9 ? 0 : 11 - (somatoria % 11);
    vcpf += sd;
    let ucpf = this.remove_numero_da_string(cpf);
    this.pd = pd;
    this.sd = sd;
    return ucpf[9] == pd && ucpf[10] == sd;
  };
  /** remove array de chars da string
   *
   * @param {array} char
   * @param {string} string
   */
  remove_numero_da_string = function (string) {
    return string.replace(/\D+/g, "");
  };
}
/**
 * Classe hereditaria da classe Valida.
 * Contém método gerador de CPF
 */
class Geradora extends Valida {
  /**
   * Função que retorna Inteiro de 100000000 até 999999999
   *
   * @returns {integer} CPF de 9 Digitos
   */
  cpf_gerado = function () {
    return (
      Math.floor(Math.random() * (1000000000 - 100000001 + 1) + 100000001) - 1
    );
  };
  /**
   * Função que utiliza primeiros 9 digitos gerados da função acima
   * para gerar digitos verificadores a partir da função da classe pai.
   * @returns {string} CPF Gerado com 11 digitos
   */
  gera_cpf = function () {
    let cpfg = this.cpf_gerado();
    this.cpf(String(cpfg));
    return `${cpfg}${this.pd}${this.sd}`;
  };
}
let valida = new Valida();
let geracpf = new Geradora();

console.log(valida.cpf("76861967394"));
console.log(geracpf.gera_cpf());
