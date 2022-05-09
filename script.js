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
    infoText.classList.remove('is-invalid');

    if (outputText.value) {
        noResult.classList.remove('show');
        outputResult.classList.add('show');
    }
};

const clearResult = () => {
    outputResult.classList.remove('show');
    noResult.classList.add('show');
    infoText.classList.add('is-invalid');
};

const encryptText = (text) => {
    const secretText = [...text]
        .map((letter) => (keys.get(letter) ? keys.get(letter) : letter))
        .join('');

    return secretText;
};

const decryptText = (text) => {
    let plainText = text;

    keys.forEach((value, key) => {
        plainText = plainText.replaceAll(value, key);
    });

    const textFullDecrypted = verifyDecryptedText(plainText);

    if (!textFullDecrypted) {
        return decryptText(plainText);
    }

    return plainText;
};

const verifyDecryptedText = (text) => {
    const keysValues = [...keys.values()];

    for (const value of keysValues) {
        if (text.includes(value)) {
            return false;
        }
    }
    return text;
};

const verifyText = (text) => {
    if (!text) {
        return;
    }

    const hasInvalidLetter = text.match(/[^a-z]/);

    if (hasInvalidLetter) {
        return;
    }

    return text;
};

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

closeResultBtn.addEventListener('click', () => {
    resultSection.classList.remove('show');
});

copyResultBtn.addEventListener('click', () => {
    const text = outputText.value;
    navigator.clipboard.writeText(text);

    inputText.value = '';

    if (!copyResultBtn.innerHTML.includes('Copiado!')) {
        const originalName = copyResultBtn.innerHTML.trim();
        const modifiedName = originalName.replace('Copiar', 'Copiado!');

        copyResultBtn.innerHTML = modifiedName;

        setTimeout(() => {
            copyResultBtn.innerHTML = originalName;
        }, 1500);
    }
});
