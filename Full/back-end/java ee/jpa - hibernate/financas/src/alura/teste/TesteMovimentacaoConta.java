package alura.teste;

import javax.persistence.EntityManager;

import alura.financas.util.JPAUtil;
import alura.modelo.Conta;
import alura.modelo.Movimentacao;

public class TesteMovimentacaoConta {

	public static void main(String[] args) {
		EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();

        Movimentacao movimentacao = em.find(Movimentacao.class, 1);
        Conta conta = movimentacao.getConta();
        System.out.println(movimentacao.getDescricao());
        System.out.println(conta.getTitular());
        System.out.println(conta.getMovimentacoes().size());

        em.getTransaction().commit();   

	}

}
