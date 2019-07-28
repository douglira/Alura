
public class TestaSet {

	public static void main(String[] args) {
		
		Curso javaColecoes = new Curso("Dominando as coleções do Java", "Paulo Silveira");
		javaColecoes.adiciona(new Aula("Trabalhando com ArrayList", 21));
		javaColecoes.adiciona(new Aula("Trabalhando com LikedList", 15));
		javaColecoes.adiciona(new Aula("Funcionamento das Threads", 18));
		
		javaColecoes.adiciona(new Aluno("Douglas Vinícius", 12758));
		javaColecoes.adiciona(new Aluno("Maurício Almeida", 12758));
		javaColecoes.adiciona(new Aluno("Alexandre Basílio", 12758));
		
		javaColecoes.getAlunos().forEach(aluno -> {
			System.out.println(aluno);
		});
		
		}
	}


