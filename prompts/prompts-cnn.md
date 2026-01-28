# Pruebas E2E
## IDE Antigravity - Agente modo planning Gemini 3 flash
### Prompt 1 - ChatGPT (GPT para prompts): 
ayudame a mejorar este prompt como experto en pruebas E2E analiza la documentacion del proyecto @ManifestoBuenasPracticas.md @ModeloDatos.md luego de analizado y siguiendo el siguiente patron para pruebas javascriptCopy code describe('User Login Flow', () => { it('should allow a user to log in and access the dashboard', () => { cy.visit('/login'); cy.get('input[name=username]').type('testuser'); cy.get('input[name=password]').type('testpassword'); cy.get('button[type=submit]').click(); cy.url().should('include', '/dashboard'); }); }); crea las pruebas en el directorio , cada caso en su propio archivo .js de estos casos: Carga de la Página de Position: Verifica que el título de la posición se muestra correctamente. Verifica que se muestran las columnas correspondientes a cada fase del proceso de contratación. Verifica que las tarjetas de los candidatos se muestran en la columna correcta según su fase actual. Cambio de Fase de un Candidato: Simula el arrastre de una tarjeta de candidato de una columna a otra. Verifica que la tarjeta del candidato se mueve a la nueva columna. Verifica que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id. usa las buenas practicas Automatización Completa: Integración en CI/CD: Asegúrate de integrar las pruebas E2E en tu pipeline de CI/CD para ejecutar las pruebas automáticamente en cada build. Pruebas Regulares: Ejecuta pruebas E2E regularmente para detectar problemas de integración antes de que lleguen a producción. Simulación Realista: Datos de Prueba Realistas: Utiliza datos de prueba que imiten los datos de producción lo más cerca posible. Entorno de Pruebas Completo: Configura un entorno de pruebas que imite el entorno de producción, incluyendo servicios externos y bases de datos. Mantenimiento de Pruebas: Actualización Continua: Mantén tus pruebas E2E actualizadas a medida que el sistema evoluciona. Monitoreo de Resultados: Monitorea los resultados de las pruebas E2E para identificar y resolver problemas rápidamente.

### Prompt 2 IDE Gemini 3 pro (high):

Rol / Identidad
Eres un arquitecto de calidad de software especializado en pruebas E2E, automatización avanzada con Cypress e integración CI/CD.
Contexto
El sistema gestiona procesos de contratación mediante una vista tipo kanban llamada Position. Cada posición contiene fases (columnas) y candidatos (tarjetas). Los cambios de fase se realizan mediante drag & drop y se persisten en backend usando el endpoint PUT /candidate/:id.
La documentación (@ManifestoBuenasPracticas.md, @ModeloDatos.md) define reglas de negocio, estructura de datos y convenciones técnicas que deben respetarse.
Objetivo
Crear una batería de pruebas E2E robusta, mantenible y lista para CI/CD que valide tanto la UI como la integración con backend para los flujos críticos de Position.
Instrucciones paso a paso


Análisis


Extrae entidades clave (Position, Phase, Candidate).


Identifica estados posibles y transiciones válidas.




Diseño de pruebas


Define casos independientes y atómicos.


Usa data-testid o selectores estables.




Implementación


Crea un directorio de pruebas E2E para Position.


Implementa un archivo .js por caso de prueba, incluyendo:


Carga de la página de Position.


Validación del título.


Renderizado de columnas por fase.


Renderizado de candidatos en su fase inicial.


Simulación de drag & drop entre columnas.


Verificación visual del cambio.


cy.intercept para validar PUT /candidate/:id (status y payload).






Buenas prácticas obligatorias


Datos de prueba realistas y aislados.


Uso de beforeEach para setup.


Evitar dependencias entre pruebas.


Código legible, comentado y fácil de mantener.




Automatización y mantenimiento


Preparar las pruebas para ejecución en CI/CD.


Asegurar ejecución regular en cada build.


Monitorear resultados y actualizar pruebas según evolución del sistema.




Formato de salida


Código Cypress (JavaScript).


Estructura clara de archivos (position-load.cy.js, candidate-drag-drop.cy.js, etc.).


Comentarios explicativos en cada prueba.


Ejemplo de estructura de prueba
describe('Candidate Phase Change', () => {
  beforeEach(() => {
    cy.visit('/positions/1');
    cy.intercept('PUT', '/candidate/*').as('updateCandidate');
  });

  it('should move candidate to new phase and update backend', () => {
    cy.get('[data-testid=candidate-1]')
      .drag('[data-testid=phase-interview]');

    cy.get('[data-testid=phase-interview]')
      .should('contain.text', 'Juan Pérez');

    cy.wait('@updateCandidate')
      .its('response.statusCode')
      .should('eq', 200);
  });
});

Diagramas
flowchart TD
A[Usuario abre Position] --> B[Se renderiza título y columnas]
B --> C[Se muestran candidatos por fase]
C --> D[Usuario arrastra candidato]
D --> E[UI actualiza columna]
E --> F[PUT /candidate/:id]
F --> G[Backend confirma actualización]
G --> H[Estado final consistente]
### Prompt 3 IDE Gemini 3 pro (high):
para 
position
 has una consulta a los servicios de positions para que valides cuales son los id con los que podemos hacer las pruebas  ten en cuenta lo indicado en 
ManifestoBuenasPracticas.md
 
ModeloDatos.md

### Prompt 4 IDE Gemini 3 pro (high):
para el  
position-load.cy.js
  valida primeramente en el  la ubicacion de los elementos de donde tendremos que validar, solo has los ajustes en 
position-load.cy.js
  en  para que las pruebas se ejecuten correctamente no toques otra parte del codigo

### Prompt 5 IDE Gemini 3 pro (high):
para el  
candidate-drag-drop.cy.js
  valida primeramente en el  la ubicacion de los elementos de donde tendremos que validar, solo has los ajustes en 
candidate-drag-drop.cy.js
  en  para que las pruebas se ejecuten correctamente no toques otra parte del codigo
