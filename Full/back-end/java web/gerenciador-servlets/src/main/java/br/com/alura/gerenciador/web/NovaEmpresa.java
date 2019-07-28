package br.com.alura.gerenciador.web;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import br.com.alura.gerenciador.Empresa;
import br.com.alura.gerenciador.dao.EmpresaDAO;

@WebServlet(urlPatterns = "/novaEmpresa")
public class NovaEmpresa implements Tarefa {
//	@Override
//	protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
//			throws ServletException, IOException {
//		String nome = req.getParameter("nome");
//		new EmpresaDAO().adiciona(new Empresa(nome));
//		req.setAttribute("nome", nome);
//		req.getRequestDispatcher("/WEB-INF/pages/novaEmpresa.jsp").forward(req, resp);
//	}

	@Override
	public String executa(HttpServletRequest req, HttpServletResponse resp) {
		String nome = req.getParameter("nome");
		new EmpresaDAO().adiciona(new Empresa(nome));
		req.setAttribute("nome", nome);
		return "/WEB-INF/pages/novaEmpresa.jsp";
	}

}
