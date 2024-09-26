<!-- 

TODO:

1. Установите библиотеку "web3p/web3.php": "^0.3"
2. В примере кода базовая обработка ошибок. В продакшене рекомендуется добавить более надежную обработку ошибок и логирование.

 -->

<?php
require_once 'vendor/autoload.php';

use Web3\Web3;
use Web3\Contract;
use Web3\Utils;

$provider = "https://polygon-mainnet.g.alchemy.com/v2/9gOCAr5xKHJx3G56xEHPm9QPXoS6vWff"; // Alchemy RPC URL
$contractAddress = '0x2bFc9c26E1c077e36a9714F2265eB81875078B49'; // Адрес контракта
$abi = file_get_contents('abi.json');; // ABI контракта

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
    $web3->eth->blockNumber(function ($err, $blockNumber) use ($web3, $contract, $contractAddress, &$fromBlock) {
        if ($err !== null) {
            echo 'Error: ' . $err->getMessage() . PHP_EOL;
            return;
        }

        // Конвертируем номера блоков в hex
        $toBlock = Utils::toHex($blockNumber, true);

        // Получаем хеш темы (topic) для события 'Safe'        
        $eventSignature = 'Safe(address,address,uint256,uint256,uint256)';
        $eventTopic = Utils::sha3($eventSignature);

        // Параметры фильтра
        $filter = [
            'fromBlock' => $fromBlock,
            'toBlock' => $toBlock,
            'address' => $contractAddress,
            'topics' => [$eventTopic]
        ];

        // Получаем события
        $web3->eth->getLogs($filter, function ($err, $logs) use ($contract, &$fromBlock, $toBlock) {
            if ($err !== null) {
                echo 'Error: ' . $err->getMessage() . PHP_EOL;
                return;
            }

            foreach ($logs as $log) {
                // Декодируем данные события
                // Извлекаем индексированные параметры из topics
                $creator = '0x' . substr($log->topics[1], 26); // Адрес занимает последние 40 символов
                $id = hexdec($log->topics[2]); // Конвертируем из hex в decimal

                // Декодируем неиндексированные параметры из data
                try {
                    $decodedData = $contract->ethabi->decodeParameters(
                        ['address', 'uint256', 'uint256'],
                        $log->data
                    );

                    $erc20Address = $decodedData[0];
                    $amount = $decodedData[1];
                    $commission = $decodedData[2];

                    echo "Новое событие Safe:\n";
                    echo "ERC20_ADDRESS: $erc20Address\n";
                    echo "Creator: $creator\n";
                    echo "ID: $id\n";
                    echo "Amount: $amount\n";
                    echo "Commission: $commission\n";
                    echo "-------------------------\n";

                    // TODO:
                    // - проверить что $amount и $commission соответствуют параметрам сделки - $amount представляет собой целое число, первые 6 знаков определяют дробную часть 
                    // - изменить статус сделки с $id 

                } catch (\Exception $e) {
                    echo 'Ошибка при декодировании данных события: ' . $e->getMessage() . PHP_EOL;
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