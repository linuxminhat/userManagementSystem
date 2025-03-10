/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { SimpleChange } from '../../interface/simple_change';
import { EMPTY_OBJ } from '../../util/empty';
/**
 * The NgOnChangesFeature decorates a component with support for the ngOnChanges
 * lifecycle hook, so it should be included in any component that implements
 * that hook.
 *
 * If the component or directive uses inheritance, the NgOnChangesFeature MUST
 * be included as a feature AFTER {@link InheritDefinitionFeature}, otherwise
 * inherited properties will not be propagated to the ngOnChanges lifecycle
 * hook.
 *
 * Example usage:
 *
 * ```
 * static ɵcmp = defineComponent({
 *   ...
 *   inputs: {name: 'publicName'},
 *   features: [NgOnChangesFeature]
 * });
 * ```
 *
 * @codeGenApi
 */
export function ɵɵNgOnChangesFeature() {
    return NgOnChangesFeatureImpl;
}
export function NgOnChangesFeatureImpl(definition) {
    if (definition.type.prototype.ngOnChanges) {
        definition.setInput = ngOnChangesSetInput;
    }
    return rememberChangeHistoryAndInvokeOnChangesHook;
}
// This option ensures that the ngOnChanges lifecycle hook will be inherited
// from superclasses (in InheritDefinitionFeature).
/** @nocollapse */
// tslint:disable-next-line:no-toplevel-property-access
ɵɵNgOnChangesFeature.ngInherit = true;
/**
 * This is a synthetic lifecycle hook which gets inserted into `TView.preOrderHooks` to simulate
 * `ngOnChanges`.
 *
 * The hook reads the `NgSimpleChangesStore` data from the component instance and if changes are
 * found it invokes `ngOnChanges` on the component instance.
 *
 * @param this Component instance. Because this function gets inserted into `TView.preOrderHooks`,
 *     it is guaranteed to be called with component instance.
 */
function rememberChangeHistoryAndInvokeOnChangesHook() {
    const simpleChangesStore = getSimpleChangesStore(this);
    const current = simpleChangesStore === null || simpleChangesStore === void 0 ? void 0 : simpleChangesStore.current;
    if (current) {
        const previous = simpleChangesStore.previous;
        if (previous === EMPTY_OBJ) {
            simpleChangesStore.previous = current;
        }
        else {
            // New changes are copied to the previous store, so that we don't lose history for inputs
            // which were not changed this time
            for (let key in current) {
                previous[key] = current[key];
            }
        }
        simpleChangesStore.current = null;
        this.ngOnChanges(current);
    }
}
function ngOnChangesSetInput(instance, value, publicName, privateName) {
    const simpleChangesStore = getSimpleChangesStore(instance) ||
        setSimpleChangesStore(instance, { previous: EMPTY_OBJ, current: null });
    const current = simpleChangesStore.current || (simpleChangesStore.current = {});
    const previous = simpleChangesStore.previous;
    const declaredName = this.declaredInputs[publicName];
    const previousChange = previous[declaredName];
    current[declaredName] = new SimpleChange(previousChange && previousChange.currentValue, value, previous === EMPTY_OBJ);
    instance[privateName] = value;
}
const SIMPLE_CHANGES_STORE = '__ngSimpleChanges__';
function getSimpleChangesStore(instance) {
    return instance[SIMPLE_CHANGES_STORE] || null;
}
function setSimpleChangesStore(instance, store) {
    return instance[SIMPLE_CHANGES_STORE] = store;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmdfb25jaGFuZ2VzX2ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9jb3JlL3NyYy9yZW5kZXIzL2ZlYXR1cmVzL25nX29uY2hhbmdlc19mZWF0dXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUdILE9BQU8sRUFBQyxZQUFZLEVBQWdCLE1BQU0sK0JBQStCLENBQUM7QUFDMUUsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxNQUFNLFVBQVUsb0JBQW9CO0lBQ2xDLE9BQU8sc0JBQXNCLENBQUM7QUFDaEMsQ0FBQztBQUVELE1BQU0sVUFBVSxzQkFBc0IsQ0FBSSxVQUEyQjtJQUNuRSxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBRTtRQUN6QyxVQUFVLENBQUMsUUFBUSxHQUFHLG1CQUFtQixDQUFDO0tBQzNDO0lBQ0QsT0FBTywyQ0FBMkMsQ0FBQztBQUNyRCxDQUFDO0FBRUQsNEVBQTRFO0FBQzVFLG1EQUFtRDtBQUNuRCxrQkFBa0I7QUFDbEIsdURBQXVEO0FBQ3RELG9CQUE0QyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7QUFFL0Q7Ozs7Ozs7OztHQVNHO0FBQ0gsU0FBUywyQ0FBMkM7SUFDbEQsTUFBTSxrQkFBa0IsR0FBRyxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxNQUFNLE9BQU8sR0FBRyxrQkFBa0IsYUFBbEIsa0JBQWtCLHVCQUFsQixrQkFBa0IsQ0FBRSxPQUFPLENBQUM7SUFFNUMsSUFBSSxPQUFPLEVBQUU7UUFDWCxNQUFNLFFBQVEsR0FBRyxrQkFBbUIsQ0FBQyxRQUFRLENBQUM7UUFDOUMsSUFBSSxRQUFRLEtBQUssU0FBUyxFQUFFO1lBQzFCLGtCQUFtQixDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7U0FDeEM7YUFBTTtZQUNMLHlGQUF5RjtZQUN6RixtQ0FBbUM7WUFDbkMsS0FBSyxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUU7Z0JBQ3ZCLFFBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDOUI7U0FDRjtRQUNELGtCQUFtQixDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDbkMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUMzQjtBQUNILENBQUM7QUFHRCxTQUFTLG1CQUFtQixDQUNELFFBQVcsRUFBRSxLQUFVLEVBQUUsVUFBa0IsRUFBRSxXQUFtQjtJQUN6RixNQUFNLGtCQUFrQixHQUFHLHFCQUFxQixDQUFDLFFBQVEsQ0FBQztRQUN0RCxxQkFBcUIsQ0FBQyxRQUFRLEVBQUUsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQzFFLE1BQU0sT0FBTyxHQUFHLGtCQUFrQixDQUFDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNoRixNQUFNLFFBQVEsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7SUFFN0MsTUFBTSxZQUFZLEdBQUksSUFBSSxDQUFDLGNBQTBDLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbEYsTUFBTSxjQUFjLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FDcEMsY0FBYyxJQUFJLGNBQWMsQ0FBQyxZQUFZLEVBQUUsS0FBSyxFQUFFLFFBQVEsS0FBSyxTQUFTLENBQUMsQ0FBQztJQUVqRixRQUFnQixDQUFDLFdBQVcsQ0FBQyxHQUFHLEtBQUssQ0FBQztBQUN6QyxDQUFDO0FBRUQsTUFBTSxvQkFBb0IsR0FBRyxxQkFBcUIsQ0FBQztBQUVuRCxTQUFTLHFCQUFxQixDQUFDLFFBQWE7SUFDMUMsT0FBTyxRQUFRLENBQUMsb0JBQW9CLENBQUMsSUFBSSxJQUFJLENBQUM7QUFDaEQsQ0FBQztBQUVELFNBQVMscUJBQXFCLENBQUMsUUFBYSxFQUFFLEtBQTJCO0lBQ3ZFLE9BQU8sUUFBUSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsS0FBSyxDQUFDO0FBQ2hELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIExMQyBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuaW1wb3J0IHtPbkNoYW5nZXN9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9saWZlY3ljbGVfaG9va3MnO1xuaW1wb3J0IHtTaW1wbGVDaGFuZ2UsIFNpbXBsZUNoYW5nZXN9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zaW1wbGVfY2hhbmdlJztcbmltcG9ydCB7RU1QVFlfT0JKfSBmcm9tICcuLi8uLi91dGlsL2VtcHR5JztcbmltcG9ydCB7RGlyZWN0aXZlRGVmLCBEaXJlY3RpdmVEZWZGZWF0dXJlfSBmcm9tICcuLi9pbnRlcmZhY2VzL2RlZmluaXRpb24nO1xuXG4vKipcbiAqIFRoZSBOZ09uQ2hhbmdlc0ZlYXR1cmUgZGVjb3JhdGVzIGEgY29tcG9uZW50IHdpdGggc3VwcG9ydCBmb3IgdGhlIG5nT25DaGFuZ2VzXG4gKiBsaWZlY3ljbGUgaG9vaywgc28gaXQgc2hvdWxkIGJlIGluY2x1ZGVkIGluIGFueSBjb21wb25lbnQgdGhhdCBpbXBsZW1lbnRzXG4gKiB0aGF0IGhvb2suXG4gKlxuICogSWYgdGhlIGNvbXBvbmVudCBvciBkaXJlY3RpdmUgdXNlcyBpbmhlcml0YW5jZSwgdGhlIE5nT25DaGFuZ2VzRmVhdHVyZSBNVVNUXG4gKiBiZSBpbmNsdWRlZCBhcyBhIGZlYXR1cmUgQUZURVIge0BsaW5rIEluaGVyaXREZWZpbml0aW9uRmVhdHVyZX0sIG90aGVyd2lzZVxuICogaW5oZXJpdGVkIHByb3BlcnRpZXMgd2lsbCBub3QgYmUgcHJvcGFnYXRlZCB0byB0aGUgbmdPbkNoYW5nZXMgbGlmZWN5Y2xlXG4gKiBob29rLlxuICpcbiAqIEV4YW1wbGUgdXNhZ2U6XG4gKlxuICogYGBgXG4gKiBzdGF0aWMgybVjbXAgPSBkZWZpbmVDb21wb25lbnQoe1xuICogICAuLi5cbiAqICAgaW5wdXRzOiB7bmFtZTogJ3B1YmxpY05hbWUnfSxcbiAqICAgZmVhdHVyZXM6IFtOZ09uQ2hhbmdlc0ZlYXR1cmVdXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEBjb2RlR2VuQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiDJtcm1TmdPbkNoYW5nZXNGZWF0dXJlPFQ+KCk6IERpcmVjdGl2ZURlZkZlYXR1cmUge1xuICByZXR1cm4gTmdPbkNoYW5nZXNGZWF0dXJlSW1wbDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIE5nT25DaGFuZ2VzRmVhdHVyZUltcGw8VD4oZGVmaW5pdGlvbjogRGlyZWN0aXZlRGVmPFQ+KSB7XG4gIGlmIChkZWZpbml0aW9uLnR5cGUucHJvdG90eXBlLm5nT25DaGFuZ2VzKSB7XG4gICAgZGVmaW5pdGlvbi5zZXRJbnB1dCA9IG5nT25DaGFuZ2VzU2V0SW5wdXQ7XG4gIH1cbiAgcmV0dXJuIHJlbWVtYmVyQ2hhbmdlSGlzdG9yeUFuZEludm9rZU9uQ2hhbmdlc0hvb2s7XG59XG5cbi8vIFRoaXMgb3B0aW9uIGVuc3VyZXMgdGhhdCB0aGUgbmdPbkNoYW5nZXMgbGlmZWN5Y2xlIGhvb2sgd2lsbCBiZSBpbmhlcml0ZWRcbi8vIGZyb20gc3VwZXJjbGFzc2VzIChpbiBJbmhlcml0RGVmaW5pdGlvbkZlYXR1cmUpLlxuLyoqIEBub2NvbGxhcHNlICovXG4vLyB0c2xpbnQ6ZGlzYWJsZS1uZXh0LWxpbmU6bm8tdG9wbGV2ZWwtcHJvcGVydHktYWNjZXNzXG4oybXJtU5nT25DaGFuZ2VzRmVhdHVyZSBhcyBEaXJlY3RpdmVEZWZGZWF0dXJlKS5uZ0luaGVyaXQgPSB0cnVlO1xuXG4vKipcbiAqIFRoaXMgaXMgYSBzeW50aGV0aWMgbGlmZWN5Y2xlIGhvb2sgd2hpY2ggZ2V0cyBpbnNlcnRlZCBpbnRvIGBUVmlldy5wcmVPcmRlckhvb2tzYCB0byBzaW11bGF0ZVxuICogYG5nT25DaGFuZ2VzYC5cbiAqXG4gKiBUaGUgaG9vayByZWFkcyB0aGUgYE5nU2ltcGxlQ2hhbmdlc1N0b3JlYCBkYXRhIGZyb20gdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBhbmQgaWYgY2hhbmdlcyBhcmVcbiAqIGZvdW5kIGl0IGludm9rZXMgYG5nT25DaGFuZ2VzYCBvbiB0aGUgY29tcG9uZW50IGluc3RhbmNlLlxuICpcbiAqIEBwYXJhbSB0aGlzIENvbXBvbmVudCBpbnN0YW5jZS4gQmVjYXVzZSB0aGlzIGZ1bmN0aW9uIGdldHMgaW5zZXJ0ZWQgaW50byBgVFZpZXcucHJlT3JkZXJIb29rc2AsXG4gKiAgICAgaXQgaXMgZ3VhcmFudGVlZCB0byBiZSBjYWxsZWQgd2l0aCBjb21wb25lbnQgaW5zdGFuY2UuXG4gKi9cbmZ1bmN0aW9uIHJlbWVtYmVyQ2hhbmdlSGlzdG9yeUFuZEludm9rZU9uQ2hhbmdlc0hvb2sodGhpczogT25DaGFuZ2VzKSB7XG4gIGNvbnN0IHNpbXBsZUNoYW5nZXNTdG9yZSA9IGdldFNpbXBsZUNoYW5nZXNTdG9yZSh0aGlzKTtcbiAgY29uc3QgY3VycmVudCA9IHNpbXBsZUNoYW5nZXNTdG9yZT8uY3VycmVudDtcblxuICBpZiAoY3VycmVudCkge1xuICAgIGNvbnN0IHByZXZpb3VzID0gc2ltcGxlQ2hhbmdlc1N0b3JlIS5wcmV2aW91cztcbiAgICBpZiAocHJldmlvdXMgPT09IEVNUFRZX09CSikge1xuICAgICAgc2ltcGxlQ2hhbmdlc1N0b3JlIS5wcmV2aW91cyA9IGN1cnJlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIE5ldyBjaGFuZ2VzIGFyZSBjb3BpZWQgdG8gdGhlIHByZXZpb3VzIHN0b3JlLCBzbyB0aGF0IHdlIGRvbid0IGxvc2UgaGlzdG9yeSBmb3IgaW5wdXRzXG4gICAgICAvLyB3aGljaCB3ZXJlIG5vdCBjaGFuZ2VkIHRoaXMgdGltZVxuICAgICAgZm9yIChsZXQga2V5IGluIGN1cnJlbnQpIHtcbiAgICAgICAgcHJldmlvdXNba2V5XSA9IGN1cnJlbnRba2V5XTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2ltcGxlQ2hhbmdlc1N0b3JlIS5jdXJyZW50ID0gbnVsbDtcbiAgICB0aGlzLm5nT25DaGFuZ2VzKGN1cnJlbnQpO1xuICB9XG59XG5cblxuZnVuY3Rpb24gbmdPbkNoYW5nZXNTZXRJbnB1dDxUPihcbiAgICB0aGlzOiBEaXJlY3RpdmVEZWY8VD4sIGluc3RhbmNlOiBULCB2YWx1ZTogYW55LCBwdWJsaWNOYW1lOiBzdHJpbmcsIHByaXZhdGVOYW1lOiBzdHJpbmcpOiB2b2lkIHtcbiAgY29uc3Qgc2ltcGxlQ2hhbmdlc1N0b3JlID0gZ2V0U2ltcGxlQ2hhbmdlc1N0b3JlKGluc3RhbmNlKSB8fFxuICAgICAgc2V0U2ltcGxlQ2hhbmdlc1N0b3JlKGluc3RhbmNlLCB7cHJldmlvdXM6IEVNUFRZX09CSiwgY3VycmVudDogbnVsbH0pO1xuICBjb25zdCBjdXJyZW50ID0gc2ltcGxlQ2hhbmdlc1N0b3JlLmN1cnJlbnQgfHwgKHNpbXBsZUNoYW5nZXNTdG9yZS5jdXJyZW50ID0ge30pO1xuICBjb25zdCBwcmV2aW91cyA9IHNpbXBsZUNoYW5nZXNTdG9yZS5wcmV2aW91cztcblxuICBjb25zdCBkZWNsYXJlZE5hbWUgPSAodGhpcy5kZWNsYXJlZElucHV0cyBhcyB7W2tleTogc3RyaW5nXTogc3RyaW5nfSlbcHVibGljTmFtZV07XG4gIGNvbnN0IHByZXZpb3VzQ2hhbmdlID0gcHJldmlvdXNbZGVjbGFyZWROYW1lXTtcbiAgY3VycmVudFtkZWNsYXJlZE5hbWVdID0gbmV3IFNpbXBsZUNoYW5nZShcbiAgICAgIHByZXZpb3VzQ2hhbmdlICYmIHByZXZpb3VzQ2hhbmdlLmN1cnJlbnRWYWx1ZSwgdmFsdWUsIHByZXZpb3VzID09PSBFTVBUWV9PQkopO1xuXG4gIChpbnN0YW5jZSBhcyBhbnkpW3ByaXZhdGVOYW1lXSA9IHZhbHVlO1xufVxuXG5jb25zdCBTSU1QTEVfQ0hBTkdFU19TVE9SRSA9ICdfX25nU2ltcGxlQ2hhbmdlc19fJztcblxuZnVuY3Rpb24gZ2V0U2ltcGxlQ2hhbmdlc1N0b3JlKGluc3RhbmNlOiBhbnkpOiBudWxsfE5nU2ltcGxlQ2hhbmdlc1N0b3JlIHtcbiAgcmV0dXJuIGluc3RhbmNlW1NJTVBMRV9DSEFOR0VTX1NUT1JFXSB8fCBudWxsO1xufVxuXG5mdW5jdGlvbiBzZXRTaW1wbGVDaGFuZ2VzU3RvcmUoaW5zdGFuY2U6IGFueSwgc3RvcmU6IE5nU2ltcGxlQ2hhbmdlc1N0b3JlKTogTmdTaW1wbGVDaGFuZ2VzU3RvcmUge1xuICByZXR1cm4gaW5zdGFuY2VbU0lNUExFX0NIQU5HRVNfU1RPUkVdID0gc3RvcmU7XG59XG5cbi8qKlxuICogRGF0YSBzdHJ1Y3R1cmUgd2hpY2ggaXMgbW9ua2V5LXBhdGNoZWQgb24gdGhlIGNvbXBvbmVudCBpbnN0YW5jZSBhbmQgdXNlZCBieSBgbmdPbkNoYW5nZXNgXG4gKiBsaWZlLWN5Y2xlIGhvb2sgdG8gdHJhY2sgcHJldmlvdXMgaW5wdXQgdmFsdWVzLlxuICovXG5pbnRlcmZhY2UgTmdTaW1wbGVDaGFuZ2VzU3RvcmUge1xuICBwcmV2aW91czogU2ltcGxlQ2hhbmdlcztcbiAgY3VycmVudDogU2ltcGxlQ2hhbmdlc3xudWxsO1xufVxuIl19