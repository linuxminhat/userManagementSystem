/**
 * @license Angular v12.2.3
 * (c) 2010-2021 Google LLC. https://angular.io/
 * License: MIT
 */

(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@angular/animations', ['exports'], factory) :
    (global = global || self, factory((global.ng = global.ng || {}, global.ng.animations = {})));
}(this, (function (exports) { 'use strict';

    /**
     * An injectable service that produces an animation sequence programmatically within an
     * Angular component or directive.
     * Provided by the `BrowserAnimationsModule` or `NoopAnimationsModule`.
     *
     * @usageNotes
     *
     * To use this service, add it to your component or directive as a dependency.
     * The service is instantiated along with your component.
     *
     * Apps do not typically need to create their own animation players, but if you
     * do need to, follow these steps:
     *
     * 1. Use the `build()` method to create a programmatic animation using the
     * `animate()` function. The method returns an `AnimationFactory` instance.
     *
     * 2. Use the factory object to create an `AnimationPlayer` and attach it to a DOM element.
     *
     * 3. Use the player object to control the animation programmatically.
     *
     * For example:
     *
     * ```ts
     * // import the service from BrowserAnimationsModule
     * import {AnimationBuilder} from '@angular/animations';
     * // require the service as a dependency
     * class MyCmp {
     *   constructor(private _builder: AnimationBuilder) {}
     *
     *   makeAnimation(element: any) {
     *     // first define a reusable animation
     *     const myAnimation = this._builder.build([
     *       style({ width: 0 }),
     *       animate(1000, style({ width: '100px' }))
     *     ]);
     *
     *     // use the returned factory object to create a player
     *     const player = myAnimation.create(element);
     *
     *     player.play();
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    var AnimationBuilder = /** @class */ (function () {
        function AnimationBuilder() {
        }
        return AnimationBuilder;
    }());
    /**
     * A factory object returned from the `AnimationBuilder`.`build()` method.
     *
     * @publicApi
     */
    var AnimationFactory = /** @class */ (function () {
        function AnimationFactory() {
        }
        return AnimationFactory;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * Specifies automatic styling.
     *
     * @publicApi
     */
    var AUTO_STYLE = '*';
    /**
     * Creates a named animation trigger, containing a  list of `state()`
     * and `transition()` entries to be evaluated when the expression
     * bound to the trigger changes.
     *
     * @param name An identifying string.
     * @param definitions  An animation definition object, containing an array of `state()`
     * and `transition()` declarations.
     *
     * @return An object that encapsulates the trigger data.
     *
     * @usageNotes
     * Define an animation trigger in the `animations` section of `@Component` metadata.
     * In the template, reference the trigger by name and bind it to a trigger expression that
     * evaluates to a defined animation state, using the following format:
     *
     * `[@triggerName]="expression"`
     *
     * Animation trigger bindings convert all values to strings, and then match the
     * previous and current values against any linked transitions.
     * Booleans can be specified as `1` or `true` and `0` or `false`.
     *
     * ### Usage Example
     *
     * The following example creates an animation trigger reference based on the provided
     * name value.
     * The provided animation value is expected to be an array consisting of state and
     * transition declarations.
     *
     * ```typescript
     * @Component({
     *   selector: "my-component",
     *   templateUrl: "my-component-tpl.html",
     *   animations: [
     *     trigger("myAnimationTrigger", [
     *       state(...),
     *       state(...),
     *       transition(...),
     *       transition(...)
     *     ])
     *   ]
     * })
     * class MyComponent {
     *   myStatusExp = "something";
     * }
     * ```
     *
     * The template associated with this component makes use of the defined trigger
     * by binding to an element within its template code.
     *
     * ```html
     * <!-- somewhere inside of my-component-tpl.html -->
     * <div [@myAnimationTrigger]="myStatusExp">...</div>
     * ```
     *
     * ### Using an inline function
     * The `transition` animation method also supports reading an inline function which can decide
     * if its associated animation should be run.
     *
     * ```typescript
     * // this method is run each time the `myAnimationTrigger` trigger value changes.
     * function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
     string]: any}): boolean {
     *   // notice that `element` and `params` are also available here
     *   return toState == 'yes-please-animate';
     * }
     *
     * @Component({
     *   selector: 'my-component',
     *   templateUrl: 'my-component-tpl.html',
     *   animations: [
     *     trigger('myAnimationTrigger', [
     *       transition(myInlineMatcherFn, [
     *         // the animation sequence code
     *       ]),
     *     ])
     *   ]
     * })
     * class MyComponent {
     *   myStatusExp = "yes-please-animate";
     * }
     * ```
     *
     * ### Disabling Animations
     * When true, the special animation control binding `@.disabled` binding prevents
     * all animations from rendering.
     * Place the  `@.disabled` binding on an element to disable
     * animations on the element itself, as well as any inner animation triggers
     * within the element.
     *
     * The following example shows how to use this feature:
     *
     * ```typescript
     * @Component({
     *   selector: 'my-component',
     *   template: `
     *     <div [@.disabled]="isDisabled">
     *       <div [@childAnimation]="exp"></div>
     *     </div>
     *   `,
     *   animations: [
     *     trigger("childAnimation", [
     *       // ...
     *     ])
     *   ]
     * })
     * class MyComponent {
     *   isDisabled = true;
     *   exp = '...';
     * }
     * ```
     *
     * When `@.disabled` is true, it prevents the `@childAnimation` trigger from animating,
     * along with any inner animations.
     *
     * ### Disable animations application-wide
     * When an area of the template is set to have animations disabled,
     * **all** inner components have their animations disabled as well.
     * This means that you can disable all animations for an app
     * by placing a host binding set on `@.disabled` on the topmost Angular component.
     *
     * ```typescript
     * import {Component, HostBinding} from '@angular/core';
     *
     * @Component({
     *   selector: 'app-component',
     *   templateUrl: 'app.component.html',
     * })
     * class AppComponent {
     *   @HostBinding('@.disabled')
     *   public animationsDisabled = true;
     * }
     * ```
     *
     * ### Overriding disablement of inner animations
     * Despite inner animations being disabled, a parent animation can `query()`
     * for inner elements located in disabled areas of the template and still animate
     * them if needed. This is also the case for when a sub animation is
     * queried by a parent and then later animated using `animateChild()`.
     *
     * ### Detecting when an animation is disabled
     * If a region of the DOM (or the entire application) has its animations disabled, the animation
     * trigger callbacks still fire, but for zero seconds. When the callback fires, it provides
     * an instance of an `AnimationEvent`. If animations are disabled,
     * the `.disabled` flag on the event is true.
     *
     * @publicApi
     */
    function trigger(name, definitions) {
        return { type: 7 /* Trigger */, name: name, definitions: definitions, options: {} };
    }
    /**
     * Defines an animation step that combines styling information with timing information.
     *
     * @param timings Sets `AnimateTimings` for the parent animation.
     * A string in the format "duration [delay] [easing]".
     *  - Duration and delay are expressed as a number and optional time unit,
     * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
     * The default unit is milliseconds.
     *  - The easing value controls how the animation accelerates and decelerates
     * during its runtime. Value is one of  `ease`, `ease-in`, `ease-out`,
     * `ease-in-out`, or a `cubic-bezier()` function call.
     * If not supplied, no easing is applied.
     *
     * For example, the string "1s 100ms ease-out" specifies a duration of
     * 1000 milliseconds, and delay of 100 ms, and the "ease-out" easing style,
     * which decelerates near the end of the duration.
     * @param styles Sets AnimationStyles for the parent animation.
     * A function call to either `style()` or `keyframes()`
     * that returns a collection of CSS style entries to be applied to the parent animation.
     * When null, uses the styles from the destination state.
     * This is useful when describing an animation step that will complete an animation;
     * see "Animating to the final state" in `transitions()`.
     * @returns An object that encapsulates the animation step.
     *
     * @usageNotes
     * Call within an animation `sequence()`, `{@link animations/group group()}`, or
     * `transition()` call to specify an animation step
     * that applies given style data to the parent animation for a given amount of time.
     *
     * ### Syntax Examples
     * **Timing examples**
     *
     * The following examples show various `timings` specifications.
     * - `animate(500)` : Duration is 500 milliseconds.
     * - `animate("1s")` : Duration is 1000 milliseconds.
     * - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
     * - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
     * - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10
     * milliseconds, easing according to a bezier curve.
     *
     * **Style examples**
     *
     * The following example calls `style()` to set a single CSS style.
     * ```typescript
     * animate(500, style({ background: "red" }))
     * ```
     * The following example calls `keyframes()` to set a CSS style
     * to different values for successive keyframes.
     * ```typescript
     * animate(500, keyframes(
     *  [
     *   style({ background: "blue" }),
     *   style({ background: "red" })
     *  ])
     * ```
     *
     * @publicApi
     */
    function animate(timings, styles) {
        if (styles === void 0) { styles = null; }
        return { type: 4 /* Animate */, styles: styles, timings: timings };
    }
    /**
     * @description Defines a list of animation steps to be run in parallel.
     *
     * @param steps An array of animation step objects.
     * - When steps are defined by `style()` or `animate()`
     * function calls, each call within the group is executed instantly.
     * - To specify offset styles to be applied at a later time, define steps with
     * `keyframes()`, or use `animate()` calls with a delay value.
     * For example:
     *
     * ```typescript
     * group([
     *   animate("1s", style({ background: "black" })),
     *   animate("2s", style({ color: "white" }))
     * ])
     * ```
     *
     * @param options An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation.
     *
     * @return An object that encapsulates the group data.
     *
     * @usageNotes
     * Grouped animations are useful when a series of styles must be
     * animated at different starting times and closed off at different ending times.
     *
     * When called within a `sequence()` or a
     * `transition()` call, does not continue to the next
     * instruction until all of the inner animation steps have completed.
     *
     * @publicApi
     */
    function group(steps, options) {
        if (options === void 0) { options = null; }
        return { type: 3 /* Group */, steps: steps, options: options };
    }
    /**
     * Defines a list of animation steps to be run sequentially, one by one.
     *
     * @param steps An array of animation step objects.
     * - Steps defined by `style()` calls apply the styling data immediately.
     * - Steps defined by `animate()` calls apply the styling data over time
     *   as specified by the timing data.
     *
     * ```typescript
     * sequence([
     *   style({ opacity: 0 }),
     *   animate("1s", style({ opacity: 1 }))
     * ])
     * ```
     *
     * @param options An options object containing a delay and
     * developer-defined parameters that provide styling defaults and
     * can be overridden on invocation.
     *
     * @return An object that encapsulates the sequence data.
     *
     * @usageNotes
     * When you pass an array of steps to a
     * `transition()` call, the steps run sequentially by default.
     * Compare this to the `{@link animations/group group()}` call, which runs animation steps in
     *parallel.
     *
     * When a sequence is used within a `{@link animations/group group()}` or a `transition()` call,
     * execution continues to the next instruction only after each of the inner animation
     * steps have completed.
     *
     * @publicApi
     **/
    function sequence(steps, options) {
        if (options === void 0) { options = null; }
        return { type: 2 /* Sequence */, steps: steps, options: options };
    }
    /**
     * Declares a key/value object containing CSS properties/styles that
     * can then be used for an animation `state`, within an animation `sequence`,
     * or as styling data for calls to `animate()` and `keyframes()`.
     *
     * @param tokens A set of CSS styles or HTML styles associated with an animation state.
     * The value can be any of the following:
     * - A key-value style pair associating a CSS property with a value.
     * - An array of key-value style pairs.
     * - An asterisk (*), to use auto-styling, where styles are derived from the element
     * being animated and applied to the animation when it starts.
     *
     * Auto-styling can be used to define a state that depends on layout or other
     * environmental factors.
     *
     * @return An object that encapsulates the style data.
     *
     * @usageNotes
     * The following examples create animation styles that collect a set of
     * CSS property values:
     *
     * ```typescript
     * // string values for CSS properties
     * style({ background: "red", color: "blue" })
     *
     * // numerical pixel values
     * style({ width: 100, height: 0 })
     * ```
     *
     * The following example uses auto-styling to allow a component to animate from
     * a height of 0 up to the height of the parent element:
     *
     * ```
     * style({ height: 0 }),
     * animate("1s", style({ height: "*" }))
     * ```
     *
     * @publicApi
     **/
    function style(tokens) {
        return { type: 6 /* Style */, styles: tokens, offset: null };
    }
    /**
     * Declares an animation state within a trigger attached to an element.
     *
     * @param name One or more names for the defined state in a comma-separated string.
     * The following reserved state names can be supplied to define a style for specific use
     * cases:
     *
     * - `void` You can associate styles with this name to be used when
     * the element is detached from the application. For example, when an `ngIf` evaluates
     * to false, the state of the associated element is void.
     *  - `*` (asterisk) Indicates the default state. You can associate styles with this name
     * to be used as the fallback when the state that is being animated is not declared
     * within the trigger.
     *
     * @param styles A set of CSS styles associated with this state, created using the
     * `style()` function.
     * This set of styles persists on the element once the state has been reached.
     * @param options Parameters that can be passed to the state when it is invoked.
     * 0 or more key-value pairs.
     * @return An object that encapsulates the new state data.
     *
     * @usageNotes
     * Use the `trigger()` function to register states to an animation trigger.
     * Use the `transition()` function to animate between states.
     * When a state is active within a component, its associated styles persist on the element,
     * even when the animation ends.
     *
     * @publicApi
     **/
    function state(name, styles, options) {
        return { type: 0 /* State */, name: name, styles: styles, options: options };
    }
    /**
     * Defines a set of animation styles, associating each style with an optional `offset` value.
     *
     * @param steps A set of animation styles with optional offset data.
     * The optional `offset` value for a style specifies a percentage of the total animation
     * time at which that style is applied.
     * @returns An object that encapsulates the keyframes data.
     *
     * @usageNotes
     * Use with the `animate()` call. Instead of applying animations
     * from the current state
     * to the destination state, keyframes describe how each style entry is applied and at what point
     * within the animation arc.
     * Compare [CSS Keyframe Animations](https://www.w3schools.com/css/css3_animations.asp).
     *
     * ### Usage
     *
     * In the following example, the offset values describe
     * when each `backgroundColor` value is applied. The color is red at the start, and changes to
     * blue when 20% of the total time has elapsed.
     *
     * ```typescript
     * // the provided offset values
     * animate("5s", keyframes([
     *   style({ backgroundColor: "red", offset: 0 }),
     *   style({ backgroundColor: "blue", offset: 0.2 }),
     *   style({ backgroundColor: "orange", offset: 0.3 }),
     *   style({ backgroundColor: "black", offset: 1 })
     * ]))
     * ```
     *
     * If there are no `offset` values specified in the style entries, the offsets
     * are calculated automatically.
     *
     * ```typescript
     * animate("5s", keyframes([
     *   style({ backgroundColor: "red" }) // offset = 0
     *   style({ backgroundColor: "blue" }) // offset = 0.33
     *   style({ backgroundColor: "orange" }) // offset = 0.66
     *   style({ backgroundColor: "black" }) // offset = 1
     * ]))
     *```

     * @publicApi
     */
    function keyframes(steps) {
        return { type: 5 /* Keyframes */, steps: steps };
    }
    /**
     * Declares an animation transition as a sequence of animation steps to run when a given
     * condition is satisfied. The condition is a Boolean expression or function that compares
     * the previous and current animation states, and returns true if this transition should occur.
     * When the state criteria of a defined transition are met, the associated animation is
     * triggered.
     *
     * @param stateChangeExpr A Boolean expression or function that compares the previous and current
     * animation states, and returns true if this transition should occur. Note that  "true" and "false"
     * match 1 and 0, respectively. An expression is evaluated each time a state change occurs in the
     * animation trigger element.
     * The animation steps run when the expression evaluates to true.
     *
     * - A state-change string takes the form "state1 => state2", where each side is a defined animation
     * state, or an asterix (*) to refer to a dynamic start or end state.
     *   - The expression string can contain multiple comma-separated statements;
     * for example "state1 => state2, state3 => state4".
     *   - Special values `:enter` and `:leave` initiate a transition on the entry and exit states,
     * equivalent to  "void => *"  and "* => void".
     *   - Special values `:increment` and `:decrement` initiate a transition when a numeric value has
     * increased or decreased in value.
     * - A function is executed each time a state change occurs in the animation trigger element.
     * The animation steps run when the function returns true.
     *
     * @param steps One or more animation objects, as returned by the `animate()` or
     * `sequence()` function, that form a transformation from one state to another.
     * A sequence is used by default when you pass an array.
     * @param options An options object that can contain a delay value for the start of the animation,
     * and additional developer-defined parameters. Provided values for additional parameters are used
     * as defaults, and override values can be passed to the caller on invocation.
     * @returns An object that encapsulates the transition data.
     *
     * @usageNotes
     * The template associated with a component binds an animation trigger to an element.
     *
     * ```HTML
     * <!-- somewhere inside of my-component-tpl.html -->
     * <div [@myAnimationTrigger]="myStatusExp">...</div>
     * ```
     *
     * All transitions are defined within an animation trigger,
     * along with named states that the transitions change to and from.
     *
     * ```typescript
     * trigger("myAnimationTrigger", [
     *  // define states
     *  state("on", style({ background: "green" })),
     *  state("off", style({ background: "grey" })),
     *  ...]
     * ```
     *
     * Note that when you call the `sequence()` function within a `{@link animations/group group()}`
     * or a `transition()` call, execution does not continue to the next instruction
     * until each of the inner animation steps have completed.
     *
     * ### Syntax examples
     *
     * The following examples define transitions between the two defined states (and default states),
     * using various options:
     *
     * ```typescript
     * // Transition occurs when the state value
     * // bound to "myAnimationTrigger" changes from "on" to "off"
     * transition("on => off", animate(500))
     * // Run the same animation for both directions
     * transition("on <=> off", animate(500))
     * // Define multiple state-change pairs separated by commas
     * transition("on => off, off => void", animate(500))
     * ```
     *
     * ### Special values for state-change expressions
     *
     * - Catch-all state change for when an element is inserted into the page and the
     * destination state is unknown:
     *
     * ```typescript
     * transition("void => *", [
     *  style({ opacity: 0 }),
     *  animate(500)
     *  ])
     * ```
     *
     * - Capture a state change between any states:
     *
     *  `transition("* => *", animate("1s 0s"))`
     *
     * - Entry and exit transitions:
     *
     * ```typescript
     * transition(":enter", [
     *   style({ opacity: 0 }),
     *   animate(500, style({ opacity: 1 }))
     *   ]),
     * transition(":leave", [
     *   animate(500, style({ opacity: 0 }))
     *   ])
     * ```
     *
     * - Use `:increment` and `:decrement` to initiate transitions:
     *
     * ```typescript
     * transition(":increment", group([
     *  query(':enter', [
     *     style({ left: '100%' }),
     *     animate('0.5s ease-out', style('*'))
     *   ]),
     *  query(':leave', [
     *     animate('0.5s ease-out', style({ left: '-100%' }))
     *  ])
     * ]))
     *
     * transition(":decrement", group([
     *  query(':enter', [
     *     style({ left: '100%' }),
     *     animate('0.5s ease-out', style('*'))
     *   ]),
     *  query(':leave', [
     *     animate('0.5s ease-out', style({ left: '-100%' }))
     *  ])
     * ]))
     * ```
     *
     * ### State-change functions
     *
     * Here is an example of a `fromState` specified as a state-change function that invokes an
     * animation when true:
     *
     * ```typescript
     * transition((fromState, toState) =>
     *  {
     *   return fromState == "off" && toState == "on";
     *  },
     *  animate("1s 0s"))
     * ```
     *
     * ### Animating to the final state
     *
     * If the final step in a transition is a call to `animate()` that uses a timing value
     * with no style data, that step is automatically considered the final animation arc,
     * for the element to reach the final state. Angular automatically adds or removes
     * CSS styles to ensure that the element is in the correct final state.
     *
     * The following example defines a transition that starts by hiding the element,
     * then makes sure that it animates properly to whatever state is currently active for trigger:
     *
     * ```typescript
     * transition("void => *", [
     *   style({ opacity: 0 }),
     *   animate(500)
     *  ])
     * ```
     * ### Boolean value matching
     * If a trigger binding value is a Boolean, it can be matched using a transition expression
     * that compares true and false or 1 and 0. For example:
     *
     * ```
     * // in the template
     * <div [@openClose]="open ? true : false">...</div>
     * // in the component metadata
     * trigger('openClose', [
     *   state('true', style({ height: '*' })),
     *   state('false', style({ height: '0px' })),
     *   transition('false <=> true', animate(500))
     * ])
     * ```
     *
     * @publicApi
     **/
    function transition(stateChangeExpr, steps, options) {
        if (options === void 0) { options = null; }
        return { type: 1 /* Transition */, expr: stateChangeExpr, animation: steps, options: options };
    }
    /**
     * Produces a reusable animation that can be invoked in another animation or sequence,
     * by calling the `useAnimation()` function.
     *
     * @param steps One or more animation objects, as returned by the `animate()`
     * or `sequence()` function, that form a transformation from one state to another.
     * A sequence is used by default when you pass an array.
     * @param options An options object that can contain a delay value for the start of the
     * animation, and additional developer-defined parameters.
     * Provided values for additional parameters are used as defaults,
     * and override values can be passed to the caller on invocation.
     * @returns An object that encapsulates the animation data.
     *
     * @usageNotes
     * The following example defines a reusable animation, providing some default parameter
     * values.
     *
     * ```typescript
     * var fadeAnimation = animation([
     *   style({ opacity: '{{ start }}' }),
     *   animate('{{ time }}',
     *   style({ opacity: '{{ end }}'}))
     *   ],
     *   { params: { time: '1000ms', start: 0, end: 1 }});
     * ```
     *
     * The following invokes the defined animation with a call to `useAnimation()`,
     * passing in override parameter values.
     *
     * ```js
     * useAnimation(fadeAnimation, {
     *   params: {
     *     time: '2s',
     *     start: 1,
     *     end: 0
     *   }
     * })
     * ```
     *
     * If any of the passed-in parameter values are missing from this call,
     * the default values are used. If one or more parameter values are missing before a step is
     * animated, `useAnimation()` throws an error.
     *
     * @publicApi
     */
    function animation(steps, options) {
        if (options === void 0) { options = null; }
        return { type: 8 /* Reference */, animation: steps, options: options };
    }
    /**
     * Executes a queried inner animation element within an animation sequence.
     *
     * @param options An options object that can contain a delay value for the start of the
     * animation, and additional override values for developer-defined parameters.
     * @return An object that encapsulates the child animation data.
     *
     * @usageNotes
     * Each time an animation is triggered in Angular, the parent animation
     * has priority and any child animations are blocked. In order
     * for a child animation to run, the parent animation must query each of the elements
     * containing child animations, and run them using this function.
     *
     * Note that this feature is designed to be used with `query()` and it will only work
     * with animations that are assigned using the Angular animation library. CSS keyframes
     * and transitions are not handled by this API.
     *
     * @publicApi
     */
    function animateChild(options) {
        if (options === void 0) { options = null; }
        return { type: 9 /* AnimateChild */, options: options };
    }
    /**
     * Starts a reusable animation that is created using the `animation()` function.
     *
     * @param animation The reusable animation to start.
     * @param options An options object that can contain a delay value for the start of
     * the animation, and additional override values for developer-defined parameters.
     * @return An object that contains the animation parameters.
     *
     * @publicApi
     */
    function useAnimation(animation, options) {
        if (options === void 0) { options = null; }
        return { type: 10 /* AnimateRef */, animation: animation, options: options };
    }
    /**
     * Finds one or more inner elements within the current element that is
     * being animated within a sequence. Use with `animate()`.
     *
     * @param selector The element to query, or a set of elements that contain Angular-specific
     * characteristics, specified with one or more of the following tokens.
     *  - `query(":enter")` or `query(":leave")` : Query for newly inserted/removed elements.
     *  - `query(":animating")` : Query all currently animating elements.
     *  - `query("@triggerName")` : Query elements that contain an animation trigger.
     *  - `query("@*")` : Query all elements that contain an animation triggers.
     *  - `query(":self")` : Include the current element into the animation sequence.
     *
     * @param animation One or more animation steps to apply to the queried element or elements.
     * An array is treated as an animation sequence.
     * @param options An options object. Use the 'limit' field to limit the total number of
     * items to collect.
     * @return An object that encapsulates the query data.
     *
     * @usageNotes
     * Tokens can be merged into a combined query selector string. For example:
     *
     * ```typescript
     *  query(':self, .record:enter, .record:leave, @subTrigger', [...])
     * ```
     *
     * The `query()` function collects multiple elements and works internally by using
     * `element.querySelectorAll`. Use the `limit` field of an options object to limit
     * the total number of items to be collected. For example:
     *
     * ```js
     * query('div', [
     *   animate(...),
     *   animate(...)
     * ], { limit: 1 })
     * ```
     *
     * By default, throws an error when zero items are found. Set the
     * `optional` flag to ignore this error. For example:
     *
     * ```js
     * query('.some-element-that-may-not-be-there', [
     *   animate(...),
     *   animate(...)
     * ], { optional: true })
     * ```
     *
     * ### Usage Example
     *
     * The following example queries for inner elements and animates them
     * individually using `animate()`.
     *
     * ```typescript
     * @Component({
     *   selector: 'inner',
     *   template: `
     *     <div [@queryAnimation]="exp">
     *       <h1>Title</h1>
     *       <div class="content">
     *         Blah blah blah
     *       </div>
     *     </div>
     *   `,
     *   animations: [
     *    trigger('queryAnimation', [
     *      transition('* => goAnimate', [
     *        // hide the inner elements
     *        query('h1', style({ opacity: 0 })),
     *        query('.content', style({ opacity: 0 })),
     *
     *        // animate the inner elements in, one by one
     *        query('h1', animate(1000, style({ opacity: 1 }))),
     *        query('.content', animate(1000, style({ opacity: 1 }))),
     *      ])
     *    ])
     *  ]
     * })
     * class Cmp {
     *   exp = '';
     *
     *   goAnimate() {
     *     this.exp = 'goAnimate';
     *   }
     * }
     * ```
     *
     * @publicApi
     */
    function query(selector, animation, options) {
        if (options === void 0) { options = null; }
        return { type: 11 /* Query */, selector: selector, animation: animation, options: options };
    }
    /**
     * Use within an animation `query()` call to issue a timing gap after
     * each queried item is animated.
     *
     * @param timings A delay value.
     * @param animation One ore more animation steps.
     * @returns An object that encapsulates the stagger data.
     *
     * @usageNotes
     * In the following example, a container element wraps a list of items stamped out
     * by an `ngFor`. The container element contains an animation trigger that will later be set
     * to query for each of the inner items.
     *
     * Each time items are added, the opacity fade-in animation runs,
     * and each removed item is faded out.
     * When either of these animations occur, the stagger effect is
     * applied after each item's animation is started.
     *
     * ```html
     * <!-- list.component.html -->
     * <button (click)="toggle()">Show / Hide Items</button>
     * <hr />
     * <div [@listAnimation]="items.length">
     *   <div *ngFor="let item of items">
     *     {{ item }}
     *   </div>
     * </div>
     * ```
     *
     * Here is the component code:
     *
     * ```typescript
     * import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
     * @Component({
     *   templateUrl: 'list.component.html',
     *   animations: [
     *     trigger('listAnimation', [
     *     ...
     *     ])
     *   ]
     * })
     * class ListComponent {
     *   items = [];
     *
     *   showItems() {
     *     this.items = [0,1,2,3,4];
     *   }
     *
     *   hideItems() {
     *     this.items = [];
     *   }
     *
     *   toggle() {
     *     this.items.length ? this.hideItems() : this.showItems();
     *    }
     *  }
     * ```
     *
     * Here is the animation trigger code:
     *
     * ```typescript
     * trigger('listAnimation', [
     *   transition('* => *', [ // each time the binding value changes
     *     query(':leave', [
     *       stagger(100, [
     *         animate('0.5s', style({ opacity: 0 }))
     *       ])
     *     ]),
     *     query(':enter', [
     *       style({ opacity: 0 }),
     *       stagger(100, [
     *         animate('0.5s', style({ opacity: 1 }))
     *       ])
     *     ])
     *   ])
     * ])
     * ```
     *
     * @publicApi
     */
    function stagger(timings, animation) {
        return { type: 12 /* Stagger */, timings: timings, animation: animation };
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    function scheduleMicroTask(cb) {
        Promise.resolve(null).then(cb);
    }

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * An empty programmatic controller for reusable animations.
     * Used internally when animations are disabled, to avoid
     * checking for the null case when an animation player is expected.
     *
     * @see `animate()`
     * @see `AnimationPlayer`
     * @see `GroupPlayer`
     *
     * @publicApi
     */
    var NoopAnimationPlayer = /** @class */ (function () {
        function NoopAnimationPlayer(duration, delay) {
            if (duration === void 0) { duration = 0; }
            if (delay === void 0) { delay = 0; }
            this._onDoneFns = [];
            this._onStartFns = [];
            this._onDestroyFns = [];
            this._started = false;
            this._destroyed = false;
            this._finished = false;
            this._position = 0;
            this.parentPlayer = null;
            this.totalTime = duration + delay;
        }
        NoopAnimationPlayer.prototype._onFinish = function () {
            if (!this._finished) {
                this._finished = true;
                this._onDoneFns.forEach(function (fn) { return fn(); });
                this._onDoneFns = [];
            }
        };
        NoopAnimationPlayer.prototype.onStart = function (fn) {
            this._onStartFns.push(fn);
        };
        NoopAnimationPlayer.prototype.onDone = function (fn) {
            this._onDoneFns.push(fn);
        };
        NoopAnimationPlayer.prototype.onDestroy = function (fn) {
            this._onDestroyFns.push(fn);
        };
        NoopAnimationPlayer.prototype.hasStarted = function () {
            return this._started;
        };
        NoopAnimationPlayer.prototype.init = function () { };
        NoopAnimationPlayer.prototype.play = function () {
            if (!this.hasStarted()) {
                this._onStart();
                this.triggerMicrotask();
            }
            this._started = true;
        };
        /** @internal */
        NoopAnimationPlayer.prototype.triggerMicrotask = function () {
            var _this = this;
            scheduleMicroTask(function () { return _this._onFinish(); });
        };
        NoopAnimationPlayer.prototype._onStart = function () {
            this._onStartFns.forEach(function (fn) { return fn(); });
            this._onStartFns = [];
        };
        NoopAnimationPlayer.prototype.pause = function () { };
        NoopAnimationPlayer.prototype.restart = function () { };
        NoopAnimationPlayer.prototype.finish = function () {
            this._onFinish();
        };
        NoopAnimationPlayer.prototype.destroy = function () {
            if (!this._destroyed) {
                this._destroyed = true;
                if (!this.hasStarted()) {
                    this._onStart();
                }
                this.finish();
                this._onDestroyFns.forEach(function (fn) { return fn(); });
                this._onDestroyFns = [];
            }
        };
        NoopAnimationPlayer.prototype.reset = function () {
            this._started = false;
        };
        NoopAnimationPlayer.prototype.setPosition = function (position) {
            this._position = this.totalTime ? position * this.totalTime : 1;
        };
        NoopAnimationPlayer.prototype.getPosition = function () {
            return this.totalTime ? this._position / this.totalTime : 1;
        };
        /** @internal */
        NoopAnimationPlayer.prototype.triggerCallback = function (phaseName) {
            var methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
            methods.forEach(function (fn) { return fn(); });
            methods.length = 0;
        };
        return NoopAnimationPlayer;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    /**
     * A programmatic controller for a group of reusable animations.
     * Used internally to control animations.
     *
     * @see `AnimationPlayer`
     * @see `{@link animations/group group()}`
     *
     */
    var AnimationGroupPlayer = /** @class */ (function () {
        function AnimationGroupPlayer(_players) {
            var _this = this;
            this._onDoneFns = [];
            this._onStartFns = [];
            this._finished = false;
            this._started = false;
            this._destroyed = false;
            this._onDestroyFns = [];
            this.parentPlayer = null;
            this.totalTime = 0;
            this.players = _players;
            var doneCount = 0;
            var destroyCount = 0;
            var startCount = 0;
            var total = this.players.length;
            if (total == 0) {
                scheduleMicroTask(function () { return _this._onFinish(); });
            }
            else {
                this.players.forEach(function (player) {
                    player.onDone(function () {
                        if (++doneCount == total) {
                            _this._onFinish();
                        }
                    });
                    player.onDestroy(function () {
                        if (++destroyCount == total) {
                            _this._onDestroy();
                        }
                    });
                    player.onStart(function () {
                        if (++startCount == total) {
                            _this._onStart();
                        }
                    });
                });
            }
            this.totalTime = this.players.reduce(function (time, player) { return Math.max(time, player.totalTime); }, 0);
        }
        AnimationGroupPlayer.prototype._onFinish = function () {
            if (!this._finished) {
                this._finished = true;
                this._onDoneFns.forEach(function (fn) { return fn(); });
                this._onDoneFns = [];
            }
        };
        AnimationGroupPlayer.prototype.init = function () {
            this.players.forEach(function (player) { return player.init(); });
        };
        AnimationGroupPlayer.prototype.onStart = function (fn) {
            this._onStartFns.push(fn);
        };
        AnimationGroupPlayer.prototype._onStart = function () {
            if (!this.hasStarted()) {
                this._started = true;
                this._onStartFns.forEach(function (fn) { return fn(); });
                this._onStartFns = [];
            }
        };
        AnimationGroupPlayer.prototype.onDone = function (fn) {
            this._onDoneFns.push(fn);
        };
        AnimationGroupPlayer.prototype.onDestroy = function (fn) {
            this._onDestroyFns.push(fn);
        };
        AnimationGroupPlayer.prototype.hasStarted = function () {
            return this._started;
        };
        AnimationGroupPlayer.prototype.play = function () {
            if (!this.parentPlayer) {
                this.init();
            }
            this._onStart();
            this.players.forEach(function (player) { return player.play(); });
        };
        AnimationGroupPlayer.prototype.pause = function () {
            this.players.forEach(function (player) { return player.pause(); });
        };
        AnimationGroupPlayer.prototype.restart = function () {
            this.players.forEach(function (player) { return player.restart(); });
        };
        AnimationGroupPlayer.prototype.finish = function () {
            this._onFinish();
            this.players.forEach(function (player) { return player.finish(); });
        };
        AnimationGroupPlayer.prototype.destroy = function () {
            this._onDestroy();
        };
        AnimationGroupPlayer.prototype._onDestroy = function () {
            if (!this._destroyed) {
                this._destroyed = true;
                this._onFinish();
                this.players.forEach(function (player) { return player.destroy(); });
                this._onDestroyFns.forEach(function (fn) { return fn(); });
                this._onDestroyFns = [];
            }
        };
        AnimationGroupPlayer.prototype.reset = function () {
            this.players.forEach(function (player) { return player.reset(); });
            this._destroyed = false;
            this._finished = false;
            this._started = false;
        };
        AnimationGroupPlayer.prototype.setPosition = function (p) {
            var timeAtPosition = p * this.totalTime;
            this.players.forEach(function (player) {
                var position = player.totalTime ? Math.min(1, timeAtPosition / player.totalTime) : 1;
                player.setPosition(position);
            });
        };
        AnimationGroupPlayer.prototype.getPosition = function () {
            var longestPlayer = this.players.reduce(function (longestSoFar, player) {
                var newPlayerIsLongest = longestSoFar === null || player.totalTime > longestSoFar.totalTime;
                return newPlayerIsLongest ? player : longestSoFar;
            }, null);
            return longestPlayer != null ? longestPlayer.getPosition() : 0;
        };
        AnimationGroupPlayer.prototype.beforeDestroy = function () {
            this.players.forEach(function (player) {
                if (player.beforeDestroy) {
                    player.beforeDestroy();
                }
            });
        };
        /** @internal */
        AnimationGroupPlayer.prototype.triggerCallback = function (phaseName) {
            var methods = phaseName == 'start' ? this._onStartFns : this._onDoneFns;
            methods.forEach(function (fn) { return fn(); });
            methods.length = 0;
        };
        return AnimationGroupPlayer;
    }());

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var ɵPRE_STYLE = '!';

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * @license
     * Copyright Google LLC All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AUTO_STYLE = AUTO_STYLE;
    exports.AnimationBuilder = AnimationBuilder;
    exports.AnimationFactory = AnimationFactory;
    exports.NoopAnimationPlayer = NoopAnimationPlayer;
    exports.animate = animate;
    exports.animateChild = animateChild;
    exports.animation = animation;
    exports.group = group;
    exports.keyframes = keyframes;
    exports.query = query;
    exports.sequence = sequence;
    exports.stagger = stagger;
    exports.state = state;
    exports.style = style;
    exports.transition = transition;
    exports.trigger = trigger;
    exports.useAnimation = useAnimation;
    exports.ɵAnimationGroupPlayer = AnimationGroupPlayer;
    exports.ɵPRE_STYLE = ɵPRE_STYLE;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=animations.umd.js.map
