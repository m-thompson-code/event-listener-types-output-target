export interface OutputTargetStrictEventListeners {
    outputPaths?: string[];
    importPath?: string;
    excludeComponents?: string[];
}

export interface NormalizedOutputTargetStrictEventListeners {
    outputPaths: string[];
    importPath: string;
    excludeComponents: string[];
}
