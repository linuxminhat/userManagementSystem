/**
 * @license Angular v12.2.3
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */

import { ChangeDetectorRef } from '@angular/core';
import { Compiler } from '@angular/core';
import { CompilerOptions } from '@angular/core';
import { Component } from '@angular/core';
import { ComponentFactory } from '@angular/core';
import { ComponentRef } from '@angular/core';
import { DebugElement } from '@angular/core';
import { Directive } from '@angular/core';
import { ElementRef } from '@angular/core';
import { InjectFlags } from '@angular/core';
import { InjectionToken } from '@angular/core';
import { Injector } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgZone } from '@angular/core';
import { Pipe } from '@angular/core';
import { PlatformRef } from '@angular/core';
import { ProviderToken } from '@angular/core';
import { SchemaMetadata } from '@angular/core';
import { Type } from '@angular/core';

/**
 * This API should be removed. But doing so seems to break `google3` and so it requires a bit of
 * investigation.
 *
 * A work around is to mark it as `@codeGenApi` for now and investigate later.
 *
 * @codeGenApi
 */
import * as ɵngcc0 from '@angular/core';
export declare const __core_private_testing_placeholder__ = "";

/**
 * @deprecated use `waitForAsync()`, (expected removal in v12)
 * @see {@link waitForAsync}
 * @publicApi
 * */
export declare function async(fn: Function): (done: any) => any;

/**
 * Fixture for debugging and testing a component.
 *
 * @publicApi
 */
export declare class ComponentFixture<T> {
    componentRef: ComponentRef<T>;
    ngZone: NgZone | null;
    private _autoDetect;
    /**
     * The DebugElement associated with the root element of this component.
     */
    debugElement: DebugElement;
    /**
     * The instance of the root component class.
     */
    componentInstance: T;
    /**
     * The native element at the root of the component.
     */
    nativeElement: any;
    /**
     * The ElementRef for the element at the root of the component.
     */
    elementRef: ElementRef;
    /**
     * The ChangeDetectorRef for the component
     */
    changeDetectorRef: ChangeDetectorRef;
    private _renderer;
    private _isStable;
    private _isDestroyed;
    private _resolve;
    private _promise;
    private _onUnstableSubscription;
    private _onStableSubscription;
    private _onMicrotaskEmptySubscription;
    private _onErrorSubscription;
    constructor(componentRef: ComponentRef<T>, ngZone: NgZone | null, _autoDetect: boolean);
    private _tick;
    /**
     * Trigger a change detection cycle for the component.
     */
    detectChanges(checkNoChanges?: boolean): void;
    /**
     * Do a change detection run to make sure there were no changes.
     */
    checkNoChanges(): void;
    /**
     * Set whether the fixture should autodetect changes.
     *
     * Also runs detectChanges once so that any existing change is detected.
     */
    autoDetectChanges(autoDetect?: boolean): void;
    /**
     * Return whether the fixture is currently stable or has async tasks that have not been completed
     * yet.
     */
    isStable(): boolean;
    /**
     * Get a promise that resolves when the fixture is stable.
     *
     * This can be used to resume testing after events have triggered asynchronous activity or
     * asynchronous change detection.
     */
    whenStable(): Promise<any>;
    private _getRenderer;
    /**
     * Get a promise that resolves when the ui state is stable following animations.
     */
    whenRenderingDone(): Promise<any>;
    /**
     * Trigger component destruction.
     */
    destroy(): void;
}

/**
 * @publicApi
 */
export declare const ComponentFixtureAutoDetect: InjectionToken<boolean[]>;

/**
 * @publicApi
 */
export declare const ComponentFixtureNoNgZone: InjectionToken<boolean[]>;

/**
 * Discard all remaining periodic tasks.
 *
 * @publicApi
 */
export declare function discardPeriodicTasks(): void;

/**
 * Wraps a function to be executed in the `fakeAsync` zone:
 * - Microtasks are manually executed by calling `flushMicrotasks()`.
 * - Timers are synchronous; `tick()` simulates the asynchronous passage of time.
 *
 * If there are any pending timers at the end of the function, an exception is thrown.
 *
 * Can be used to wrap `inject()` calls.
 *
 * @param fn The function that you want to wrap in the `fakeAysnc` zone.
 *
 * @usageNotes
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 *
 * @returns The function wrapped to be executed in the `fakeAsync` zone.
 * Any arguments passed when calling this returned function will be passed through to the `fn`
 * function in the parameters when it is called.
 *
 * @publicApi
 */
export declare function fakeAsync(fn: Function): (...args: any[]) => any;

/**
 * Simulates the asynchronous passage of time for the timers in the `fakeAsync` zone by
 * draining the macrotask queue until it is empty.
 *
 * @param maxTurns The maximum number of times the scheduler attempts to clear its queue before
 *     throwing an error.
 * @returns The simulated time elapsed, in milliseconds.
 *
 * @publicApi
 */
export declare function flush(maxTurns?: number): number;

/**
 * Flush any pending microtasks.
 *
 * @publicApi
 */
export declare function flushMicrotasks(): void;

/**
 * Returns a singleton of the applicable `TestBed`.
 *
 * It will be either an instance of `TestBedViewEngine` or `TestBedRender3`.
 *
 * @publicApi
 */
export declare const getTestBed: () => TestBed;

/**
 * Allows injecting dependencies in `beforeEach()` and `it()`.
 *
 * Example:
 *
 * ```
 * beforeEach(inject([Dependency, AClass], (dep, object) => {
 *   // some code that uses `dep` and `object`
 *   // ...
 * }));
 *
 * it('...', inject([AClass], (object) => {
 *   object.doSomething();
 *   expect(...);
 * })
 * ```
 *
 * @publicApi
 */
export declare function inject(tokens: any[], fn: Function): () => any;

/**
 * @publicApi
 */
export declare class InjectSetupWrapper {
    private _moduleDef;
    constructor(_moduleDef: () => TestModuleMetadata);
    private _addModule;
    inject(tokens: any[], fn: Function): () => any;
}


/**
 * Type used for modifications to metadata
 *
 * @publicApi
 */
export declare type MetadataOverride<T> = {
    add?: Partial<T>;
    remove?: Partial<T>;
    set?: Partial<T>;
};

/**
 * Object used to configure the test module teardown behavior in `TestBed`.
 * @publicApi
 */
export declare interface ModuleTeardownOptions {
    /** Whether the test module should be destroyed after every test. */
    destroyAfterEach: boolean;
    /** Whether errors during test module destruction should be re-thrown. Defaults to `true`. */
    rethrowErrors?: boolean;
}

/**
 * Clears out the shared fake async zone for a test.
 * To be called in a global `beforeEach`.
 *
 * @publicApi
 */
export declare function resetFakeAsyncZone(): void;

/**
 * @publicApi
 */
export declare interface TestBed {
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, options?: TestEnvironmentOptions): void;
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): void;
    /**
     * Reset the providers for the test injector.
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: ProviderToken<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): void;
    overrideProvider(token: any, provider: {
        useValue: any;
    }): void;
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): void;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
}

/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 *
 * @publicApi
 */
export declare const TestBed: TestBedStatic;

/**
 * Static methods implemented by the `TestBedViewEngine` and `TestBedRender3`
 *
 * @publicApi
 */
export declare interface TestBedStatic {
    new (...args: any[]): TestBed;
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, options?: {
        teardown?: ModuleTeardownOptions;
    }): TestBed;
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, aotSummaries?: () => any[]): TestBed;
    /**
     * Reset the providers for the test injector.
     */
    resetTestEnvironment(): void;
    resetTestingModule(): TestBedStatic;
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): TestBedStatic;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    configureTestingModule(moduleDef: TestModuleMetadata): TestBedStatic;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    compileComponents(): Promise<any>;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): TestBedStatic;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): TestBedStatic;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): TestBedStatic;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): TestBedStatic;
    overrideTemplate(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): TestBedStatic;
    overrideProvider(token: any, provider: {
        useValue: any;
    }): TestBedStatic;
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): TestBedStatic;
    inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: ProviderToken<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
}

/**
 * An abstract class for inserting the root test component element in a platform independent way.
 *
 * @publicApi
 */
export declare class TestComponentRenderer {
    insertRootElement(rootElementId: string): void;
    removeAllRootElements?(): void;
}

/**
 * @publicApi
 */
export declare interface TestEnvironmentOptions {
    aotSummaries?: () => any[];
    teardown?: ModuleTeardownOptions;
}

/**
 * @publicApi
 */
export declare type TestModuleMetadata = {
    providers?: any[];
    declarations?: any[];
    imports?: any[];
    schemas?: Array<SchemaMetadata | any[]>;
    aotSummaries?: () => any[];
    teardown?: ModuleTeardownOptions;
};

/**
 * Simulates the asynchronous passage of time for the timers in the `fakeAsync` zone.
 *
 * The microtasks queue is drained at the very start of this function and after any timer callback
 * has been executed.
 *
 * @param millis The number of milliseconds to advance the virtual timer.
 * @param tickOptions The options to pass to the `tick()` function.
 *
 * @usageNotes
 *
 * The `tick()` option is a flag called `processNewMacroTasksSynchronously`,
 * which determines whether or not to invoke new macroTasks.
 *
 * If you provide a `tickOptions` object, but do not specify a
 * `processNewMacroTasksSynchronously` property (`tick(100, {})`),
 * then `processNewMacroTasksSynchronously` defaults to true.
 *
 * If you omit the `tickOptions` parameter (`tick(100))`), then
 * `tickOptions` defaults to `{processNewMacroTasksSynchronously: true}`.
 *
 * ### Example
 *
 * {@example core/testing/ts/fake_async.ts region='basic'}
 *
 * The following example includes a nested timeout (new macroTask), and
 * the `tickOptions` parameter is allowed to default. In this case,
 * `processNewMacroTasksSynchronously` defaults to true, and the nested
 * function is executed on each tick.
 *
 * ```
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick();
 *   expect(nestedTimeoutInvoked).toBe(true);
 * }));
 * ```
 *
 * In the following case, `processNewMacroTasksSynchronously` is explicitly
 * set to false, so the nested timeout function is not invoked.
 *
 * ```
 * it ('test with nested setTimeout', fakeAsync(() => {
 *   let nestedTimeoutInvoked = false;
 *   function funcWithNestedTimeout() {
 *     setTimeout(() => {
 *       nestedTimeoutInvoked = true;
 *     });
 *   };
 *   setTimeout(funcWithNestedTimeout);
 *   tick(0, {processNewMacroTasksSynchronously: false});
 *   expect(nestedTimeoutInvoked).toBe(false);
 * }));
 * ```
 *
 *
 * @publicApi
 */
export declare function tick(millis?: number, tickOptions?: {
    processNewMacroTasksSynchronously: boolean;
}): void;


/**
 * Wraps a test function in an asynchronous test zone. The test will automatically
 * complete when all asynchronous calls within this zone are done. Can be used
 * to wrap an {@link inject} call.
 *
 * Example:
 *
 * ```
 * it('...', waitForAsync(inject([AClass], (object) => {
 *   object.doSomething.then(() => {
 *     expect(...);
 *   })
 * });
 * ```
 *
 * @publicApi
 */
export declare function waitForAsync(fn: Function): (done: any) => any;

/**
 * @publicApi
 */
export declare function withModule(moduleDef: TestModuleMetadata): InjectSetupWrapper;

export declare function withModule(moduleDef: TestModuleMetadata, fn: Function): () => any;

/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * `TestBed` is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export declare class ɵangular_packages_core_testing_testing_a implements TestBed {
    /**
     * Teardown options that have been configured at the environment level.
     * Used as a fallback if no instance-level options have been provided.
     */
    private static _environmentTeardownOptions;
    /**
     * Teardown options that have been configured at the `TestBed` instance level.
     * These options take precedence over the environemnt-level ones.
     */
    private _instanceTeardownOptions;
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    static initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, summariesOrOptions?: TestEnvironmentOptions | (() => any[])): ɵangular_packages_core_testing_testing_a;
    /**
     * Reset the providers for the test injector.
     */
    static resetTestEnvironment(): void;
    static resetTestingModule(): TestBedStatic;
    /**
     * Allows overriding default compiler providers and settings
     * which are defined in test_injector.js
     */
    static configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): TestBedStatic;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef: TestModuleMetadata): TestBedStatic;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents(): Promise<any>;
    static overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): TestBedStatic;
    static overrideComponent(component: Type<any>, override: MetadataOverride<Component>): TestBedStatic;
    static overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): TestBedStatic;
    static overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): TestBedStatic;
    static overrideTemplate(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): TestBedStatic;
    static overrideProvider(token: any, provider: {
        useValue: any;
    }): TestBedStatic;
    static inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    static inject<T>(token: ProviderToken<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    static get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /**
     * @deprecated from v9.0.0 use TestBed.inject
     * @suppress {duplicate}
     */
    static get(token: any, notFoundValue?: any): any;
    static createComponent<T>(component: Type<T>): ComponentFixture<T>;
    static shouldTearDownTestingModule(): boolean;
    static tearDownTestingModule(): void;
    private _instantiated;
    private _compiler;
    private _moduleRef;
    private _moduleFactory;
    private _pendingModuleFactory;
    private _compilerOptions;
    private _moduleOverrides;
    private _componentOverrides;
    private _directiveOverrides;
    private _pipeOverrides;
    private _providers;
    private _declarations;
    private _imports;
    private _schemas;
    private _activeFixtures;
    private _testEnvAotSummaries;
    private _aotSummaries;
    private _templateOverrides;
    private _isRoot;
    private _rootProviderOverrides;
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, summariesOrOptions?: TestEnvironmentOptions | (() => any[])): void;
    /**
     * Reset the providers for the test injector.
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    private _initIfNeeded;
    private _createCompilerAndModule;
    private _assertNotInstantiated;
    inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: ProviderToken<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): void;
    overrideProvider(token: any, provider: {
        useValue: any;
    }): void;
    private overrideProviderImpl;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    createComponent<T>(component: Type<T>): ComponentFixture<T>;
    private destroyActiveFixtures;
    private shouldRethrowTeardownErrors;
    shouldTearDownTestingModule(): boolean;
    tearDownTestingModule(): void;
}

/**
 * @description
 * Configures and initializes environment for unit testing and provides methods for
 * creating components and services in unit tests.
 *
 * TestBed is the primary api for writing unit tests for Angular applications and libraries.
 *
 * Note: Use `TestBed` in tests. It will be set to either `TestBedViewEngine` or `TestBedRender3`
 * according to the compiler used.
 */
export declare class ɵangular_packages_core_testing_testing_b implements TestBed {
    /**
     * Teardown options that have been configured at the environment level.
     * Used as a fallback if no instance-level options have been provided.
     */
    private static _environmentTeardownOptions;
    /**
     * Teardown options that have been configured at the `TestBed` instance level.
     * These options take precedence over the environemnt-level ones.
     */
    private _instanceTeardownOptions;
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    static initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, summariesOrOptions?: TestEnvironmentOptions | (() => any[])): TestBed;
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    static resetTestEnvironment(): void;
    static configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): TestBedStatic;
    /**
     * Allows overriding default providers, directives, pipes, modules of the test injector,
     * which are defined in test_injector.js
     */
    static configureTestingModule(moduleDef: TestModuleMetadata): TestBedStatic;
    /**
     * Compile components with a `templateUrl` for the test's NgModule.
     * It is necessary to call this function
     * as fetching urls is asynchronous.
     */
    static compileComponents(): Promise<any>;
    static overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): TestBedStatic;
    static overrideComponent(component: Type<any>, override: MetadataOverride<Component>): TestBedStatic;
    static overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): TestBedStatic;
    static overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): TestBedStatic;
    static overrideTemplate(component: Type<any>, template: string): TestBedStatic;
    /**
     * Overrides the template of the given component, compiling the template
     * in the context of the TestingModule.
     *
     * Note: This works for JIT and AOTed components as well.
     */
    static overrideTemplateUsingTestingModule(component: Type<any>, template: string): TestBedStatic;
    static overrideProvider(token: any, provider: {
        useFactory: Function;
        deps: any[];
    }): TestBedStatic;
    static overrideProvider(token: any, provider: {
        useValue: any;
    }): TestBedStatic;
    static inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    static inject<T>(token: ProviderToken<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    static get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    static get(token: any, notFoundValue?: any): any;
    static createComponent<T>(component: Type<T>): ComponentFixture<T>;
    static resetTestingModule(): TestBedStatic;
    static shouldTearDownTestingModule(): boolean;
    static tearDownTestingModule(): void;
    platform: PlatformRef;
    ngModule: Type<any> | Type<any>[];
    private _compiler;
    private _testModuleRef;
    private _activeFixtures;
    private _globalCompilationChecked;
    /**
     * Initialize the environment for testing with a compiler factory, a PlatformRef, and an
     * angular module. These are common to every test in the suite.
     *
     * This may only be called once, to set up the common providers for the current test
     * suite on the current platform. If you absolutely need to change the providers,
     * first use `resetTestEnvironment`.
     *
     * Test modules and platforms for individual platforms are available from
     * '@angular/<platform_name>/testing'.
     *
     * @publicApi
     */
    initTestEnvironment(ngModule: Type<any> | Type<any>[], platform: PlatformRef, summariesOrOptions?: {
        teardown?: ModuleTeardownOptions;
    } | (() => any[])): void;
    /**
     * Reset the providers for the test injector.
     *
     * @publicApi
     */
    resetTestEnvironment(): void;
    resetTestingModule(): void;
    configureCompiler(config: {
        providers?: any[];
        useJit?: boolean;
    }): void;
    configureTestingModule(moduleDef: TestModuleMetadata): void;
    compileComponents(): Promise<any>;
    inject<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    inject<T>(token: ProviderToken<T>, notFoundValue: null, flags?: InjectFlags): T | null;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): any;
    /** @deprecated from v9.0.0 use TestBed.inject */
    get(token: any, notFoundValue?: any): any;
    execute(tokens: any[], fn: Function, context?: any): any;
    overrideModule(ngModule: Type<any>, override: MetadataOverride<NgModule>): void;
    overrideComponent(component: Type<any>, override: MetadataOverride<Component>): void;
    overrideTemplateUsingTestingModule(component: Type<any>, template: string): void;
    overrideDirective(directive: Type<any>, override: MetadataOverride<Directive>): void;
    overridePipe(pipe: Type<any>, override: MetadataOverride<Pipe>): void;
    /**
     * Overwrites all providers for the given token with the given provider definition.
     */
    overrideProvider(token: any, provider: {
        useFactory?: Function;
        useValue?: any;
        deps?: any[];
    }): void;
    createComponent<T>(type: Type<T>): ComponentFixture<T>;
    private assertNotInstantiated;
    /**
     * Check whether the module scoping queue should be flushed, and flush it if needed.
     *
     * When the TestBed is reset, it clears the JIT module compilation queue, cancelling any
     * in-progress module compilation. This creates a potential hazard - the very first time the
     * TestBed is initialized (or if it's reset without being initialized), there may be pending
     * compilations of modules declared in global scope. These compilations should be finished.
     *
     * To ensure that globally declared modules have their components scoped properly, this function
     * is called whenever TestBed is initialized or reset. The _first_ time that this happens, prior
     * to any other operations, the scoping queue is flushed.
     */
    private checkGlobalCompilationFinished;
    private destroyActiveFixtures;
    private shouldRethrowTeardownErrors;
    shouldTearDownTestingModule(): boolean;
    tearDownTestingModule(): void;
}

export declare function ɵangular_packages_core_testing_testing_c(): ɵangular_packages_core_testing_testing_b;

export declare class ɵMetadataOverrider {
    private _references;
    /**
     * Creates a new instance for the given metadata class
     * based on an old instance and overrides.
     */
    overrideMetadata<C extends T, T>(metadataClass: {
        new (options: T): C;
    }, oldMetadata: C, override: MetadataOverride<T>): C;
}

/**
 * Special interface to the compiler only used by testing
 *
 * @publicApi
 */
export declare class ɵTestingCompiler extends Compiler {
    get injector(): Injector;
    overrideModule(module: Type<any>, overrides: MetadataOverride<NgModule>): void;
    overrideDirective(directive: Type<any>, overrides: MetadataOverride<Directive>): void;
    overrideComponent(component: Type<any>, overrides: MetadataOverride<Component>): void;
    overridePipe(directive: Type<any>, overrides: MetadataOverride<Pipe>): void;
    /**
     * Allows to pass the compile summary from AOT compilation to the JIT compiler,
     * so that it can use the code generated by AOT.
     */
    loadAotSummaries(summaries: () => any[]): void;
    /**
     * Gets the component factory for the given component.
     * This assumes that the component has been compiled before calling this call using
     * `compileModuleAndAllComponents*`.
     */
    getComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
    /**
     * Returns the component type that is stored in the given error.
     * This can be used for errors created by compileModule...
     */
    getComponentFromError(error: Error): Type<any> | null;
    static ɵfac: ɵngcc0.ɵɵFactoryDeclaration<ɵTestingCompiler, never>;
    static ɵprov: ɵngcc0.ɵɵInjectableDeclaration<ɵTestingCompiler>;
}

/**
 * A factory for creating a Compiler
 *
 * @publicApi
 */
export declare abstract class ɵTestingCompilerFactory {
    abstract createTestingCompiler(options?: CompilerOptions[]): ɵTestingCompiler;
}

export { }

//# sourceMappingURL=testing.d.ts.map