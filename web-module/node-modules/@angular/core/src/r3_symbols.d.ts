/**
 * @license Angular v12.2.3
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */

/**
 * @description
 *
 * Represents an abstract class `T`, if applied to a concrete class it would stop being
 * instantiable.
 *
 * @publicApi
 */
declare interface AbstractType<T> extends Function {
    prototype: T;
}

/**
 * Base class that provides change detection functionality.
 * A change-detection tree collects all views that are to be checked for changes.
 * Use the methods to add and remove views from the tree, initiate change-detection,
 * and explicitly mark views as _dirty_, meaning that they have changed and need to be re-rendered.
 *
 * @see [Using change detection hooks](guide/lifecycle-hooks#using-change-detection-hooks)
 * @see [Defining custom change detection](guide/lifecycle-hooks#defining-custom-change-detection)
 *
 * @usageNotes
 *
 * The following examples demonstrate how to modify default change-detection behavior
 * to perform explicit detection when needed.
 *
 * ### Use `markForCheck()` with `CheckOnce` strategy
 *
 * The following example sets the `OnPush` change-detection strategy for a component
 * (`CheckOnce`, rather than the default `CheckAlways`), then forces a second check
 * after an interval. See [live demo](https://plnkr.co/edit/GC512b?p=preview).
 *
 * <code-example path="core/ts/change_detect/change-detection.ts"
 * region="mark-for-check"></code-example>
 *
 * ### Detach change detector to limit how often check occurs
 *
 * The following example defines a component with a large list of read-only data
 * that is expected to change constantly, many times per second.
 * To improve performance, we want to check and update the list
 * less often than the changes actually occur. To do that, we detach
 * the component's change detector and perform an explicit local check every five seconds.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="detach"></code-example>
 *
 *
 * ### Reattaching a detached component
 *
 * The following example creates a component displaying live data.
 * The component detaches its change detector from the main change detector tree
 * when the `live` property is set to false, and reattaches it when the property
 * becomes true.
 *
 * <code-example path="core/ts/change_detect/change-detection.ts" region="reattach"></code-example>
 *
 * @publicApi
 */
declare abstract class ChangeDetectorRef {
    /**
     * When a view uses the {@link ChangeDetectionStrategy#OnPush OnPush} (checkOnce)
     * change detection strategy, explicitly marks the view as changed so that
     * it can be checked again.
     *
     * Components are normally marked as dirty (in need of rerendering) when inputs
     * have changed or events have fired in the view. Call this method to ensure that
     * a component is checked even if these triggers have not occured.
     *
     * <!-- TODO: Add a link to a chapter on OnPush components -->
     *
     */
    abstract markForCheck(): void;
    /**
     * Detaches this view from the change-detection tree.
     * A detached view is  not checked until it is reattached.
     * Use in combination with `detectChanges()` to implement local change detection checks.
     *
     * Detached views are not checked during change detection runs until they are
     * re-attached, even if they are marked as dirty.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detach(): void;
    /**
     * Checks this view and its children. Use in combination with {@link ChangeDetectorRef#detach
     * detach}
     * to implement local change detection checks.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     * <!-- TODO: Add a live demo once ref.detectChanges is merged into master -->
     *
     */
    abstract detectChanges(): void;
    /**
     * Checks the change detector and its children, and throws if any changes are detected.
     *
     * Use in development mode to verify that running change detection doesn't introduce
     * other changes.
     */
    abstract checkNoChanges(): void;
    /**
     * Re-attaches the previously detached view to the change detection tree.
     * Views are attached to the tree by default.
     *
     * <!-- TODO: Add a link to a chapter on detach/reattach/local digest -->
     *
     */
    abstract reattach(): void;
}

/**
 * Base class for a factory that can create a component dynamically.
 * Instantiate a factory for a given type of component with `resolveComponentFactory()`.
 * Use the resulting `ComponentFactory.create()` method to create a component of that type.
 *
 * @see [Dynamic Components](guide/dynamic-component-loader)
 *
 * @publicApi
 */
declare abstract class ComponentFactory<C> {
    /**
     * The component's HTML selector.
     */
    abstract get selector(): string;
    /**
     * The type of component the factory will create.
     */
    abstract get componentType(): Type<any>;
    /**
     * Selector for all <ng-content> elements in the component.
     */
    abstract get ngContentSelectors(): string[];
    /**
     * The inputs of the component.
     */
    abstract get inputs(): {
        propName: string;
        templateName: string;
    }[];
    /**
     * The outputs of the component.
     */
    abstract get outputs(): {
        propName: string;
        templateName: string;
    }[];
    /**
     * Creates a new component.
     */
    abstract create(injector: Injector, projectableNodes?: any[][], rootSelectorOrNode?: string | any, ngModule?: NgModuleRef<any>): ComponentRef<C>;
}

/**
 * A simple registry that maps `Components` to generated `ComponentFactory` classes
 * that can be used to create instances of components.
 * Use to obtain the factory for a given component type,
 * then use the factory's `create()` method to create a component of that type.
 *
 * @see [Dynamic Components](guide/dynamic-component-loader)
 * @see [Usage Example](guide/dynamic-component-loader#resolving-components)
 * @see <live-example name="dynamic-component-loader" noDownload></live-example>
 of the code in this cookbook
 * @publicApi
 */
declare abstract class ComponentFactoryResolver {
    static NULL: ComponentFactoryResolver;
    /**
     * Retrieves the factory object that creates a component of the given type.
     * @param component The component type.
     */
    abstract resolveComponentFactory<T>(component: Type<T>): ComponentFactory<T>;
}

/**
 * Represents a component created by a `ComponentFactory`.
 * Provides access to the component instance and related objects,
 * and provides the means of destroying the instance.
 *
 * @publicApi
 */
declare abstract class ComponentRef<C> {
    /**
     * The host or anchor [element](guide/glossary#element) for this component instance.
     */
    abstract get location(): ElementRef;
    /**
     * The [dependency injector](guide/glossary#injector) for this component instance.
     */
    abstract get injector(): Injector;
    /**
     * This component instance.
     */
    abstract get instance(): C;
    /**
     * The [host view](guide/glossary#view-tree) defined by the template
     * for this component instance.
     */
    abstract get hostView(): ViewRef;
    /**
     * The change detector for this component instance.
     */
    abstract get changeDetectorRef(): ChangeDetectorRef;
    /**
     * The type of this component (as created by a `ComponentFactory` class).
     */
    abstract get componentType(): Type<any>;
    /**
     * Destroys the component instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for the component.
     * @param callback A handler function that cleans up developer-defined data
     * associated with this component. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): void;
}

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface ConstructorProvider extends ConstructorSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: Type<any>;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of a token.
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ```ts
 * @Injectable(SomeModule, {deps: []})
 * class MyService {}
 * ```
 *
 * @publicApi
 */
declare interface ConstructorSansProvider {
    /**
     * A list of `token`s to be resolved by the injector.
     */
    deps?: any[];
}

/**
 * An object literal of this type is used to represent the metadata of a constructor dependency.
 * The type itself is never referred to from generated code.
 *
 * @publicApi
 */
declare type CtorDependency = {
    /**
     * If an `@Attribute` decorator is used, this represents the injected attribute's name. If the
     * attribute name is a dynamic expression instead of a string literal, this will be the unknown
     * type.
     */
    attribute?: string | unknown;
    /**
     * If `@Optional()` is used, this key is set to true.
     */
    optional?: true;
    /**
     * If `@Host` is used, this key is set to true.
     */
    host?: true;
    /**
     * If `@Self` is used, this key is set to true.
     */
    self?: true;
    /**
     * If `@SkipSelf` is used, this key is set to true.
     */
    skipSelf?: true;
} | null;

/**
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](https://g.co/ng/security).
 *
 * @publicApi
 */
declare class ElementRef<T = any> {
    /**
     * The underlying native element or `null` if direct access to native elements is not supported
     * (e.g. when the application runs in a web worker).
     *
     * <div class="callout is-critical">
     *   <header>Use with caution</header>
     *   <p>
     *    Use this API as the last resort when direct access to DOM is needed. Use templating and
     *    data-binding provided by Angular instead. Alternatively you can take a look at {@link
     * Renderer2}
     *    which provides API that can safely be used even when direct access to native elements is not
     *    supported.
     *   </p>
     *   <p>
     *    Relying on direct DOM access creates tight coupling between your application and rendering
     *    layers which will make it impossible to separate the two and deploy your application into a
     *    web worker.
     *   </p>
     * </div>
     *
     */
    nativeElement: T;
    constructor(nativeElement: T);
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='ExistingProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface ExistingProvider extends ExistingSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value of another `useExisting` token.
 *
 * @see `ExistingProvider`
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @publicApi
 */
declare interface ExistingSansProvider {
    /**
     * Existing `token` to return. (Equivalent to `injector.get(useExisting)`)
     */
    useExisting: any;
}

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProvider'}
 *
 * Dependencies can also be marked as optional:
 *
 * {@example core/di/ts/provider_spec.ts region='FactoryProviderOptionalDeps'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface FactoryProvider extends FactorySansProvider {
    /**
     * An injection token. (Typically an instance of `Type` or `InjectionToken`, but can be `any`).
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value by invoking a `useFactory` function.
 *
 * @see `FactoryProvider`
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @publicApi
 */
declare interface FactorySansProvider {
    /**
     * A function to invoke to create a value for this `token`. The function is invoked with
     * resolved values of `token`s in the `deps` field.
     */
    useFactory: Function;
    /**
     * A list of `token`s to be resolved by the injector. The list of values is then
     * used as arguments to the `useFactory` function.
     */
    deps?: any[];
}

/**
 * Injection flags for DI.
 *
 * @publicApi
 */
declare enum InjectFlags {
    /** Check self and check parent injector if needed */
    Default = 0,
    /**
     * Specifies that an injector should retrieve a dependency from any injector until reaching the
     * host element of the current component. (Only used with Element Injector)
     */
    Host = 1,
    /** Don't ascend to ancestors of the node requesting injection. */
    Self = 2,
    /** Skip the node that is requesting injection. */
    SkipSelf = 4,
    /** Inject `defaultValue` instead if token not found. */
    Optional = 8
}

/**
 * Creates a token that can be used in a DI Provider.
 *
 * Use an `InjectionToken` whenever the type you are injecting is not reified (does not have a
 * runtime representation) such as when injecting an interface, callable type, array or
 * parameterized type.
 *
 * `InjectionToken` is parameterized on `T` which is the type of object which will be returned by
 * the `Injector`. This provides additional level of type safety.
 *
 * ```
 * interface MyInterface {...}
 * var myInterface = injector.get(new InjectionToken<MyInterface>('SomeToken'));
 * // myInterface is inferred to be MyInterface.
 * ```
 *
 * When creating an `InjectionToken`, you can optionally specify a factory function which returns
 * (possibly by creating) a default value of the parameterized type `T`. This sets up the
 * `InjectionToken` using this factory as a provider as if it was defined explicitly in the
 * application's root injector. If the factory function, which takes zero arguments, needs to inject
 * dependencies, it can do so using the `inject` function. See below for an example.
 *
 * Additionally, if a `factory` is specified you can also specify the `providedIn` option, which
 * overrides the above behavior and marks the token as belonging to a particular `@NgModule`. As
 * mentioned above, `'root'` is the default value for `providedIn`.
 *
 * @usageNotes
 * ### Basic Example
 *
 * ### Plain InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='InjectionToken'}
 *
 * ### Tree-shakable InjectionToken
 *
 * {@example core/di/ts/injector_spec.ts region='ShakableInjectionToken'}
 *
 *
 * @publicApi
 */
declare class InjectionToken<T> {
    protected _desc: string;
    readonly ɵprov: unknown;
    constructor(_desc: string, options?: {
        providedIn?: Type<any> | 'root' | 'platform' | 'any' | null;
        factory: () => T;
    });
    toString(): string;
}

/**
 * Concrete injectors implement this interface. Injectors are configured
 * with [providers](guide/glossary#provider) that associate
 * dependencies of various types with [injection tokens](guide/glossary#di-token).
 *
 * @see ["DI Providers"](guide/dependency-injection-providers).
 * @see `StaticProvider`
 *
 * @usageNotes
 *
 *  The following example creates a service injector instance.
 *
 * {@example core/di/ts/provider_spec.ts region='ConstructorProvider'}
 *
 * ### Usage example
 *
 * {@example core/di/ts/injector_spec.ts region='Injector'}
 *
 * `Injector` returns itself when given `Injector` as a token:
 *
 * {@example core/di/ts/injector_spec.ts region='injectInjector'}
 *
 * @publicApi
 */
declare abstract class Injector {
    static THROW_IF_NOT_FOUND: {};
    static NULL: Injector;
    /**
     * Retrieves an instance from the injector based on the provided token.
     * @returns The instance from the injector if defined, otherwise the `notFoundValue`.
     * @throws When the `notFoundValue` is `undefined` or `Injector.THROW_IF_NOT_FOUND`.
     */
    abstract get<T>(token: ProviderToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
    /**
     * @deprecated from v4.0.0 use ProviderToken<T>
     * @suppress {duplicate}
     */
    abstract get(token: any, notFoundValue?: any): any;
    /**
     * @deprecated from v5 use the new signature Injector.create(options)
     */
    static create(providers: StaticProvider[], parent?: Injector): Injector;
    /**
     * Creates a new injector instance that provides one or more dependencies,
     * according to a given type or types of `StaticProvider`.
     *
     * @param options An object with the following properties:
     * * `providers`: An array of providers of the [StaticProvider type](api/core/StaticProvider).
     * * `parent`: (optional) A parent injector.
     * * `name`: (optional) A developer-defined identifying name for the new injector.
     *
     * @returns The new injector instance.
     *
     */
    static create(options: {
        providers: StaticProvider[];
        parent?: Injector;
        name?: string;
    }): Injector;
    /** @nocollapse */
    static ɵprov: unknown;
}

/**
 * A type which has an `InjectorDef` static field.
 *
 * `InjectorTypes` can be used to configure a `StaticInjector`.
 *
 * This is an opaque type whose structure is highly version dependent. Do not rely on any
 * properties.
 *
 * @publicApi
 */
declare interface InjectorType<T> extends Type<T> {
    ɵfac?: unknown;
    ɵinj: unknown;
}

/**
 * The existence of this constant (in this particular file) informs the Angular compiler that the
 * current program is actually @angular/core, which needs to be compiled specially.
 */
export declare const ITS_JUST_ANGULAR = true;

/**
 * Runtime link information for NgModules.
 *
 * This is the internal data structure used by the runtime to assemble components, directives,
 * pipes, and injectors.
 *
 * NOTE: Always use `ɵɵdefineNgModule` function to create this object,
 * never create the object directly since the shape of this object
 * can change between versions.
 */
export declare interface NgModuleDef<T> {
    /** Token representing the module. Used by DI. */
    type: T;
    /** List of components to bootstrap. */
    bootstrap: Type<any>[] | (() => Type<any>[]);
    /** List of components, directives, and pipes declared by this module. */
    declarations: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports: Type<any>[] | (() => Type<any>[]);
    /**
     * Cached value of computed `transitiveCompileScopes` for this module.
     *
     * This should never be read directly, but accessed via `transitiveScopesFor`.
     */
    transitiveCompileScopes: NgModuleTransitiveScopes | null;
    /** The set of schemas that declare elements to be allowed in the NgModule. */
    schemas: SchemaMetadata[] | null;
    /** Unique ID for the module with which it should be registered.  */
    id: string | null;
}

export declare class NgModuleFactory<T> extends NgModuleFactory_2<T> {
    moduleType: Type<T>;
    constructor(moduleType: Type<T>);
    create(parentInjector: Injector | null): NgModuleRef<T>;
}

/**
 * @publicApi
 */
declare abstract class NgModuleFactory_2<T> {
    abstract get moduleType(): Type<T>;
    abstract create(parentInjector: Injector | null): NgModuleRef<T>;
}

/**
 * Represents an instance of an `NgModule` created by an `NgModuleFactory`.
 * Provides access to the `NgModule` instance and related objects.
 *
 * @publicApi
 */
declare abstract class NgModuleRef<T> {
    /**
     * The injector that contains all of the providers of the `NgModule`.
     */
    abstract get injector(): Injector;
    /**
     * The resolver that can retrieve the component factories
     * declared in the `entryComponents` property of the module.
     */
    abstract get componentFactoryResolver(): ComponentFactoryResolver;
    /**
     * The `NgModule` instance.
     */
    abstract get instance(): T;
    /**
     * Destroys the module instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Registers a callback to be executed when the module is destroyed.
     */
    abstract onDestroy(callback: () => void): void;
}

/**
 * Represents the expansion of an `NgModule` into its scopes.
 *
 * A scope is a set of directives and pipes that are visible in a particular context. Each
 * `NgModule` has two scopes. The `compilation` scope is the set of directives and pipes that will
 * be recognized in the templates of components declared by the module. The `exported` scope is the
 * set of directives and pipes exported by a module (that is, module B's exported scope gets added
 * to module A's compilation scope when module A imports B).
 */
declare interface NgModuleTransitiveScopes {
    compilation: {
        directives: Set<any>;
        pipes: Set<any>;
    };
    exported: {
        directives: Set<any>;
        pipes: Set<any>;
    };
    schemas: SchemaMetadata[] | null;
}

/**
 * @description
 *
 * Token that can be used to retrieve an instance from an injector or through a query.
 *
 * @publicApi
 */
declare type ProviderToken<T> = Type<T> | AbstractType<T> | InjectionToken<T>;


/**
 * A schema definition associated with an NgModule.
 *
 * @see `@NgModule`, `CUSTOM_ELEMENTS_SCHEMA`, `NO_ERRORS_SCHEMA`
 *
 * @param name The name of a defined schema.
 *
 * @publicApi
 */
declare interface SchemaMetadata {
    name: string;
}

/**
 * Adds decorator, constructor, and property metadata to a given type via static metadata fields
 * on the type.
 *
 * These metadata fields can later be read with Angular's `ReflectionCapabilities` API.
 *
 * Calls to `setClassMetadata` can be guarded by ngDevMode, resulting in the metadata assignments
 * being tree-shaken away during production builds.
 */
export declare function setClassMetadata(type: Type<any>, decorators: any[] | null, ctorParameters: (() => any[]) | null, propDecorators: {
    [field: string]: any;
} | null): void;

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProvider'}
 *
 * Note that following two providers are not equal:
 *
 * {@example core/di/ts/provider_spec.ts region='StaticClassProviderDifference'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface StaticClassProvider extends StaticClassSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return an instance of `useClass` for a token.
 * Base for `StaticClassProvider` decorator.
 *
 * @publicApi
 */
declare interface StaticClassSansProvider {
    /**
     * An optional class to instantiate for the `token`. By default, the `provide`
     * class is instantiated.
     */
    useClass: Type<any>;
    /**
     * A list of `token`s to be resolved by the injector. The list of values is then
     * used as arguments to the `useClass` constructor.
     */
    deps: any[];
}

/**
 * Describes how an `Injector` should be configured as static (that is, without reflection).
 * A static provider provides tokens to an injector for various types of dependencies.
 *
 * @see `Injector.create()`.
 * @see ["Dependency Injection Guide"](guide/dependency-injection-providers).
 *
 * @publicApi
 */
declare type StaticProvider = ValueProvider | ExistingProvider | StaticClassProvider | ConstructorProvider | FactoryProvider | any[];

/**
 * @description
 *
 * Represents a type that a Component or other object is instances of.
 *
 * An example of a `Type` is `MyCustomComponent` class, which in JavaScript is represented by
 * the `MyCustomComponent` constructor function.
 *
 * @publicApi
 */
declare const Type: FunctionConstructor;

declare interface Type<T> extends Function {
    new (...args: any[]): T;
}

/**
 * Configures the `Injector` to return a value for a token.
 * @see ["Dependency Injection Guide"](guide/dependency-injection).
 *
 * @usageNotes
 *
 * ### Example
 *
 * {@example core/di/ts/provider_spec.ts region='ValueProvider'}
 *
 * ### Multi-value example
 *
 * {@example core/di/ts/provider_spec.ts region='MultiProviderAspect'}
 *
 * @publicApi
 */
declare interface ValueProvider extends ValueSansProvider {
    /**
     * An injection token. Typically an instance of `Type` or `InjectionToken`, but can be `any`.
     */
    provide: any;
    /**
     * When true, injector returns an array of instances. This is useful to allow multiple
     * providers spread across many files to provide configuration information to a common token.
     */
    multi?: boolean;
}

/**
 * Configures the `Injector` to return a value for a token.
 * Base for `ValueProvider` decorator.
 *
 * @publicApi
 */
declare interface ValueSansProvider {
    /**
     * The value to inject.
     */
    useValue: any;
}

/**
 * Represents an Angular [view](guide/glossary#view "Definition").
 *
 * @see {@link ChangeDetectorRef#usage-notes Change detection usage}
 *
 * @publicApi
 */
declare abstract class ViewRef extends ChangeDetectorRef {
    /**
     * Destroys this view and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Reports whether this view has been destroyed.
     * @returns True after the `destroy()` method has been called, false otherwise.
     */
    abstract get destroyed(): boolean;
    /**
     * A lifecycle hook that provides additional developer-defined cleanup
     * functionality for views.
     * @param callback A handler function that cleans up developer-defined data
     * associated with a view. Called when the `destroy()` method is invoked.
     */
    abstract onDestroy(callback: Function): any /** TODO #9100 */;
}


/**
 * Convince closure compiler that the wrapped function has no side-effects.
 *
 * Closure compiler always assumes that `toString` has no side-effects. We use this quirk to
 * allow us to execute a function but have closure compiler mark the call as no-side-effects.
 * It is important that the return value for the `noSideEffects` function be assigned
 * to something which is retained otherwise the call to `noSideEffects` will be removed by closure
 * compiler.
 */
export declare function ɵnoSideEffects<T>(fn: () => T): T;

/**
 * Construct an injectable definition which defines how a token will be constructed by the DI
 * system, and in which injectors (if any) it will be available.
 *
 * This should be assigned to a static `ɵprov` field on a type, which will then be an
 * `InjectableType`.
 *
 * Options:
 * * `providedIn` determines which injectors will include the injectable, by either associating it
 *   with an `@NgModule` or other `InjectorType`, or by specifying that this injectable should be
 *   provided in the `'root'` injector, which will be the application-level injector in most apps.
 * * `factory` gives the zero argument function which will create an instance of the injectable.
 *   The factory can call `inject` to access the `Injector` and request injection of dependencies.
 *
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export declare function ɵɵdefineInjectable<T>(opts: {
    token: unknown;
    providedIn?: Type<any> | 'root' | 'platform' | 'any' | null;
    factory: () => T;
}): unknown;

/**
 * Construct an `InjectorDef` which configures an injector.
 *
 * This should be assigned to a static injector def (`ɵinj`) field on a type, which will then be an
 * `InjectorType`.
 *
 * Options:
 *
 * * `providers`: an optional array of providers to add to the injector. Each provider must
 *   either have a factory or point to a type which has a `ɵprov` static property (the
 *   type must be an `InjectableType`).
 * * `imports`: an optional array of imports of other `InjectorType`s or `InjectorTypeWithModule`s
 *   whose providers will also be added to the injector. Locally provided types will override
 *   providers from imports.
 *
 * @codeGenApi
 */
export declare function ɵɵdefineInjector(options: {
    providers?: any[];
    imports?: any[];
}): unknown;

/**
 * @codeGenApi
 */
export declare function ɵɵdefineNgModule<T>(def: {
    /** Token representing the module. Used by DI. */
    type: T;
    /** List of components to bootstrap. */
    bootstrap?: Type<any>[] | (() => Type<any>[]);
    /** List of components, directives, and pipes declared by this module. */
    declarations?: Type<any>[] | (() => Type<any>[]);
    /** List of modules or `ModuleWithProviders` imported by this module. */
    imports?: Type<any>[] | (() => Type<any>[]);
    /**
     * List of modules, `ModuleWithProviders`, components, directives, or pipes exported by this
     * module.
     */
    exports?: Type<any>[] | (() => Type<any>[]);
    /** The set of schemas that declare elements to be allowed in the NgModule. */
    schemas?: SchemaMetadata[] | null;
    /** Unique ID for the module that is used with `getModuleFactory`. */
    id?: string | null;
}): unknown;

/**
 * @publicApi
 */
export declare type ɵɵFactoryDeclaration<T, CtorDependencies extends CtorDependency[]> = unknown;

/**
 * Generated instruction: Injects a token from the currently active injector.
 *
 * Must be used in the context of a factory function such as one defined for an
 * `InjectionToken`. Throws an error if not called from such a context.
 *
 * (Additional documentation moved to `inject`, as it is the public API, and an alias for this
 * instruction)
 *
 * @see inject
 * @codeGenApi
 * @publicApi This instruction has been emitted by ViewEngine for some time and is deployed to npm.
 */
export declare function ɵɵinject<T>(token: ProviderToken<T>): T;

export declare function ɵɵinject<T>(token: ProviderToken<T>, flags?: InjectFlags): T | null;

/**
 * Information about how a type or `InjectionToken` interfaces with the DI system.
 *
 * At a minimum, this includes a `factory` which defines how to create the given type `T`, possibly
 * requesting injection of other types if necessary.
 *
 * Optionally, a `providedIn` parameter specifies that the given type belongs to a particular
 * `Injector`, `NgModule`, or a special scope (e.g. `'root'`). A value of `null` indicates
 * that the injectable does not belong to any scope.
 *
 * @codeGenApi
 * @publicApi The ViewEngine compiler emits code with this type for injectables. This code is
 *   deployed to npm, and should be treated as public api.

 */
export declare interface ɵɵInjectableDeclaration<T> {
    /**
     * Specifies that the given type belongs to a particular injector:
     * - `InjectorType` such as `NgModule`,
     * - `'root'` the root injector
     * - `'any'` all injectors.
     * - `null`, does not belong to any injector. Must be explicitly listed in the injector
     *   `providers`.
     */
    providedIn: InjectorType<any> | 'root' | 'platform' | 'any' | null;
    /**
     * The token to which this definition belongs.
     *
     * Note that this may not be the same as the type that the `factory` will create.
     */
    token: unknown;
    /**
     * Factory method to execute to create an instance of the injectable.
     */
    factory: (t?: Type<any>) => T;
    /**
     * In a case of no explicit injector, a location where the instance of the injectable is stored.
     */
    value: T | undefined;
}

/**
 * @publicApi
 */
export declare type ɵɵInjectorDeclaration<T> = unknown;

/**
 * @publicApi
 */
export declare type ɵɵNgModuleDeclaration<T, Declarations, Imports, Exports> = unknown;

export { }
