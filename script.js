// ===== КАЛЬКУЛЯТОР 1: Коэффициент трансформации =====
function calculateK() {
    const u1 = parseFloat(document.getElementById('k-u1').value);
    const u2 = parseFloat(document.getElementById('k-u2').value);
    const n1 = parseFloat(document.getElementById('k-n1').value);

    // Валидация
    if (isNaN(u1) || isNaN(u2) || u1 <= 0 || u2 <= 0) {
        alert('Пожалуйста, введите корректные значения напряжений');
        return;
    }

    // Расчёт коэффициента трансформации
    const k = (u1 / u2).toFixed(4);

    // Показываем результаты
    const resultBox = document.getElementById('k-result');
    const kValue = document.getElementById('k-value');
    const n2Result = document.getElementById('n2-result');
    const n2Value = document.getElementById('n2-value');

    kValue.textContent = k;
    resultBox.style.display = 'block';

    // Если введено N1, считаем N2
    if (!isNaN(n1) && n1 > 0) {
        const n2 = (n1 / k).toFixed(0);
        n2Value.textContent = n2;
        n2Result.style.display = 'block';
    } else {
        n2Result.style.display = 'none';
    }

    // Прокручиваем к результатам
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// ===== КАЛЬКУЛЯТОР 2: Мощность и потери в меди =====
function calculatePower() {
    const i2 = parseFloat(document.getElementById('p-i2').value);
    const u2 = parseFloat(document.getElementById('p-u2').value);
    const r = parseFloat(document.getElementById('p-r').value);

    // Валидация
    if (isNaN(i2) || isNaN(u2) || isNaN(r) || i2 <= 0 || u2 <= 0 || r <= 0) {
        alert('Пожалуйста, введите корректные значения');
        return;
    }

    // Расчёты
    const p2 = (u2 * i2).toFixed(2);  // Мощность нагрузки
    const pm = (Math.pow(i2, 2) * r).toFixed(2);  // Потери в меди

    // Показываем результаты
    const resultBox = document.getElementById('p-result');
    const p2Value = document.getElementById('p2-value');
    const pmValue = document.getElementById('pm-value');

    p2Value.textContent = p2;
    pmValue.textContent = pm;
    resultBox.style.display = 'block';

    // Прокручиваем к результатам
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// ===== КАЛЬКУЛЯТОР 3: КПД трансформатора =====
function calculateEfficiency() {
    const p2 = parseFloat(document.getElementById('e-p2').value);
    const pst = parseFloat(document.getElementById('e-pst').value);
    const pm = parseFloat(document.getElementById('e-pm').value);

    // Валидация
    if (isNaN(p2) || isNaN(pst) || isNaN(pm) || p2 <= 0 || pst < 0 || pm < 0) {
        alert('Пожалуйста, введите корректные значения мощности');
        return;
    }

    // Расчёт КПД
    const p1 = p2 + pst + pm;
    const eta = ((p2 / p1) * 100).toFixed(2);

    // Показываем результаты
    const resultBox = document.getElementById('e-result');
    const etaValue = document.getElementById('eta-value');
    const etaIndicator = document.getElementById('eta-indicator');

    etaValue.textContent = eta;
    resultBox.style.display = 'block';

    // Цветовая индикация
    if (eta >= 95) {
        etaIndicator.className = 'efficiency-indicator excellent';
    } else if (eta >= 85) {
        etaIndicator.className = 'efficiency-indicator good';
    } else {
        etaIndicator.className = 'efficiency-indicator poor';
    }

    // Прокручиваем к результатам
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// ===== КАЛЬКУЛЯТОР 4: Коэффициент абсорбции =====
function calculateKa() {
    const r15 = parseFloat(document.getElementById('ka-r15').value);
    const r60 = parseFloat(document.getElementById('ka-r60').value);

    // Валидация
    if (isNaN(r15) || isNaN(r60) || r15 <= 0 || r60 <= 0) {
        alert('Пожалуйста, введите корректные значения сопротивления');
        return;
    }

    // Расчёт коэффициента абсорбции
    const ka = (r60 / r15).toFixed(3);

    // Показываем результаты
    const resultBox = document.getElementById('ka-result');
    const kaValue = document.getElementById('ka-value');
    const kaStatus = document.getElementById('ka-status');
    const kaRecommendation = document.getElementById('ka-recommendation');

    kaValue.textContent = ka;
    resultBox.style.display = 'block';

    // Определяем статус и рекомендации
    let statusClass = '';
    let statusText = '';
    let recommendation = '';

    if (ka >= 1.5) {
        statusClass = 'status-excellent';
        statusText = '✓ Изоляция в отличном состоянии';
        recommendation = 'Трансформатор готов к дальнейшей эксплуатации. Рекомендуется регулярный контроль.';
    } else if (ka >= 1.3) {
        statusClass = 'status-good';
        statusText = '⚠ Изоляция в допустимом состоянии';
        recommendation = 'Изоляция находится в допустимых пределах. Рекомендуется увеличить частоту проверок.';
    } else {
        statusClass = 'status-warning';
        statusText = '✗ Требуется внимание';
        recommendation = 'Возможна повышенная влажность изоляции или её старение. Требуется дополнительная диагностика и, возможно, сушка изоляции.';
    }

    kaStatus.className = statusClass;
    kaStatus.textContent = statusText;
    kaRecommendation.textContent = recommendation;

    // Прокручиваем к результатам
    resultBox.scrollIntoView({ behavior: 'smooth' });
}

// ===== ИНИЦИАЛИЗАЦИЯ ПОДСВЕЧЕННОЙ НАВИГАЦИИ =====
document.addEventListener('DOMContentLoaded', function() {
    // Определяем текущую страницу
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Подсвечиваем активный пункт навигации
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});

// ===== СЛУШАТЕЛИ ДЛЯ ENTER В ПОЛЯХ ВВОДА =====
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        // Определяем, в каком калькуляторе мы находимся
        const inputElement = event.target;
        
        if (inputElement.id.startsWith('k-')) {
            calculateK();
        } else if (inputElement.id.startsWith('p-')) {
            calculatePower();
        } else if (inputElement.id.startsWith('e-')) {
            calculateEfficiency();
        } else if (inputElement.id.startsWith('ka-')) {
            calculateKa();
        }
    }
});

// ===== ФУНКЦИЯ ФОРМАТИРОВАНИЯ ЧИСЕЛ =====
function formatNumber(num) {
    return new Intl.NumberFormat('ru-RU', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(num);
}
