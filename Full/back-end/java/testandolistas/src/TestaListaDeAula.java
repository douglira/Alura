import java.util.*;

public class TestaListaDeAula {

	public static void main(String[] args) {

		Aula curso1 = new Aula("JQuery: Avance na biblioteca mais popular do mercado", 21);
		Aula curso2 = new Aula("Web Desing Responsivo: páginas que se adaptam do mobile ao desk", 20);
		Aula curso3 = new Aula("JavaScript: Programando na linguagem da web", 16);

		ArrayList<Aula> aulas = new ArrayList<>();

		aulas.add(curso1);
		aulas.add(curso2);
		aulas.add(curso3);
		
		System.out.println("Sem ordenação:");
		System.out.println(aulas);
		
		Collections.sort(aulas);
		
		System.out.println("Com ordenação (titulo):");
		System.out.println(aulas);
		
		aulas.sort(Comparator.comparing(Aula::getTempo));
		
		System.out.println("Com ordenação (tempo):");
		System.out.println(aulas);
		
	}

}
