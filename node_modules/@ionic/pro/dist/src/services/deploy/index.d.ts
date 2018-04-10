import { App, CheckAndApplyResponse, DeployConfig, DeployInfo, ProgressFunc } from '../../definitions';
/**
 * Interact with Ionic Deploy using these functions.
 * @tutorial
 * To see examples of Pro.deploy, please see our docs: https://ionicframework.com/docs/pro/deploy/.
 */
export declare class Deploy {
    private app;
    constructor(app: App);
    /**
     * Updates the Deploy config.
     * @param config Settings for your app: { 'appId': 'abc123', 'channel': 'Channel' }
     * @tutorial
     * To see examples of Pro.deploy.init(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @returns Resolved when done, no response.
     */
    init(config: DeployConfig): Promise<any>;
    /**
     * Returns the current settings of the Deploy plugin.
     * @tutorial
     * To see examples of Pro.deploy.info(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @returns A DeployInfo object.
     */
    info(): Promise<DeployInfo>;
    /**
     * Checks to see if an update is available to be downloaded.
     * @tutorial
     * To see examples of Pro.deploy.check(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return {boolean} whether there's an update available
     */
    check(): Promise<Boolean>;
    /**
     * Downloads an update if one is present.
     * @param progressFunc A function that is called with updated percentages of download completion.
     * @tutorial
     * To see examples of Pro.deploy.download(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return {Promise} resolves when completed
     */
    download(progressFunc?: ProgressFunc): Promise<any>;
    /**
     * Extracts a previously downloaded version of code so it can be used.
     * @param progressFunc A function that is called with updated (integer) percentages of extract completion.
     * @tutorial
     * To see examples of Pro.deploy.extract(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return {Promise} resolves when completed
     */
    extract(progressFunc?: ProgressFunc): Promise<any>;
    /**
     * After you extract a download, you can redirect to cause the app to reload using it.
     * @tutorial
     * To see examples of Pro.deploy.redirect(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return {Promise} resolves when completed
     */
    redirect(): Promise<any>;
    /**
     * Performs a check and entire download/unzip/redirect process for you.
     * @param redirect True/False will determine whether or not we redirect to the new version immediately upon finishing.
     * @param downloadProgressFunc A function that is called with updated percentages of download completion.
     * @param extractProgressFunc A function that is called with updated percentages of extract completion.
     * @tutorial
     * To see examples of Pro.deploy.redirect(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return {CheckAndApplyResponse}
     */
    checkAndApply(redirect?: boolean, downloadProgressFunc?: ProgressFunc, extractProgressFunc?: ProgressFunc): Promise<CheckAndApplyResponse>;
    /**
     * Returns a list of UUIDs of Deploy downloads that are currently on the device.
     * @tutorial
     * To see examples of Pro.deploy.getVersions(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return A list of UUIDs of Deploy downloads that are currently on the device.
     */
    getVersions(): Promise<any>;
    /**
     * Deletes a version of code off of the device to free up space.
     * @param uuid The uuid of the Version you'd like to delete, normally from Pro.deploy.getVersions().
     * @tutorial
     * To see examples of Pro.deploy.deleteVersion(), please see our docs: https://ionicframework.com/docs/pro/deploy/.
     * @return {Promise} resolves when completed
     */
    deleteVersion(uuid: String): Promise<any>;
}
