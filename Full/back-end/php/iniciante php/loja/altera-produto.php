<?php
require_once("cabecalho.php");



$tipoProduto = $_POST['tipoProduto'];
$factory = new ProdutoFactory();
$produto = $factory->criaPor($tipoProduto, $_POST);
$produto->atualizaBaseadoEM($_POST);
$produto->setId($_POST['id']);
$produto->getCategoria->setId($_POST['categoria_id']);
if(array_key_exists('usado', $_POST)) {
	$produto->setUsado("true");
} else {
	$produto->setUsado("false");
}
$produtoDao = new ProdutoDao($conexao);

if($produtoDao->alteraProduto($produto)) { ?>
	<p class="text-success">O produto <?= $produto->getNome() ?>, <?= $produto->getPreco() ?> foi alterado.</p>
<?php 
} else {
	$msg = mysqli_error($conexao);
?>
	<p class="text-danger">O produto <?= $produto->getNome() ?> não foi alterado: <?= $msg?></p>
<?php
}
?>

<?php include("rodape.php"); ?>