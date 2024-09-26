<!-- 
Чтобы отправить транзакцию, вызывающую функцию back смарт-контракта от имени аккаунта оракула с помощью PHP, 
вам необходимо выполнить следующие шаги:

1. Установить необходимые зависимости для взаимодействия с блокчейном Polygon из PHP. 
    - Установите библиотеку web3.php для взаимодействия с Ethereum/Polygon: 
        composer require sc0vu/web3.php
    - Установите библиотеку для подписания транзакций: 
        composer require web3p/ethereum-tx

2. Безопасно управлять приватным ключом аккаунта оракула.

3. Сформировать и подписать транзакцию, вызывающую функцию back.

4. Отправить транзакцию в сеть.


Ниже приведен подробный пример кода, который демонстрирует, как это сделать.

 -->

<?php

require_once 'vendor/autoload.php';

use Web3\Web3;
use Web3p\EthereumTx\Transaction;
use Web3\Contract;
use Web3\Utils;

$provider = "https://polygon-mainnet.g.alchemy.com/v2/9gOCAr5xKHJx3G56xEHPm9QPXoS6vWff"; // Alchemy RPC URL
$contractAddress = '0x2bFc9c26E1c077e36a9714F2265eB81875078B49'; // Адрес контракта
$abi = file_get_contents('abi.json');; // ABI контракта

// Приватный ключ аккаунта оракула 
// (! Храните его безопасно !)
$privateKey = '6abc0970f4f75154ef9a1e8d613333d2bbe528f7f7faec6b865e0d0afdd97d5d'; // ! import from env 

// Адрес аккаунта оракула
$fromAddress = '0xBc750A2f8080B0b2ba62CDa431Ea73d915b22321';

// Параметры для вызова функции `back`
$id = 5;                // ID депозита
$withCommission = true; // Флаг необходимости оплаты комиссии (true или false) - если передать false, то полная сумма депозита будет возвращена пользователю. без удержания комиссии

// Создаем экземпляр Web3
$web3 = new Web3($provider);

// Создаем экземпляр контракта
$contract = new Contract($provider, $abi);
// Устанавливаем адрес контракта
$contract->at($contractAddress);

// Кодируем данные функции `back`
$functionData = $contract->getData('back', $id, $withCommission);

// Убедимся, что данные начинаются с '0x'
if (strpos($functionData, '0x') !== 0) {
    $functionData = '0x' . $functionData;
}

// Получаем nonce (число транзакций) для аккаунта оракула
$web3->eth->getTransactionCount($fromAddress, 'pending', function ($err, $nonce) use (&$transactionCount) {
    if ($err !== null) {
        echo 'Ошибка при получении nonce: ' . $err->getMessage();
        exit;
    }
    $transactionCount = $nonce;
});


// Оцениваем лимит газа для транзакции
$web3->eth->estimateGas([
    'from' => $fromAddress,
    'to' => $contractAddress,
    'data' => $functionData,
], function ($err, $gasEstimate) use (&$gasLimit) {
    if ($err !== null) {
        echo 'Ошибка при оценке газа: ' . $err->getMessage();
        exit;
    }
    $gasLimit = Utils::toHex($gasEstimate, true);
});

// Получаем текущую цену газа
$web3->eth->gasPrice(function ($err, $gasPrice) use (&$gasPriceHex) {
    if ($err !== null) {
        echo 'Ошибка при получении цены газа: ' . $err->getMessage();
        exit;
    }
    $gasPriceHex = Utils::toHex($gasPrice, true);
});

// Формируем транзакцию
$transaction = [
    'nonce' => Utils::toHex($transactionCount, true),
    'from' => $fromAddress,
    'to' => $contractAddress,
    'gas' => $gasLimit,
    'gasPrice' => $gasPriceHex,
    'value' => '0x0',
    'data' => $functionData,
    'chainId' => 137 // Chain ID для Polygon Mainnet
];

// Подписываем транзакцию приватным ключом оракула
$tx = new Transaction($transaction);
$signedTransaction = '0x' . $tx->sign($privateKey);

// Отправляем транзакцию в сеть
$web3->eth->sendRawTransaction($signedTransaction, function ($err, $txHash) {
    if ($err !== null) {
        echo 'Ошибка при отправке транзакции: ' . $err->getMessage();
        exit;
    }
    echo 'Транзакция отправлена! Хеш транзакции: ' . $txHash . PHP_EOL;
});
