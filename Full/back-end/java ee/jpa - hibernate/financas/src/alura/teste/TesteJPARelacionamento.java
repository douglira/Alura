package alura.teste;

import java.math.BigDecimal;
import java.util.Calendar;

import javax.persistence.EntityManager;

import alura.financas.util.JPAUtil;
import alura.modelo.Conta;
import alura.modelo.Movimentacao;
import alura.modelo.TipoMovimentacao;

public class TesteJPARelacionamento {

	public static void main(String[] args) {

		Conta conta = new Conta();
		
		Movimentacao movimentacao = new Movimentacao();
		movimentacao.setData(Calendar.getInstance());
		movimentacao.setDescricao("Natal");
		movimentacao.setTipo(TipoMovimentacao.SAÍDA);
		movimentacao.setValor(new BigDecimal("250"));
		
		EntityManager em = new JPAUtil().getEntityManager();

		em.getTransaction().begin();

		conta = em.find(Conta.class, 1);
		movimentacao.setConta(conta);
		em.persist(movimentacao);

		em.getTransaction().commit();
		em.close();
	}

}
