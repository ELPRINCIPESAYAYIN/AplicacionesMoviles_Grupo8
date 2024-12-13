import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = async (route, state) => {
  
  const authService = inject(AuthService);
  const router = inject(Router);

  // Comprobar si el usuario está autenticado
  const isAuthenticated = await authService.isAuthenticated();

  if (isAuthenticated) {
    // Si está autenticado, redirigir a la página de inicio
    console.log('Usuario autenticado. Redirigiendo a /inicio');
    router.navigate(['/inicio']);
    return false; // No permitir el acceso a la página de login
  } else {
    // Si no está autenticado, permitir el acceso
    return true;
  }
};
