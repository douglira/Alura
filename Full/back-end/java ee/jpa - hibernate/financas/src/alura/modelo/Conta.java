package alura.modelo;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
// @SequenceGenerator(name = "SEQ_CONTAS", sequenceName = "SEQ_CONTAS", initialValue = 1) [Ex: PostgreSQL - criando a sequence]
public class Conta {
	
	//  @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_CONTAS") [Ex: PostgreSQL - auto-increment da sequence]
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY) //Geração automatica de ID no MySQL
	private Integer id;
	private String titular;
	private String numero;
	private String banco;
	private String agencia;
	@OneToMany(mappedBy="conta"/*, fetch = FetchType.EAGER*/) /*Com este comando a QUERY ficaria assim:
															   * ---------- SELECT c FROM Conta c ---------------
															   *Não trazendo valores repetidos
															   *e evitando o problema de N+1 (LAZY LOADING)
															   *porém isto não é uma boa prática e só é usado
															   *em casos de grande necessidade
															   */
	private List<Movimentacao> movimentacoes;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTitular() {
		return titular;
	}
	public void setTitular(String titular) {
		this.titular = titular;
	}
	public String getNumero() {
		return numero;
	}
	public void setNumero(String numero) {
		this.numero = numero;
	}
	public String getBanco() {
		return banco;
	}
	public void setBanco(String banco) {
		this.banco = banco;
	}
	public String getAgencia() {
		return agencia;
	}
	public void setAgencia(String agencia) {
		this.agencia = agencia;
	}
	public List<Movimentacao> getMovimentacoes() {
		return movimentacoes;
	}
	
	

}
