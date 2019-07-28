package br.com.alura.gerenciador.web;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class Logout implements Tarefa{
	
//	@Override
//	protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
//			throws ServletException, IOException {
//		HttpSession session = req.getSession();
//		session.removeAttribute("usuarioLogado");
//		req.getRequestDispatcher("/WEB-INF/pages/logout.html").forward(req, resp); // Redirecionamento no servidor.
//		resp.sendRedirect("logout.html"); Redirecionamento no lado do cliente.
//	}

	@Override
	public String executa(HttpServletRequest req, HttpServletResponse resp) {
		HttpSession session = req.getSession();
		session.removeAttribute("usuarioLogado");
		return "/WEB-INF/pages/logout.html";
	}
}
