package alura.teste;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.Query;

import alura.financas.util.JPAUtil;
import alura.modelo.Conta;

public class TesteTodasAsMovimentacoesDasContas {

	public static void main(String[] args) {

		EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();
        
        String jpql = "select distinct c from Conta c join fetch c.movimentacoes"; //OUTRA SOLUÇÃO: COMENTÁRIO NA CLASSE CONTA
        /* String jpql = "select distinct c from Conta c left join fetch c.movimentacoes"; 
         * LEFT JOIN: traz também as contas que não possuem movimentações, ou seja, o LEFT traz
         * tudo que está a esquerda do JOIN, neste caso sendo as CONTAS.
         * Por padrão o comando JOIN FETCH executa um INNER JOIN
         */
        																					
        Query query = em.createQuery(jpql);
        
        List<Conta> listaContas = query.getResultList();
        for (Conta conta : listaContas) {
			System.out.println("Titular: " + conta.getTitular());
			System.out.println("Movimentações: " + conta.getMovimentacoes());
		}
        
        
        em.getTransaction().commit();
		/*
		 * Teste para a consulta EAGER ativando na classe CONTA a anotação: fetch = FetchType.EAGER no OneToMany
		 EntityManager em = new JPAUtil().getEntityManager();

        Conta conta = em.find(Conta.class, 1);

        List<Movimentacao> movimentacoes = conta.getMovimentacoes();

        em.close();

        for (Movimentacao movimentacao : movimentacoes) {
            System.out.println("Movimentação: " + movimentacao.getDescricao());
        }
        */
	}

}
