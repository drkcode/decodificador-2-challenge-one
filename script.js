'use strict';

const encryptBtn = document.querySelector('#encrypt-btn');
const decryptBtn = document.querySelector('#decrypt-btn');
const closeResultBtn = document.querySelector('#close-result-btn');
const copyResultBtn = document.querySelector('#copy-text-btn');

const inputText = document.querySelector('#input-text');
const infoText = document.querySelector('.input-section__text-helper');
const outputText = document.querySelector('#output-text');
const noResult = document.querySelector('.no-result');
const outputResult = document.querySelector('.output-result');
const resultSection = document.querySelector('.result-section');

const keys = new Map();
keys.set('a', 'enter');
keys.set('e', 'imes');
keys.set('i', 'ai');
keys.set('o', 'ober');
keys.set('u', 'ufat');

const showResult = (result) => {
    outputText.value = result;
    resultSection.classList.toggle('show');
    noResult.classList.toggle('show');
    outputResult.classList.toggle('show');
    infoText.classList.remove('is-invalid');
};

const clearResult = () => {
    noResult.classList.add('show');
    outputResult.classList.remove('show');
    infoText.classList.add('is-invalid');
};

const encryptText = (text) => {
    const secretText = [...text]
        .map((letter) => {
            if (keys.get(letter)) {
                return keys.get(letter);
            }
            return letter;
        })
        .join('');

    return secretText;
};

const decryptText = (text) => {
    let plainText = text;

    keys.forEach((v, k) => {
        plainText = plainText.replace(v, k);
    });

    return plainText;
};

const verifyText = (text) => {
    if (!text) {
        return;
    }

    const hasInvalidLetter = [...text].some(
        (letter) => !(letter.charCodeAt() > 96 && letter.charCodeAt() < 123)
    );

    if (hasInvalidLetter) {
        return;
    }

    return text;
};

closeResultBtn.addEventListener('click', () => {
    resultSection.classList.remove('show');
});

encryptBtn.addEventListener('click', () => {
    const text = verifyText(inputText.value.trim());

    if (!text) {
        clearResult();
        return;
    }

    const result = encryptText(text);
    showResult(result);
});

decryptBtn.addEventListener('click', () => {
    const text = verifyText(inputText.value.trim());

    if (!text) {
        clearResult();
        return;
    }

    const plainText = decryptText(text);
    showResult(plainText);
});

copyResultBtn.addEventListener('click', () => {
    const text = outputText.value;
    outputText.select();
    outputText.setSelectionRange(0, 99999);

    if (navigator.userAgent.includes('Android')) {
        document.execCommand('copy');
    } else {
        navigator.clipboard.writeText(text);
    }

    inputText.value = '';

    if (!copyResultBtn.innerHTML.includes('Copiado!')) {
        const originalName = copyResultBtn.innerHTML.trim();
        copyResultBtn.innerHTML = originalName.replace('Copiar', 'Copiado!');
        setTimeout(() => {
            copyResultBtn.innerHTML = originalName;
        }, 1500);
    }
});
