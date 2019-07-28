package alura.teste;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Calendar;

import javax.persistence.EntityManager;

import alura.financas.util.JPAUtil;
import alura.modelo.Categoria;
import alura.modelo.Conta;
import alura.modelo.Movimentacao;
import alura.modelo.TipoMovimentacao;

public class TesteMovimentacoesComCategoria {

	public static void main(String[] args) {

		Categoria categoria1 = new Categoria("Viagens");
		Categoria categoria2 = new Categoria("Negócios");
		
		Conta conta = new Conta();
		conta.setId(1);
		
		 Movimentacao movimentacao1 = new Movimentacao();
	        movimentacao1.setData(Calendar.getInstance());
	        movimentacao1.setDescricao("Viagem à SP");
	        movimentacao1.setTipo(TipoMovimentacao.SAÍDA);
	        movimentacao1.setValor(new BigDecimal(100.0));
	        movimentacao1.setCategorias(Arrays.asList(categoria1, categoria2));
	        
	        movimentacao1.setConta(conta);

	        Movimentacao movimentacao2 = new Movimentacao();
	        movimentacao2.setData(Calendar.getInstance());
	        movimentacao2.setDescricao("Viagem ao RJ");
	        movimentacao2.setTipo(TipoMovimentacao.SAÍDA);
	        movimentacao2.setValor(new BigDecimal(300.0));
	        movimentacao2.setCategorias(Arrays.asList(categoria1, categoria2));

	        movimentacao2.setConta(conta);
	        
	        EntityManager em = new JPAUtil().getEntityManager();
	        em.getTransaction().begin();
	        
	        em.persist(categoria1);
	        em.persist(categoria2);
	        
	        em.persist(movimentacao1);
	        em.persist(movimentacao2);
	        
	        em.getTransaction().commit();
	        em.close();
	}

}
