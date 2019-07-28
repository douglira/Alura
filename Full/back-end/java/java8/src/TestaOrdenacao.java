import java.util.ArrayList;
import static java.util.Comparator.comparing;
import java.util.List;

public class TestaOrdenacao {

	public static void main(String[] args) {

		List<String> palavras = new ArrayList<>();
		palavras.add("alura online");
		palavras.add("casa do código");
		palavras.add("caelum");
		
		palavras.sort(comparing(String::length)); //utilizando o IMPORT STATIC para o método em si
		
		//palavras.sort(Comparator.comparing(String::length)); METHOD REFERENCE
		
		// OU palavras.sort(Comparator.comparing(s -> s.length())); LAMBDA
		
		// OU palavras.sort((s1,s2) -> Integer.compare(s1.length(), s2.length())); 
		
		// OU palavras.sort((s1,s2) -> s1.length() - s2.length()));

		palavras.forEach(System.out::println); // METHOD REFERENCE

		// OU palavras.forEach(s -> System.out.println(s)); LAMBDA
		
		new Thread(() -> System.out.println("Executando um runnable")).start();

	}

}
