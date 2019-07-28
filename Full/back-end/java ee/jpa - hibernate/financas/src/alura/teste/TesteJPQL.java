package alura.teste;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import alura.financas.util.JPAUtil;
import alura.modelo.Conta;
import alura.modelo.Movimentacao;

public class TesteJPQL {

	public static void main(String[] args) {

		EntityManager em = new JPAUtil().getEntityManager();

		Conta conta = new Conta();
		conta.setId(1);
		
		String jpql = "select m from Movimentacao m where m.conta = :pConta";
		
		Query query = em.createQuery(jpql);
		query.setParameter("pConta", conta);
		
		List<Movimentacao> movimentacoes = query.getResultList();
		
		for (Movimentacao movimentacao : movimentacoes) {
			
			System.out.println("Conta ID: " + movimentacao.getConta().getId());
			System.out.println("Descricao: " + movimentacao.getDescricao());
		}
	}

}
