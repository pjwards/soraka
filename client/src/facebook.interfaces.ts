// Type definitions for the Facebook Javascript SDK 2.8
// Project: https://developers.facebook.com/docs/javascript
// Definitions by:  Amrit Kahlon    <https://github.com/amritk>
//                  Mahmoud Zohdi   <https://github.com/mahmoudzohdi>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

export interface Facebook {
    api: any;
    AppEvents: any;
    Canvas: any;
    Event: {
        /**
         * @see https://developers.facebook.com/docs/reference/javascript/FB.Event.subscribe/v3.0
         *
         * @param event The name of the event type you want to subscribe to.
         * @param callback This is the callback function that is triggered when the event is fired.
         * Click for info about the different arguments and objects passed to the callbacks
         * for each event type.
         */
        subscribe(event: EVENT, callback: (response?: StatusResponse) => void): void;
    };
    XFBML: any;

    /**
     * The method FB.getAuthResponse() is a synchronous accessor for the current authResponse.
     * The synchronous nature of this method is what sets it apart from the other login methods.
     *
     * @param callback function to handle the response.
     *
     * This method is similar in nature to FB.getLoginStatus(),
     * but it returns just the authResponse object.
     */
    getAuthResponse(): AuthResponse;
    /**
     * FB.getLoginStatus() allows you to determine if a user is
     * logged in to Facebook and has authenticated your app.
     *
     * @param callback function to handle the response.
     */
    getLoginStatus(callback: (response: StatusResponse) => void, roundtrip?: boolean): void;
    /**
     * The method FB.init() is used to initialize and setup the SDK.
     *
     * @param params params for the initialization.
     */
    init(params: InitParams): void;
    /**
     * Use this function to log the user in
     *
     * Calling FB.login() results in the JS SDK attempting to open a popup window.
     * As such, this method should only be called after a user click event, otherwise
     * the popup window will be blocked by most browsers.
     *
     * @param callback function to handle the response.
     * @param options optional ILoginOption to add params such as scope.
     */
    login(callback: (response: StatusResponse) => void, options?: LoginOptions): void;
    /**
     * The method FB.logout() logs the user out of your site and, in some cases, Facebook.
     *
     * @param callback function to handle the response
     */
    logout(callback: (response: StatusResponse) => void): void;

    /**
     * @see https://developers.facebook.com/docs/sharing/reference/share-dialog
     */
    ui(params: ShareDialogParams, callback: (response: ShareDialogResponse) => void): void;

    /**
     * @see https://developers.facebook.com/docs/games/services/gamerequests
     */
    ui(params: GameRequestDialogParams, callback: (response: GameRequestDialogResponse) => void): void;

    /**
     * @see https://developers.facebook.com/docs/payments/reference/paydialog
     */
    ui(params: PayDialogParams, callback: (response: PayDialogResponse) => void): void;

    /**
     * @see https://developers.facebook.com/docs/games_payments/payments_lite
     */
    ui(params: PaymentsLiteDialogParams, callback: (response: PaymentsLiteDialogResponse) => void): void;

    /**
     * @see https://developers.facebook.com/docs/videos/live-video/exploring-live
     */
    ui(params: LiveDialogParams, callback: (response: LiveDialogResponse) => void): void;

    /**
     * @see https://developers.facebook.com/docs/sharing/reference/send-dialog
     * @see https://developers.facebook.com/docs/pages/page-tab-dialog
     */
    ui(params: SendDialogParams | AddPageTabDialogParams, callback: (response: null) => void): void;

    getAccessToken(): string;
}

export interface InitParams {
    appId: string;
    version?: string;
    cookie?: boolean;
    status?: boolean;
    xfbml?: boolean;
    frictionlessRequests?: boolean;
    hideFlashCallback?: boolean;
    autoLogAppEvents?: boolean;
}

export interface LoginOptions {
    auth_type?: string;
    scope?: string;
    return_scopes?: boolean;
    enable_profile_selector?: boolean;
    profile_selector_ids?: string;
}

////////////////////////
//
//  DIALOGS
//
////////////////////////

export interface DialogParams {
    app_id?: string;
    redirect_uri?: string;
    display?: 'page' | 'iframe' | 'async' | 'popup';
}

export interface ShareDialogParams extends DialogParams {
    method: 'share';
    href: string;
    picture?: string;
    hashtag?: string;
    quote?: string;
    mobile_iframe?: boolean;
}

export interface AddPageTabDialogParams extends DialogParams {
    method: 'pagetab';
    redirect_uri: string;
}

export interface GameRequestDialogParams extends DialogParams {
    method: 'apprequests';
    message: string;
    action_type?: 'send' | 'askfor' | 'turn';
    data?: number;
    exclude_ids?: string[];
    filters?: 'app_users' | 'app_non_users' | Array<{ name: string, user_ids: string[] }>;
    max_recipients?: number;
    object_id?: string;
    suggestions?: string[];
    title?: number;
    to?: string | number;
}

export interface SendDialogParams extends DialogParams {
    method: 'send';
    to?: string;
    link: string;
}

export interface PayDialogParams extends DialogParams {
    method: 'pay';
    action: 'purchaseitem';
    product: string;
    quantity?: number;
    quantity_min?: number;
    quantity_max?: number;
    request_id?: string;
    test_currency?: string;
}

export interface PaymentsLiteDialogParams extends DialogParams {
    method: 'pay';
    action: 'purchaseiap';
    product_id: string;
    developer_payload?: string;
    quantity?: number;
}

export interface LiveDialogParams extends DialogParams {
    method: 'live_broadcast';
    display: 'popup' | 'iframe';
    phase: 'create' | 'publish';
    broadcast_data?: LiveDialogResponse;
}

////////////////////////
//
//  RESPONSES
//
////////////////////////
export interface AuthResponse {
    accessToken: string;
    expiresIn: number;
    signedRequest: string;
    userID: string;
    grantedScopes?: string;
}

export interface StatusResponse {
    status: STATUS;
    authResponse: AuthResponse;
}

export interface ShareDialogResponse {
    post_id?: string;
    error_message?: string;
}

export interface GameRequestDialogResponse {
    request: string;
    to: string[];
}

export interface PayDialogResponse {
    payment_id: string;
    amount: string;
    currency: string;
    quantity: string;
    request_id: string;
    status: string;
    signed_request: string;
}

export interface PaymentsLiteDialogResponse {
    developer_payload?: string;
    payment_id: number;
    product_id?: string;
    purchase_time?: number;
    purchase_token?: string;
    signed_request?: string;
    error_code?: number;
    error_message?: string;
}

export interface LiveDialogResponse {
    id: string;
    stream_url: string;
    secure_stream_url: string;
    status: string;
}


export interface UserResponse {
    id: string;
    email: string;
    name: string;
    picture?: PictureResponse;
}

export interface PictureResponse {
    data: {
        url: string;
        width: number;
        height: number;
        is_silhouette: boolean;
    };
}

////////////////////////
//
//  ENUM
//
////////////////////////

/**
 * connected : The user is logged into Facebook and has authorized your application.
 *
 * authorization_expired : The user has previously logged into your application,
 * but your authorization to access their data has expired.
 *
 * not_authorized : The user is logged into Facebook but has not authorized your application.
 *
 * unknown : The user is either not logged into Facebook or explicitly logged out
 * of your application so it doesn't attempt to connect to Facebook and thus,
 * we don't know if they've authenticated your application or not.
 */
export enum STATUS {
    CONNECTED = 'connected',
    AUTHORIZATION_EXPIRED = 'authorization_expired',
    NOT_AUTHORIZED = 'not_authorized',
    UNKNOWN = 'unknown',
}

/**
 * auth.authResponseChange : Fired when the authResponse object has changed,
 * which indicates that the user's access token has changed in some way.
 *
 * auth.statusChange : Fired when the user's Facebook Login status changes.
 *
 * auth.login : Fired when someone logs into the app using FB.login().
 * It is preferable to use the auth.statusChange event for this purpose.
 *
 * auth.logout : Fired when someone logs out of the app using FB.logout().
 * It is preferable to use the auth.statusChange event for this purpose.
 *
 * xfbml.render : Fired when FB.XFBML.parse() completes.
 * This indicates that all of the social plugins on the page have been loaded.
 */
export enum EVENT {
    AUTH_AUTH_RESPONSE_CHANGE = 'auth.authResponseChange',
    AUTH_STATUSCHANGE = 'auth.statusChange',
    AUTH_LOGIN = 'auth.login',
    AUTH_LOGOUT = 'auth.logout',
    XFBML_RENDER = 'xfbml.render',
}
