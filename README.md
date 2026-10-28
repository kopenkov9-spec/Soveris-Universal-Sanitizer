# Soveris Universal Sanitizer

**Open-source, local-first text and media metadata inspection and cleanup tool.**

[Български](#български) · [English](#english) · [MIT License](LICENSE)

> **Important:** This tool does not reliably detect AI-generated content or guarantee removal of AI watermarks (including SynthID), C2PA provenance, or other hidden signals. Always keep the original files.

## Български

### Какво представлява?

Soveris Universal Sanitizer е леко уеб приложение, което работи **локално в браузъра**. Не изисква регистрация, сървър, инсталация на библиотеки или интернет връзка след изтеглянето. Файловете се обработват на устройството ти, без да се изпращат към външна услуга.

### Изтегляне

**Вариант 1 — ZIP (най-лесният):**

1. Отвори [хранилището в GitHub](https://github.com/kopenkov9-spec/Soveris-Universal-Sanitizer).
2. Натисни зеления бутон **Code** → **Download ZIP**, или използвай [директно изтегляне на ZIP](https://github.com/kopenkov9-spec/Soveris-Universal-Sanitizer/archive/refs/heads/main.zip).
3. Разархивирай файла в папка по избор.

**Вариант 2 — Git (за разработчици):**

```bash
git clone https://github.com/kopenkov9-spec/Soveris-Universal-Sanitizer.git
cd Soveris-Universal-Sanitizer
```

### Инсталиране и локално стартиране

**Не е необходима инсталация.** В разархивираната папка отвори `index.html` с Chrome, Firefox или Edge.

- **Windows:** двоен клик върху `index.html` (или десен бутон → Open with → браузър).
- **macOS / Linux:** отвори `index.html` с браузър.
- **Офлайн:** приложението няма външни JavaScript библиотеки и не изисква интернет, когато файловете вече са изтеглени.
- **Важно:** дръж `index.html`, `styles.css`, `core.js` и `app.js` в една папка; само `index.html` не е достатъчен.

При браузърни ограничения на локални файлове можеш да стартираш незадължителен локален сървър от папката (ако имаш Python):

```bash
python -m http.server 8000
```

След това отвори `http://localhost:8000`. Това е локален сървър на твоя компютър, а не публикуване в интернет.

### Как се използва?

**Текст:** постави текст в полето → **Анализ** за отчет на невидими Unicode символи → **Почисти** за премахване на поддържаните контролни символи → **Свали TXT**. Премахването на ZWJ/ZWNJ е отделна опция, понеже може да промени емоджита и определени езици.

**Файлове:** избери един или повече файлове → **Анализирай файловете** → прочети резултата и, ако форматът позволява, използвай линка за изтегляне на обработеното копие. Оригиналите не се презаписват.

| Формат | Поддръжка |
| --- | --- |
| TXT / поставен текст | Анализ и почистване на избрани Unicode контроли |
| PNG, JPEG, WebP | Анализ на сигнатурата и повторно кодиране на неподвижни изображения през Canvas |
| MP3 | Премахване на стандартни ID3v2/ID3v1 тагове, когато са разпознати |
| WAV | Само разпознаване/информация |
| MP4, MOV, WebM/MKV | Само разпознаване/информация |

**Ограничения:** повторното кодиране може да промени цветове, пиксели, ориентация и анимация; не е гарантирано без загуби. Не използвай инструмента като доказателство дали даден файл е създаден с AI. Не премахва надеждно водни знаци или произход, скрит в самото съдържание. Някои нестандартни MP3 тагове остават неподдържани.

### Тестове и принос

За автоматизираните тестове е необходим **Node.js 18+** (не е нужен за използване на приложението):

```bash
node --test tests/core.test.cjs
node --check core.js
node --check app.js
```

GitHub Actions изпълнява тестове при push и pull request. Принос под формата на issues и pull requests е добре дошъл.

### Лиценз

Проектът е с отворен код под [MIT License](LICENSE). Позволени са използване, промяна, разпространение и комерсиално използване при спазване на условията на лиценза.

---

## English

### About

Soveris Universal Sanitizer is a **local-first** browser application for inspecting suspicious Unicode characters and selected file metadata. It has no server dependency and does not upload your content. It runs offline once downloaded.

### Download

1. Open the [GitHub repository](https://github.com/kopenkov9-spec/Soveris-Universal-Sanitizer).
2. Select **Code → Download ZIP**, or [download the ZIP directly](https://github.com/kopenkov9-spec/Soveris-Universal-Sanitizer/archive/refs/heads/main.zip).
3. Extract the archive to any local folder.

Developers can also clone it:

```bash
git clone https://github.com/kopenkov9-spec/Soveris-Universal-Sanitizer.git
cd Soveris-Universal-Sanitizer
```

### Install and run locally

**No installation or dependencies required.** Double-click `index.html` (or open it in Chrome, Edge, or Firefox) on Windows, macOS, or Linux. Keep `index.html`, `styles.css`, `core.js`, and `app.js` in the same folder.

If your browser restricts local file access, optionally serve the folder locally with Python:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`. This does not require a public server.

### Usage

- **Text:** paste text → **Inspect** → **Clean** → **Download TXT**. Removal of ZWJ/ZWNJ is opt-in because these can be meaningful in languages and emoji.
- **Files:** choose files → **Inspect files** → review format information. For supported still images and MP3 files, download a cleaned copy; your original is untouched.
- **Images:** PNG/JPEG/WebP are re-encoded using Canvas; quality, color, metadata, orientation or animation may change.
- **Audio:** MP3 ID3v1/ID3v2 stripping is supported for recognized basic tags.
- **Other media:** WAV, MP4/MOV, and WebM/MKV are inspection-only in this version; there is **no video remuxing or metadata-cleaning implementation**.

This is an early functional version, **not** a forensic tool, comprehensive watermark remover, or reliable detector of AI provenance. Preserve originals.

### Run tests

Node.js 18+ is only needed for development, not for using the web application:

```bash
node --test tests/core.test.cjs
node --check core.js
node --check app.js
```

A GitHub Actions workflow runs tests on pushes and pull requests.

### License

Released under the [MIT License](LICENSE). You may use, modify, distribute, and commercially reuse the software as permitted by the license, retaining the copyright and license notices.
