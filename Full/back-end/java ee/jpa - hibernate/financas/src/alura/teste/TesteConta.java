package alura.teste;

import javax.persistence.EntityManager;

import alura.financas.util.JPAUtil;
import alura.modelo.Conta;

public class TesteConta {

	public static void main(String[] args) {
		
		Conta conta = new Conta();
		conta.setTitular("Douglas Lira");
		conta.setBanco("Banco do Brasil");
		conta.setAgencia("3462");
		conta.setNumero("156166");

		EntityManager em = new JPAUtil().getEntityManager();
		
		em.getTransaction().begin();
		em.persist(conta);
		em.getTransaction().commit();
		
		em.close();
	}

}
