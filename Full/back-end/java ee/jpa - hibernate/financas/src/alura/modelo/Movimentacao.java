package alura.modelo;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class Movimentacao {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Integer id;
	
	private BigDecimal valor;
	
	@Enumerated(EnumType.STRING) //Atribuindo constantes para a movimentação sedo: SAÍDA ou ENTRADA
	private TipoMovimentacao tipo;
	
	@Temporal(TemporalType.TIMESTAMP) //TIMESTAMP: date + time || DATE: only date || TIME: only time
	private Calendar data;
	
	private String descricao;
	
	@ManyToMany
	private List<Categoria> categorias;
	
	@ManyToOne //Muitas MOVIMENTAÇÕES para uma CONTA
	private Conta conta;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public BigDecimal getValor() {
		return valor;
	}

	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}

	public TipoMovimentacao getTipo() {
		return tipo;
	}

	public void setTipo(TipoMovimentacao tipo) {
		this.tipo = tipo;
	}

	public Calendar getData() {
		return data;
	}

	public void setData(Calendar data) {
		this.data = data;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public List<Categoria> getCategorias() {
		return categorias;
	}

	public void setCategorias(List<Categoria> categorias) {
		this.categorias = categorias;
	}

	public Conta getConta() {
		return conta;
	}

	public void setConta(Conta conta) {
		this.conta = conta;
	}
	
	@Override
	public String toString() {
		return "TIPO: " + tipo + ", DESCRIÇÃO: " + descricao +", VALOR: " + valor;
	}
	
	
}
