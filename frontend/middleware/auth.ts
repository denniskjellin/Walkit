export default defineNuxtRouteMiddleware(() => {
    // If the user is not authenticated
    const user = useSupabaseUser();
    if (!user.value) {
      // Redirect to login page
      return navigateTo('/login');
    }
  });