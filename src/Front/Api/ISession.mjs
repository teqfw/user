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

    getUser() {}

    async open(opts) {}

    setRouteToRedirect(route) {}

    setRouteToSignIn(route) { }
}
