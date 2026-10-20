# Casa Bella · calculadora de corte de fins (ESM-448)

Calculadora de optimización de material para los fins del túnel (proyecto 7829). Se ingresa el material que hay en obra y dice de qué barra o retazo sale cada pieza.

**En vivo:** https://sebastianguerram92-beep.github.io/casabella-optimization-calculator/

## Cómo se actualiza

Cada push a `main` corre `.github/workflows/deploy.yml`, que arma la página y la publica en GitHub Pages. Netlify también la publica usando `netlify.toml` (build `python3 build.py`, carpeta `dist`).

## Archivos

- `src/calculadora.html`: la página (lógica de optimización y UI).
- `src/parts.js`: lista de piezas `[código, hoja, item, cantidad, largo en pulgadas]`, tomada de las hojas de optimización ID2.1 a ID5.0.
- `build.py`: inserta `parts.js` en la página y escribe `dist/index.html`.

Para probar local: `python build.py` y abrir `dist/index.html`.
