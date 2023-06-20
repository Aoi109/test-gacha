function drawGacha() {
    var rarity = generateRarity();
    var name = generateName();
    var word = generateWord(rarity);

    var result = document.getElementById('result');
    result.textContent = rarity + word + name;

    // アニメーションをリセットするため、一度クラスを削除してから追加する
    result.classList.remove('result-animation');
    void result.offsetWidth; // リフローを発生させることで、クラスが削除されたことをブラウザに認識させる
    result.classList.add('result-animation');
}

function drawGachaTenTimes() {
    var results = [];

    for (var i = 0; i < 10; i++) {
        var rarity = generateRarity();
        var name = generateName();
        var word = generateWord(rarity, name);

        results.push(rarity + word + name);
    }

    var resultContainer = document.getElementById('result');
    resultContainer.innerHTML = '';

    showNextResult(results, resultContainer, 0);
}

function showNextResult(results, container, index) {
    if (index >= results.length) {
        return;
    }

    var resultElement = document.createElement('div');
    resultElement.textContent = results[index];
    resultElement.className = 'result-animation';

    container.appendChild(resultElement);

    setTimeout(function () {
        showNextResult(results, container, index + 1);
    }, 100);
}

function generateRarity() {
    var random = Math.random() * 100;

    if (random < 45) {
        return 'N';
    } else if (random < 70) {
        return 'R';
    } else if (random < 85) {
        return 'SR';
    } else if (random < 95) {
        return 'SSR';
    } else {
        return 'SUR';
    }
}

function generateName() {
    var names = ['雨池紅波', '彩葉', '権守龍玄', '雪之丞'];
    var randomIndex = Math.floor(Math.random() * names.length);
    return names[randomIndex];
}

function generateWord(rarity, name) {
    var words = nicknames[rarity];

    if (words) {
        if (Array.isArray(words)) {
            var randomIndex = Math.floor(Math.random() * words.length);
            var word = words[randomIndex];
            return word !== undefined ? '[' + word + ']' : '';
        } else if (typeof words === 'object' && name && name in words) {
            var charWords = words[name];
            var randomIndex = Math.floor(Math.random() * charWords.length);
            var charWord = charWords[randomIndex];
            return charWord !== undefined ? '[' + charWord + ']' : '';
        }
    }

    return '';
}

