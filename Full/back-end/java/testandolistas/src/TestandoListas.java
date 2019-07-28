import java.util.*;

public class TestandoListas {

	public static void main(String[] args) {

		ArrayList<String> cursos = new ArrayList<>();
		String curso1 = "JQuery: Avance na biblioteca mais popular do mercado";
		String curso2 = "Web Desing Responsivo: páginas que se adaptam do mobile ao desk";
		String curso3 = "JavaScript: Programando na linguagem da web";
		
		cursos.add(curso1);
		cursos.add(curso2);
		cursos.add(curso3);
		
		Collections.sort(cursos);
		System.out.println(cursos);
		
	}

}
