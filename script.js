'use strict';

const encryptBtn = document.querySelector('#encrypt-btn');
const decryptBtn = document.querySelector('#decrypt-btn');
const closeResultBtn = document.querySelector('#close-result-btn');
const copyResultBtn = document.querySelector('#copy-text-btn');
copyResultBtn.style.display = 'none';

const inputText = document.querySelector('#input-text');
const infoText = document.querySelector('.secret-text__text-helper');
const outputText = document.querySelector('#output-text');
const noTextInfo = document.querySelector('.result-text__no-output');
const resultSection = document.querySelector('.result-text');

const keys = new Map();
keys.set('a', 'enter');
keys.set('e', 'imes');
keys.set('i', 'ai');
keys.set('o', 'ober');
keys.set('u', 'ufat');

const showResult = (result) => {
    outputText.value = result;

    if (outputText.value) {
        noTextInfo.classList.add('show-no-result');
        outputText.classList.add('show-text-output');
        resultSection.classList.add('toggle-result');
        infoText.style.color = 'black';
        copyResultBtn.style.display = 'block';
    }
};

const clearResult = () => {
    noTextInfo.classList.remove('show-no-result');
    outputText.classList.remove('show-text-output');
    resultSection.classList.remove('toggle-result');
    infoText.style.color = 'red';
    copyResultBtn.style.display = 'none';
    outputText.value = '';
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
    resultSection.classList.remove('toggle-result');
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
