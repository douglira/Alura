package br.com.alura.gerenciador.web;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/executa")
public class Controller extends HttpServlet {
	
	@Override
	protected void service(HttpServletRequest req, HttpServletResponse resp) 
			throws ServletException, IOException {
		String tarefa = req.getParameter("tarefa");
		if(tarefa == null) throw new IllegalArgumentException("Você não indicou a tarefa!");
		String nomeDaClasse = "br.com.alura.gerenciador.web." + tarefa;
		try {
		Class<?> type = Class.forName(nomeDaClasse);
		Tarefa instancia = (Tarefa) type.newInstance();
		String pagina = instancia.executa(req, resp);
		req.getRequestDispatcher(pagina).forward(req, resp);
		}catch (Exception e) {
			throw new ServletException(e);
		}
	}
}
