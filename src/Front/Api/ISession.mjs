/**
 * @interface
 */
export default class TeqFw_User_Front_Api_ISession {
    async checkUserAuthenticated(router) {}

    async close(opts) {}

    getUser() {}

    async open(opts) {}

    setRouteToRedirect(route) {}

    setRouteToSignIn(route) { }
}
