import java.util.List;

public class TestaCurso {

	public static void main(String[] args) {

		Curso javaColecoes = new Curso("Dominando as coleções do Java", "Paulo Silveira");
		javaColecoes.adiciona(new Aula("Trabalhando com ArrayList", 21));
		javaColecoes.adiciona(new Aula("Trabalhando com LikedList", 15));
		javaColecoes.adiciona(new Aula("Funcionamento das Threads", 18));
		
		List<Aula> aulas = javaColecoes.getAulas();
		System.out.println(aulas);
	}

}
