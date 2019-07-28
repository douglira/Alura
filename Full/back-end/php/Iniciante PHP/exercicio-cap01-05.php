<?php

function somaNumerosArray($arrayNumeros){
    $soma = 0;
    for($i=0;$i < sizeof($arrayNumeros);$i++){
        $soma = $soma + $arrayNumeros[i];
    }
    return $soma;
}

?>

