package alura.teste;

import javax.persistence.EntityManager;

import alura.financas.util.JPAUtil;
import alura.modelo.Cliente;
import alura.modelo.Conta;

public class TesteContaCliente {

	public static void main(String[] args) {

		Cliente cliente = new Cliente();
        
        Conta conta = new Conta();
        conta.setId(1); // essa conta está no estado 'Detached' pois já possui um id!!

        cliente.setConta(conta);
        
        EntityManager em = new JPAUtil().getEntityManager();
        em.getTransaction().begin();

        cliente = em.find(Cliente.class, 1);
        cliente.setTelefone("996630087");

        em.getTransaction().commit();    

	}

}
