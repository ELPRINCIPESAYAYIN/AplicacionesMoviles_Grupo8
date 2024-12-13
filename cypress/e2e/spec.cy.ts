describe('Verificar mi aplicación', () => {

  it('intenta ingresar con credenciales incorrectas', () => {
    // Visitar la página de ingreso
    cy.visit('/ingreso');
  
    // Ingresar un correo incorrecto
    cy.get('ion-input#correo').type('usuario_incorrecto@dominio.com');
  
    // Ingresar una contraseña incorrecta
    cy.get('ion-input#password').type('contraseña_incorrecta');
  
    // Hacer clic en el botón de login
    cy.get('ion-button.enter-button').click();
  
  });

  it('Verificar inicio de sesión con credenciales correctas', () => {
    // Visita la página de inicio de sesión
    cy.visit('/');

    // Verifica que los campos de correo y contraseña estén visibles
    cy.get('#correo', { timeout: 10000 })
      .should('be.visible')
      .type('atorres'); // Ingresa el correo

    cy.get('#password', { includeShadowDom: true })
      .should('be.visible')
      .type('1234'); // Ingresa la contraseña

    // Verifica que el botón ingresar esté visible y realiza clic
    cy.get('#ingresar', { includeShadowDom: true })
      .should('be.visible')
      .click();

    // Verifica que se redirige correctamente a la página de inicio
    cy.url().should('include', '/inicio');

  });

  it('Verificar mensaje de bienvenida en la página de inicio', () => {
    cy.visit('/inicio'); // Visita la página de inicio

    // Espera a que el componente app-welcome sea visible
    cy.get('app-welcome', { timeout: 10000 }).should('be.visible');

    // Verifica que contiene el texto esperado
    cy.get('app-welcome h1')
      .contains('Bienvenido(a)')
      .should('be.visible'); // Confirma que el texto de bienvenida está presente y visible

    // Verifica que el nombre del usuario está presente (si corresponde)
    cy.get('app-welcome h1')
      .eq(1) // Supone que el segundo <h1> contiene el nombre del usuario
      .should('not.be.empty'); // Confirma que no está vacío
  });
  it('Verificar que los datos del usuario conectado se muestran y se pueden editar', () => {
    // Simula un usuario conectado antes de visitar la página
    cy.visit('/inicio', {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          'currentUser',
          JSON.stringify({
            id: 1,
            role: 'user',
            firstName: 'Carlos',
            lastName: 'Pérez',
            userName: 'carlos.perez',
            email: 'carlos.perez@example.com',
            educationalLevel: { id: 2, name: 'Secundaria' },
            dateOfBirth: '1995-06-15',
          })
        );
      },
    });
  
    // Haz clic en el botón "Mis Datos"
    cy.get('#misdatos', { timeout: 10000 })
      .should('be.visible')
      .click();
  
    // Edita los datos del usuario conectado
    cy.get('#input_apellido', { timeout: 10000 })
      .scrollIntoView()
      .find('input') // Encuentra el input nativo dentro de ion-input
      .clear({ force: true }) // Borra el contenido del input nativo
      .type('Gómez', { force: true }); // Escribe el nuevo apellido
  
    cy.get('#input_cuenta')
      .scrollIntoView()
      .find('input') // Encuentra el input nativo dentro de ion-input
      .clear({ force: true })
      .type('carlos.gomez', { force: true });
  
      cy.get('#boton_guardar')
      .scrollIntoView()
      .click({ force: true });
  
  
    // Verifica que los cambios se reflejan correctamente
    cy.get('#input_apellido')
      .find('input') // Verifica el valor del input nativo
      .should('have.value', 'Gómez');
  
    cy.get('#input_cuenta')
      .find('input')
      .should('have.value', 'carlos.gomez');
  });

  it('Crear, verificar y eliminar una publicación en el foro', () => {
    cy.visit('/'); // Asegúrate de que estamos en la página principal donde se encuentra el footer y el foro
    
    // Hacer clic en el botón del foro en el footer
    cy.get('ion-footer')
      .find('ion-segment-button[value="forum"]') // Encontrar el botón de foro
      .click();
  
    // Verifica que el componente del foro se haya cargado
    cy.get('app-forum').should('be.visible');
  
    // Crear una nueva publicación
    const titulo = 'Título de prueba para crear';
    const contenido = 'Contenido de prueba para la creación de publicación';
  
    // Completar el formulario de publicación
    cy.get('ion-input').type(titulo); // Escribe en el campo de título
    cy.get('ion-textarea').type(contenido); // Escribe en el campo de contenido
    cy.get('ion-button')
      .contains('Guardar')
      .click(); // Guardar la publicación
  
    // Verifica que la publicación ha sido creada
    cy.contains(titulo).should('exist');
    cy.contains(contenido).should('exist');
  
    // Eliminar la publicación
    cy.get('ion-card')
      .contains(titulo) // Buscar la tarjeta de la publicación creada
      .parents('ion-card') // Subir al contenedor del ion-card
      .find('ion-fab-button[color="danger"]') // Buscar el botón de eliminar (color="danger")
      .click(); // Hacer clic en el botón de eliminar
  
    // Espera explícita para que la página se actualice
    cy.wait(1000); // Espera 1 segundo para permitir que la eliminación ocurra
    
    // Verifica que la publicación ha sido eliminada
    cy.contains(titulo).should('not.exist');
    cy.contains(contenido).should('not.exist');
  });
  
  it('Debe realizar el logout correctamente', () => {
    // Visitar la página donde se encuentra el header
    cy.visit('/'); // Ajusta la URL según la ruta de tu aplicación
  
    // Esperar que el componente del header esté visible
    cy.get('app-header').should('be.visible');
  
    // Verificar que el botón de logout está visible y tiene el ícono correcto
    cy.get('app-header')
      .find('ion-button')
      .eq(1) // Seleccionar el segundo ion-button (ya que el primero es otro botón)
      .should('be.visible'); // Asegurarse de que el botón está visible
  
    // Hacer clic en el botón de logout
    cy.get('app-header')
      .find('ion-button')
      .eq(1) // Seleccionar el segundo botón
      .click();
  
    // Espera a que el logout ocurra (esto depende de la implementación de tu app)
    cy.url().should('include', '/ingreso'); // Ajusta la ruta de la página de login
  
    // Verifica que el usuario haya sido deslogueado
    cy.get('app-header')
      .find('ion-button')
      .contains('log-out-outline')
      .should('not.exist'); // Verifica que el botón de logout ya no está visible
  });
  

});