/**
 * @interface
 */
export default class TeqFw_User_Front_Api_ISession {
    /**
     * Return 'true' if user is authenticated or redirect to sign in route otherwise.
     * @param [router]
     * @return {Promise<boolean>}
     */
    async checkUserAuthenticated(router) {}

    async close(opts) {}

    /**
     * Clear current user data from front storages.
     */
    async deleteUser() {}

    getUser() {}

    /**
     * Open session for the user and redirect to sign in route if user is not registered yet.
     * @param router Vue Router
     * @return {Promise<void>}
     */
    async open(router) {}

    /**
     * Close current session and reopen it (refresh user data from IDB).
     * @param {string|null} route if set than user will be redirected to this route
     * @return {Promise<void>}
     */
    async reopen(route = null) {}

    setRouteToRedirect(route) {}

    setRouteToSignIn(route) { }
}