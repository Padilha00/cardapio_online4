<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$input = file_get_contents("php://input");
$dados = json_decode($input, true);

if (!$dados) {
    echo json_encode(["erro" => "Dados inválidos", "recebido" => $input]);
    exit;
}

$conn = new mysqli("localhost", "root", "", "fourhouse");
if ($conn->connect_error) {
    echo json_encode(["erro" => "Falha na conexão: " . $conn->connect_error]);
    exit;
}

$conn->begin_transaction();

try {
   
    $stmt = $conn->prepare("INSERT INTO pedidos (numero_pedido, nome_cliente, telefone_cliente) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $dados['numero_pedido'], $dados['nome_cliente'], $dados['telefone_cliente']);
    $stmt->execute();
    $pedido_id = $stmt->insert_id;
    $stmt->close();

    foreach ($dados['itens'] as $item) {
        $stmtItem = $conn->prepare("INSERT INTO itens_pedido (pedido_id, produto, preco, quantidade, adicionais, observacoes)
        VALUES (?, ?, ?, ?, ?, ?)");

        $adicionais = json_encode($item['adicionais']);
        $stmtItem->bind_param("isdiss",
            $pedido_id,
            $item['nome'],
            $item['preco'],
            $item['quantidade'],
            $adicionais,
            $item['observacoes']
        );

        $stmtItem->execute();
        $stmtItem->close();
    }

    $conn->commit();
    echo json_encode(["status" => "sucesso", "numero_pedido" => $dados['numero_pedido']]);

} catch (Exception $e) {
    $conn->rollback();
    echo json_encode(["erro" => "Erro ao gravar no banco: " . $e->getMessage()]);
}

$conn->close();
?>
