# MC-AUTO-HOST

[MC-AUTO-HOST-Setup.exe herunterladen](https://github.com/Thomal39/MC-AUTO-HOST/raw/refs/heads/main/MC-AUTO-HOST-Setup.exe)

Lade die Setup-Datei herunter und starte sie unter Windows. MC-AUTO-HOST
erstellt und verwaltet Minecraft-Server direkt auf deinem PC — ohne Docker,
Domains, DNS, Tunnel oder Minecraft-Proxy. Java wird bei Bedarf automatisch
geladen.

Die App unterstützt Paper, Fabric, Purpur und Vanilla. Zum Spielen auf demselben
PC verwendest du `localhost:<Server-Port>`. Andere Geräte im selben WLAN
verbinden sich über die in der App angezeigte LAN-Adresse und den Server-Port.
Für dieses lokale Setup ist keine Router-Portfreigabe erforderlich.

## Website mit Node.js hosten

Mit Node.js 18 oder neuer im Repository-Ordner `npm start` ausführen. Der
Server liefert die statische Website aus `site/` aus. Der Standard-Port ist
3000; Hosting-Anbieter können ihn über die Umgebungsvariable `PORT` festlegen.
Die Datenschutzerklärung ist unter `/datenschutz.html` erreichbar, zum Beispiel
`http://<deine-DuckDNS-Adresse>/datenschutz.html`.

Vor der Veröffentlichung müssen in `site/datenschutz.html` die markierten
Betreiber-, Kontakt- und Hosting-Angaben ergänzt werden. Die Setup-Datei bleibt
im GitHub-Repository und wird über den Download-Button direkt von dort geladen.
