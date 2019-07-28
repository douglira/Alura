package alura.teste;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import alura.financas.util.JPAUtil;
import alura.modelo.Categoria;
import alura.modelo.Movimentacao;

public class Teste2JPQL {

	public static void main(String[] args) {

		EntityManager em = new JPAUtil().getEntityManager();

		@SuppressWarnings("deprecation")
		Categoria categoria = new Categoria();
		categoria.setId(1);
		
		String jpql = "select m from Movimentacao m join m.categorias c where c = :pCategoria";
		
		Query query = em.createQuery(jpql);
		query.setParameter("pCategoria", categoria);
		
		@SuppressWarnings("unchecked")
		List<Movimentacao> movimentacoes = query.getResultList();
		
		for (Movimentacao movimentacao : movimentacoes) {
			
			System.out.println("Conta ID: " + movimentacao.getConta().getId());
			System.out.println("Descricao: " + movimentacao.getDescricao());
		}
	}

}
