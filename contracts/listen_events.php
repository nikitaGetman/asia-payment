<!-- 

TODO:

1. Установите библиотеку web3.php
2. В примере кода базовая обработка ошибок. В продакшене рекомендуется добавить более надежную обработку ошибок и логирование.

 -->

<?php
require_once 'vendor/autoload.php';

use Web3\Web3;
use Web3\Contract;
use Web3\Utils;

$provider = "https://polygon-mainnet.g.alchemy.com/v2/9gOCAr5xKHJx3G56xEHPm9QPXoS6vWff"; // Alchemy RPC URL
$contractAddress = '0x2bFc9c26E1c077e36a9714F2265eB81875078B49'; // Адрес контракта
$abi = 'импортировать из файла abi.json'; // ABI контракта

// Создаем экземпляр Web3
$web3 = new Web3($provider);

// Создаем экземпляр контракта
$contract = new Contract($provider, $abi);

// Устанавливаем начальный блок
// 61929718 - блок когда контракт был задеплоен 
$fromBlock = '0x3B0F8F6'; // hex 

// Функция для прослушивания событий
function listenToEvents($web3, $contract, $contractAddress, &$fromBlock) {
    // Получаем последний номер блока
    $web3->eth->blockNumber(function ($err, $blockNumber) use ($contract, $contractAddress, &$fromBlock) {
        if ($err !== null) {
            echo 'Error getting blockNumber: ' . $err->getMessage() . PHP_EOL;
            return;
        }

        // Конвертируем номера блоков в hex
        $toBlock = Utils::toHex($blockNumber, true);

        // Параметры фильтра
        $filter = [
            'fromBlock' => $fromBlock,
            'toBlock' => $toBlock,
            'address' => $contractAddress,
            'topics' => [] // Пустой массив означает, что мы слушаем все события
        ];

        // Получаем события
        $contract->getLogs($filter, function ($err, $logs) use ($contract, &$fromBlock, $toBlock) {
            if ($err !== null) {
                echo 'Error getting logs: ' . $err->getMessage() . PHP_EOL;
                return;
            }

            foreach ($logs as $log) {
                // Декодируем событие
                $event = $contract->ethabi->decodeEvent($log);

                if ($event->event === 'Safe') {
                    // Получаем параметры события
                    $erc20Address = $event->data['ERC20_ADDRESS'];
                    $creator = $event->data['creator'];
                    $id = Utils::toDecimal($event->data['id']);
                    $amount = Utils::toDecimal($event->data['amount']);
                    $commission = Utils::toDecimal($event->data['commission']);

                    echo "Новое событие Safe:\n";
                    echo "ERC20_ADDRESS: $erc20Address\n";
                    echo "Creator: $creator\n";
                    echo "ID: $id\n";
                    echo "Amount: $amount\n";
                    echo "Commission: $commission\n";
                    echo "-------------------------\n";

                    // TODO: 
                    // записать в базу подтверждение депозита по ID
                }
            }

            // Обновляем fromBlock для следующей итерации
            $fromBlock = Utils::toHex(Utils::toBn($toBlock)->add(Utils::toBn(1)), true);
        });
    });
}

// Бесконечный цикл для прослушивания событий
while (true) {
    listenToEvents($web3, $contract, $contractAddress, $fromBlock);
    // Задержка перед следующим опросом (например, 10 секунд)
    sleep(10);
}