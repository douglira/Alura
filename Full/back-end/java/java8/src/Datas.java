import java.time.LocalDate;
import java.time.Month;
import java.time.Period;
import java.time.format.DateTimeFormatter;

public class Datas {

	public static void main(String[] args) {
		
		//DateTimeFormatter formatador = DateTimeFormatter.ofPattern("dd/MM/yyyy");

		LocalDate agora = LocalDate.now();
		System.out.println(agora.format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
		
		LocalDate future = LocalDate.of(2099, Month.JANUARY, 25);
		System.out.println(future);
		
		Period periodo = Period.between(agora, future);
		System.out.println(periodo);
	}

}
