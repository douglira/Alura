import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class TestaStreams {

	public static void main(String[] args) {

		List<Curso> cursos = new ArrayList<Curso>();
		cursos.add(new Curso("Python", 45));
		cursos.add(new Curso("JavaScript", 150));
		cursos.add(new Curso("Java 8", 113));
		cursos.add(new Curso("C", 55));
		
//		cursos.stream()
//			.filter(c -> c.getAlunos()>50)
//			.map(Curso::getNome)
//			.forEach(System.out::println);
		
		List<Curso> listaCursos = cursos.stream()
			.filter(c -> c.getAlunos()>50)
			.collect(Collectors.toList());
			
	}

}
