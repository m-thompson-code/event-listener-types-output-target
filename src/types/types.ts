export interface NormalizedOutputTargetStrictEventListeners {
    /**
     * Paths where generated event listener types will be stored. Path should include filename.
     * 
     * Default if not defined is:
     * 
     * ```
     * [
     *   'src/component-event-listeners.d.ts',
     *   'dist/types/component-event-listeners.d.ts',
     * ]
     * ```
     */
    outputPaths: string[];
    /**
     * The generated event listener types depend on types from `components.d.ts`. Setting this
     * will define the path where those types will be imported from.
     * 
     * Default if not defined is:
     * 
     * ```
     * './components'
     * ```
     */
    importPath: string;
    /**
     * List of components to not generate event listener types. Values should be the tag name of the component.
     */
    excludeComponents: string[];
}

export type OutputTargetStrictEventListeners = Partial<NormalizedOutputTargetStrictEventListeners>;
