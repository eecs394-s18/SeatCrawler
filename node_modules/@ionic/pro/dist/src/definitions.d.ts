import { Deploy } from './services/deploy';
import { Monitoring } from './services/monitoring';
import { Api } from './api';
import { Device } from './util/device';
import { AppManifest } from './util/manifest';
export interface IonicPlugin {
}
export interface MonitoringErrorMeta {
    type: 'exception' | 'log';
}
export interface MonitoringLogOptions {
    level: 'info' | 'warn' | 'error';
    syntheticTrace?: boolean;
}
export interface MonitoringExtra {
    [x: string]: any;
}
export interface MonitoringStackTrace {
    stack: any[];
}
export interface Options {
    appVersion?: string;
    apiUrl: string;
    pluginResolveTimeout: number;
    monitoringSyncFrequency: number;
    monitoringIdentify: boolean;
}
export interface App {
    options: Options;
    appId: string;
    version: string;
    device: Device;
    api: Api;
    manifest: AppManifest;
    monitoring: Monitoring;
    deploy: Deploy;
    getFramework(): string;
    getAppId(): string;
    getUid(): string;
    getPlugin(): Promise<any>;
    getSnapshotId(): any;
    getChannel(): any;
}
/**
 * Optional configuration options for initializing Deploy
 */
export interface DeployConfig {
    /** The Pro app id to use */
    appId?: string;
    /**
     * The full text name of the channel you want to pull from.
     * Example: "Beta Testers"
     */
    channel?: string;
}
/** An object returned by Pro.deploy.info() with information related to the current Deploy settings. */
export interface DeployInfo {
    /** The UUID of the currently active Build */
    deploy_uuid: string;
    /** The channel that Deploy is currently set up to pull from */
    channel: string;
    /** The binary version of this app */
    binary_version: string;
}
/** An object returned by Pro.deploy.checkAndApply() */
export interface CheckAndApplyResponse {
    /** Whether or not we found, downloaded, and extracted an update */
    update: boolean;
    /** Whether or not we redirected to the newly downloaded update */
    redirected: boolean;
}
export declare type ProgressFunc = (progress: number) => any;
