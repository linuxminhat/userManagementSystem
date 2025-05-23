/**
 * @license Angular v12.2.3
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */

import { NgZone } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { StaticProvider } from '@angular/core';

/**
 * NgModule for testing.
 *
 * @publicApi
 */
import * as ɵngcc0 from '@angular/core';
import * as ɵngcc1 from '@angular/platform-browser';
export declare class BrowserTestingModule {
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<BrowserTestingModule, never>;
    static ɵmod: ɵngcc0.ɵɵNgModuleDeclaration<BrowserTestingModule, never, never, [typeof ɵngcc1.BrowserModule]>;
    static ɵinj: ɵngcc0.ɵɵInjectorDeclaration<BrowserTestingModule>;
}

/**
 * Platform for testing
 *
 * @publicApi
 */
export declare const platformBrowserTesting: (extraProviders?: StaticProvider[] | undefined) => PlatformRef;

export declare function ɵangular_packages_platform_browser_testing_testing_a(): NgZone;

export { }

//# sourceMappingURL=testing.d.ts.map