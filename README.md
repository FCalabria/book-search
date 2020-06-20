This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Sobre el setup de los e2e

Hay dos configuraciones para local en el `package.json`: Una simplemente tira los tests en el chrome local y otra para lanzar en saucelabs.

Aparte de eso también sería posible lanzarlos por ejemplo con otro navegador local (usando `--env firefox`, o configurando safari/edge) o selenium (`--env selenium.chrome`).

En remoto he combinado selenium (en chrome y firefox) con saucelabs (android, aunque podrían añadirse más) para que veais que puede hacerse. Esto tiene pros y cons:

Pros:
- Los tests con selenium ejecutan más rápido que con saucelabs
- No gastamos tantos minutos ni sesiones de saucelabs (si los tuviéramos limitados)

Cons:
- Hay pocos navegadores que se puedan ejecutar directamente en selenium, saucelabs da muchas más opciones
- Los tests ejecutados en selenium en travis no podemos "verlos" después, así que si fallan solo en remoto será complicado debugarlos. Los de saucelabs en cambio sí podemos verlos en la web luego.

Yo personalmente uso saucelabs para todos los tests de travis, porque prefiero el poder ver los fallos aunque tarde una eternidad, pero también sé de gente que solo los lanza con firefox y el cross browser lo testean a mano. Según os cuadre.